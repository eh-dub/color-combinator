// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message. 
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

  if (msg.type === 'combinate-colors') {
    combinateColors(msg);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

function getColors(msg: any) {
  const fills: Paint[] = [];
  figma.currentPage.selection
    .forEach(node => {
      if ("fills" in node) {
        const x = clone(node.fills);
        fills.push(x[0]);
        // fills.push(_.cloneDeep(node.fills));
      }
    });

  figma.ui.postMessage({type: 'fills', payload: fills});
}

function cloneFrame(cloneNum = 1) {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(`"Clone Frame" works on exactly one node.`);
  } else {
    const frame: FrameNode = findFrame(figma.currentPage.selection[0]);
    if (frame) {
      const newFrame = frame.clone();
      newFrame.x = newFrame.x + (newFrame.width*cloneNum) + (100*cloneNum);
      console.log("cloned frame?");
    }
  }
  
}

function findFrame(selectedNode: SceneNode): FrameNode {
  if (selectedNode.type === "FRAME") {
    return selectedNode;
  } else if (selectedNode.parent !== null) {
    return findFrame(selectedNode.parent as SceneNode);
  } else {
    return figma.createFrame();
    figma.closePlugin(`"Find Frame" requires the selected element to be contained in a frame.`);
  }
}

function getTextNodes(nodes: readonly SceneNode[]): TextNode[] {
  return nodes.filter(n => n.type === "TEXT") as TextNode[];
}

function getSolidPaints(fills: readonly Paint[]): SolidPaint[] {
  return fills.filter(f => f.type === "SOLID") as SolidPaint[];
}

function doesTextNodeHaveSolidPaint(node: TextNode, paint: SolidPaint): boolean {
  if (figma.mixed == node.fills) {
    figma.closePlugin(`"Combinate Colors" is fucking broke`);
  }
  const nodeFills = node.fills as readonly Paint[];
  const solidNodeFills: SolidPaint[] = getSolidPaints(nodeFills);

  if (solidNodeFills.length < 1) {
    return false;
  } else {
    return areSolidPaintsEqual(solidNodeFills[0], paint);
  }
}

function areSolidPaintsEqual(sp1: SolidPaint, sp2: SolidPaint) {
  return sp1.blendMode === sp2.blendMode &&
         sp1.color.r === sp2.color.r &&
         sp1.color.g === sp2.color.g &&
         sp1.color.b === sp2.color.b &&
         sp1.opacity === sp2.opacity;
}

function areColorsEqual(c1: RGB, c2: RGB) {
  return (c1.r === c2.r &&
          c1.g === c2.g &&
          c1.b === c2.b
         );
}

function rgbToString({r,g,b}: RGB): string {
  return `${r},${g},${b}`;
}

function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

function combinateColors(msg: any) {
  const selection = figma.currentPage.selection;

  const textNodes = getTextNodes(figma.currentPage.selection) ;

  if (textNodes.length <= 1) {
    figma.closePlugin(`"Combinate Colors" requires at least 2 text nodes`);
  }

  const fills: SolidPaint[] = [];

  textNodes.forEach(n => {
    if (figma.mixed == n.fills) {
      figma.closePlugin(`"Combinate Colors" is fucking broke`);
    }
    const nodeFills = n.fills as readonly Paint[];
    const solidNodeFills: SolidPaint[] = getSolidPaints(nodeFills);

    // GET FILLS
    if (solidNodeFills.length < 1) {
      figma.closePlugin(`"Combinate Colors" requires that text nodes' first fill is a SolidPaint`);
    }

    let nodeFill: SolidPaint = solidNodeFills[0];

    // TODO: replace color equality check with generic equality check
    if (fills.filter(f => areColorsEqual(f.color, nodeFill.color)).length === 0)
      fills.push(nodeFill);


  });

  // CREATE MAP OF COLOR-STRINGS TO NODES
  const colorsToNodes: {[key: string]: TextNode[]} = {};
  fills.forEach(f => {
    const c = rgbToString(f.color);
    const nodes = textNodes
      .filter(n => 
        doesTextNodeHaveSolidPaint(n, f));
    colorsToNodes[c] = nodes;
  });
  const colorOrders = permutation(fills);
  const nodeColorGroups: TextNode[][] = Object.values(colorsToNodes);
  console.log(`${nodeColorGroups}`);

  let numClones = 0;
  colorOrders.forEach(co => {
    numClones++;
    co.forEach((f,i) => {
      nodeColorGroups[i].forEach(n => {
        // newFill.color = c;
        n.fills = [f]
      })
    })
    cloneFrame(numClones);
  });
}
function permutation<T>(array: T[]): T[][] {
  function p(array: T[], temp: T[]) {
      var i, x;
      if (!array.length) {
          result.push(temp);
      }
      for (i = 0; i < array.length; i++) {
          x = array.splice(i, 1)[0];
          p(array, temp.concat(x));
          array.splice(i, 0, x);
      }
  }

  var result: T[][] = [];
  p(array, []);
  return result;
}
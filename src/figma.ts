// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// import cloneDeep from 'lodash/cloneDeep';

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message. 
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-rectangles') {
    createRectangles(msg);
  } else if (msg.type === 'halve-opacity') {
    halveOpacity(msg);
  } else if (msg.type === 'get-colors') {
    getColors(msg);
    return;
  } else if (msg.type === 'clone-frame') {
    cloneFrame(1);
  } else if (msg.type === 'swap-colors') {
    cloneFrame(1);
    swapColors(msg);
  } else if (msg.type === 'combinate-colors') {
    combinateColors(msg);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

function createRectangles(msg: any) {
  const nodes: SceneNode[] = [];
  for (let i = 0; i < msg.count; i++) {
    const rect = figma.createRectangle();
    rect.x = i * 150;
    rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    figma.currentPage.appendChild(rect);
    nodes.push(rect);
  }
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
}

function halveOpacity(msg: any) {
  figma.currentPage.selection
    .forEach(node => {
      if ("opacity" in node) node.opacity *= 0.5;
    })
}

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


function swapColors(msg: any) {
  const selection = getTextNodes(figma.currentPage.selection);

  if (selection.length !== 2) {
    figma.closePlugin(`"Swap Colors" works on exactly two text nodes.`);
  } 
  const [first, second] = selection;
  const firstFills = first.fills as readonly Paint[];
  const secondFills = second.fills as readonly Paint[];

  if (firstFills.length === 0 || secondFills.length === 0) {
    figma.closePlugin(`"Swap Colors" requires TextNodes to have a single Solid Paint fill.`)
  }

  const [firstFill] = first.fills as readonly Paint[];
  const [secondFill] = second.fills as readonly Paint[];
  if (firstFill.type === "SOLID" && secondFill.type === "SOLID") {
    const fill1: SolidPaint = firstFill as SolidPaint;
    const fill2: SolidPaint = secondFill as SolidPaint;
    console.log(`${areColorsEqual(fill1.color, fill2.color)}      ${fill2}`);
    first.fills = [fill2];
    second.fills = [fill1];
  }

  
}

function getTextNodes(nodes: readonly SceneNode[]): TextNode[] {
  return nodes.filter(n => n.type === "TEXT") as TextNode[];
}

function getSolidPaints(fills: readonly Paint[]): SolidPaint[] {
  return fills.filter(f => f.type === "SOLID") as SolidPaint[];
}

function doesTextNodeHaveSolidPaint(node: TextNode, paint: SolidPaint): boolean {
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
         sp1.color === sp2.color &&
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

// @TODO
//  - new button: "Combinate Colors" DONE
//  - new event handle: "combinate-colors" DONE
//  - new if statement "combinate-colors" DONE
//  - new function "combinateColors"
//  -   for every node
//        get it's fill color and add it to a dict that is color -> [Node]
//        if I permute [[Node]] and assign colors to the same spots (i.e. pink -> 1)
//          then I should get the same result.

function combinateColors(msg: any) {
  const selection = figma.currentPage.selection;

  const textNodes = getTextNodes(figma.currentPage.selection) ;

  if (textNodes.length <= 1) {
    figma.closePlugin(`"Combinate Colors" requires at least 2 text nodes`);
  }

  const fills: SolidPaint[] = [];

  textNodes.forEach(n => {
    const nodeFills = n.fills as readonly Paint[];
    const solidNodeFills: SolidPaint[] = getSolidPaints(nodeFills);

    // GET FILLS
    if (solidNodeFills.length < 1) {
      figma.closePlugin(`"Combinate Colors" requires that text nodes' first fill is a SolidPaint`);
    }

    let nodeFill: SolidPaint = solidNodeFills[0];

    // TODO: replace color equality check with generic equality check
    if (fills.filter(f => areColorsEqual(f.color, f.color)).length === 0)
      fills.push(nodeFill);

    // CREATE MAP OF COLOR-STRINGS TO NODES

  });

  const colorsToNodes: {[key: string]: TextNode[]} = {};
  fills.forEach(f => {
    const c = rgbToString(f.color);
    const nodes = textNodes.filter(n => doesTextNodeHaveSolidPaint(n, f));
    if (colorsToNodes[c]) {
      colorsToNodes[c] = colorsToNodes[c].concat(nodes);
    } else {
      colorsToNodes[c] = nodes;
    }
  });
  const colorOrders = permutation(fills);
  const nodeColorGroups: TextNode[][] = Object.values(colorsToNodes);
  console.log(`${nodeColorGroups}`);

  let numClones = 0;
  colorOrders.forEach(co => {
    numClones++;
    cloneFrame(numClones);
    co.forEach((f,i) => {
      nodeColorGroups[i].forEach(n => {
        // newFill.color = c;
        n.fills = [f]
      })
    })
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
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

function createRectangles(msg) {
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

function halveOpacity(msg) {
  figma.currentPage.selection
    .forEach(node => {
      if ("opacity" in node) node.opacity *= 0.5;
    })
}

function getColors(msg) {
  const fills = [];
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
  const frame = findFrame(figma.currentPage.selection[0]);
  if (frame) {
    const newFrame = frame.clone();
    newFrame.x = newFrame.x + (newFrame.width*cloneNum) + (100*cloneNum);
    console.log("cloned frame?");
  }
}

function findFrame(selectedNode) {
  if (!selectedNode) return undefined;

  if (selectedNode.type !== "FRAME") {
    return findFrame(selectedNode.parent);
  } else {
    return selectedNode;
  }
}

function swapColors(msg) {
  const selection = getTextNodes(figma.currentPage.selection);

  if (selection.length !== 2) {
    figma.closePlugin(`"Swap Colors" works on exactly two text nodes.`);
  } 
  const [first, second] = selection;
  if ("fills" in first && "fills" in second) {
    const fill1 = first.fills[0];
    const fill2 = second.fills[0];
    console.log(`${areColorsEqual(fill1.color, fill2.color)}      ${fill2}`);
    first.fills = [fill2];
    second.fills = [fill1];
  }
}

function getTextNodes(nodes: readonly SceneNode[]) {
  return nodes.filter(n => n.type === "TEXT");
}

function areColorsEqual(c1: RGB, c2: RGB) {
  return (c1.r === c2.r &&
          c1.g === c2.g &&
          c1.b === c2.b
         );
}

function toString({r,g,b}: RGB) {
  return `${r},${g},${b}`;
}

function clone(obj) {
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

function combinateColors(msg) {
  const selection = figma.currentPage.selection;

  const fills: SolidPaint[] = [];
  selection.forEach(n => {
    if ("fills" in n) {
      if (fills.filter(f => areColorsEqual(f.color, n.fills[0].color)).length === 0)
        fills.push(n.fills[0]);
    } else {
      console.error(`"Combinate Colors" accepts only nodes with fills`);
    }
  });

  const colorsToNodes = {};
  selection.forEach(n => {
    if ("fills" in n) {
      const c = toString(n.fills[0].color);
      if (colorsToNodes[c]) {
        colorsToNodes[c] = colorsToNodes[c].concat(n);
      } else {
        colorsToNodes[c] = [n];
      }
    } else {
      // fills.push(null);
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

function permutation(array) {
  function p(array, temp) {
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

  var result = [];
  p(array, []);
  return result;
}
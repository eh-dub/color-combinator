/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

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
    }
    else if (msg.type === 'halve-opacity') {
        halveOpacity(msg);
    }
    else if (msg.type === 'get-colors') {
        getColors(msg);
        return;
    }
    else if (msg.type === 'clone-frame') {
        cloneFrame(1);
    }
    else if (msg.type === 'swap-colors') {
        cloneFrame(1);
        swapColors(msg);
    }
    else if (msg.type === 'combinate-colors') {
        combinateColors(msg);
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
function createRectangles(msg) {
    const nodes = [];
    for (let i = 0; i < msg.count; i++) {
        const rect = figma.createRectangle();
        rect.x = i * 150;
        rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
        figma.currentPage.appendChild(rect);
        nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
}
function halveOpacity(msg) {
    figma.currentPage.selection
        .forEach(node => {
        if ("opacity" in node)
            node.opacity *= 0.5;
    });
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
    figma.ui.postMessage({ type: 'fills', payload: fills });
}
function cloneFrame(cloneNum = 1) {
    const frame = findFrame(figma.currentPage.selection[0]);
    if (frame) {
        const newFrame = frame.clone();
        newFrame.x = newFrame.x + (newFrame.width * cloneNum) + (100 * cloneNum);
        console.log("cloned frame?");
    }
}
function findFrame(selectedNode) {
    if (!selectedNode)
        return undefined;
    if (selectedNode.type !== "FRAME") {
        return findFrame(selectedNode.parent);
    }
    else {
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
function getTextNodes(nodes) {
    return nodes.filter(n => n.type === "TEXT");
}
function areColorsEqual(c1, c2) {
    return (c1.r === c2.r &&
        c1.g === c2.g &&
        c1.b === c2.b);
}
function toString({ r, g, b }) {
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
    const fills = [];
    selection.forEach(n => {
        if ("fills" in n) {
            if (fills.filter(f => areColorsEqual(f.color, n.fills[0].color)).length === 0)
                fills.push(n.fills[0]);
        }
        else {
            console.error(`"Combinate Colors" accepts only nodes with fills`);
        }
    });
    const colorsToNodes = {};
    selection.forEach(n => {
        if ("fills" in n) {
            const c = toString(n.fills[0].color);
            if (colorsToNodes[c]) {
                colorsToNodes[c] = colorsToNodes[c].concat(n);
            }
            else {
                colorsToNodes[c] = [n];
            }
        }
        else {
            // fills.push(null);
        }
    });
    const colorOrders = permutation(fills);
    const nodeColorGroups = Object.values(colorsToNodes);
    console.log(`${nodeColorGroups}`);
    let numClones = 0;
    colorOrders.forEach(co => {
        numClones++;
        cloneFrame(numClones);
        co.forEach((f, i) => {
            nodeColorGroups[i].forEach(n => {
                // newFill.color = c;
                n.fills = [f];
            });
        });
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
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEM7QUFDQTtBQUNBLHVCQUF1Qix3QkFBd0IscUJBQXFCLEVBQUU7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwwQkFBMEIsZ0NBQWdDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHlDQUF5QyxRQUFRLE1BQU07QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0IsY0FBYyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvZGUudHNcIik7XG4iLCIvLyBUaGlzIHBsdWdpbiB3aWxsIG9wZW4gYSBtb2RhbCB0byBwcm9tcHQgdGhlIHVzZXIgdG8gZW50ZXIgYSBudW1iZXIsIGFuZFxuLy8gaXQgd2lsbCB0aGVuIGNyZWF0ZSB0aGF0IG1hbnkgcmVjdGFuZ2xlcyBvbiB0aGUgc2NyZWVuLlxuLy8gVGhpcyBmaWxlIGhvbGRzIHRoZSBtYWluIGNvZGUgZm9yIHRoZSBwbHVnaW5zLiBJdCBoYXMgYWNjZXNzIHRvIHRoZSAqZG9jdW1lbnQqLlxuLy8gWW91IGNhbiBhY2Nlc3MgYnJvd3NlciBBUElzIGluIHRoZSA8c2NyaXB0PiB0YWcgaW5zaWRlIFwidWkuaHRtbFwiIHdoaWNoIGhhcyBhXG4vLyBmdWxsIGJyb3dzZXIgZW52aXJvbWVudCAoc2VlIGRvY3VtZW50YXRpb24pLlxuLy8gaW1wb3J0IGNsb25lRGVlcCBmcm9tICdsb2Rhc2gvY2xvbmVEZWVwJztcbi8vIFRoaXMgc2hvd3MgdGhlIEhUTUwgcGFnZSBpbiBcInVpLmh0bWxcIi5cbmZpZ21hLnNob3dVSShfX2h0bWxfXyk7XG4vLyBDYWxscyB0byBcInBhcmVudC5wb3N0TWVzc2FnZVwiIGZyb20gd2l0aGluIHRoZSBIVE1MIHBhZ2Ugd2lsbCB0cmlnZ2VyIHRoaXNcbi8vIGNhbGxiYWNrLiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBwYXNzZWQgdGhlIFwicGx1Z2luTWVzc2FnZVwiIHByb3BlcnR5IG9mIHRoZVxuLy8gcG9zdGVkIG1lc3NhZ2UuIFxuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcbiAgICAvLyBPbmUgd2F5IG9mIGRpc3Rpbmd1aXNoaW5nIGJldHdlZW4gZGlmZmVyZW50IHR5cGVzIG9mIG1lc3NhZ2VzIHNlbnQgZnJvbVxuICAgIC8vIHlvdXIgSFRNTCBwYWdlIGlzIHRvIHVzZSBhbiBvYmplY3Qgd2l0aCBhIFwidHlwZVwiIHByb3BlcnR5IGxpa2UgdGhpcy5cbiAgICBpZiAobXNnLnR5cGUgPT09ICdjcmVhdGUtcmVjdGFuZ2xlcycpIHtcbiAgICAgICAgY3JlYXRlUmVjdGFuZ2xlcyhtc2cpO1xuICAgIH1cbiAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ2hhbHZlLW9wYWNpdHknKSB7XG4gICAgICAgIGhhbHZlT3BhY2l0eShtc2cpO1xuICAgIH1cbiAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ2dldC1jb2xvcnMnKSB7XG4gICAgICAgIGdldENvbG9ycyhtc2cpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2UgaWYgKG1zZy50eXBlID09PSAnY2xvbmUtZnJhbWUnKSB7XG4gICAgICAgIGNsb25lRnJhbWUoMSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1zZy50eXBlID09PSAnc3dhcC1jb2xvcnMnKSB7XG4gICAgICAgIGNsb25lRnJhbWUoMSk7XG4gICAgICAgIHN3YXBDb2xvcnMobXNnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAobXNnLnR5cGUgPT09ICdjb21iaW5hdGUtY29sb3JzJykge1xuICAgICAgICBjb21iaW5hdGVDb2xvcnMobXNnKTtcbiAgICB9XG4gICAgLy8gTWFrZSBzdXJlIHRvIGNsb3NlIHRoZSBwbHVnaW4gd2hlbiB5b3UncmUgZG9uZS4gT3RoZXJ3aXNlIHRoZSBwbHVnaW4gd2lsbFxuICAgIC8vIGtlZXAgcnVubmluZywgd2hpY2ggc2hvd3MgdGhlIGNhbmNlbCBidXR0b24gYXQgdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuLlxuICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG59O1xuZnVuY3Rpb24gY3JlYXRlUmVjdGFuZ2xlcyhtc2cpIHtcbiAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXNnLmNvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuICAgICAgICByZWN0LnggPSBpICogMTUwO1xuICAgICAgICByZWN0LmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IHsgcjogMSwgZzogMC41LCBiOiAwIH0gfV07XG4gICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLmFwcGVuZENoaWxkKHJlY3QpO1xuICAgICAgICBub2Rlcy5wdXNoKHJlY3QpO1xuICAgIH1cbiAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBub2RlcztcbiAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcobm9kZXMpO1xufVxuZnVuY3Rpb24gaGFsdmVPcGFjaXR5KG1zZykge1xuICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblxuICAgICAgICAuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgaWYgKFwib3BhY2l0eVwiIGluIG5vZGUpXG4gICAgICAgICAgICBub2RlLm9wYWNpdHkgKj0gMC41O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZ2V0Q29sb3JzKG1zZykge1xuICAgIGNvbnN0IGZpbGxzID0gW107XG4gICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uXG4gICAgICAgIC5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBpZiAoXCJmaWxsc1wiIGluIG5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBjbG9uZShub2RlLmZpbGxzKTtcbiAgICAgICAgICAgIGZpbGxzLnB1c2goeFswXSk7XG4gICAgICAgICAgICAvLyBmaWxscy5wdXNoKF8uY2xvbmVEZWVwKG5vZGUuZmlsbHMpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2ZpbGxzJywgcGF5bG9hZDogZmlsbHMgfSk7XG59XG5mdW5jdGlvbiBjbG9uZUZyYW1lKGNsb25lTnVtID0gMSkge1xuICAgIGNvbnN0IGZyYW1lID0gZmluZEZyYW1lKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXSk7XG4gICAgaWYgKGZyYW1lKSB7XG4gICAgICAgIGNvbnN0IG5ld0ZyYW1lID0gZnJhbWUuY2xvbmUoKTtcbiAgICAgICAgbmV3RnJhbWUueCA9IG5ld0ZyYW1lLnggKyAobmV3RnJhbWUud2lkdGggKiBjbG9uZU51bSkgKyAoMTAwICogY2xvbmVOdW0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNsb25lZCBmcmFtZT9cIik7XG4gICAgfVxufVxuZnVuY3Rpb24gZmluZEZyYW1lKHNlbGVjdGVkTm9kZSkge1xuICAgIGlmICghc2VsZWN0ZWROb2RlKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGlmIChzZWxlY3RlZE5vZGUudHlwZSAhPT0gXCJGUkFNRVwiKSB7XG4gICAgICAgIHJldHVybiBmaW5kRnJhbWUoc2VsZWN0ZWROb2RlLnBhcmVudCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWROb2RlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHN3YXBDb2xvcnMobXNnKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZ2V0VGV4dE5vZGVzKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbik7XG4gICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oYFwiU3dhcCBDb2xvcnNcIiB3b3JrcyBvbiBleGFjdGx5IHR3byB0ZXh0IG5vZGVzLmApO1xuICAgIH1cbiAgICBjb25zdCBbZmlyc3QsIHNlY29uZF0gPSBzZWxlY3Rpb247XG4gICAgaWYgKFwiZmlsbHNcIiBpbiBmaXJzdCAmJiBcImZpbGxzXCIgaW4gc2Vjb25kKSB7XG4gICAgICAgIGNvbnN0IGZpbGwxID0gZmlyc3QuZmlsbHNbMF07XG4gICAgICAgIGNvbnN0IGZpbGwyID0gc2Vjb25kLmZpbGxzWzBdO1xuICAgICAgICBjb25zb2xlLmxvZyhgJHthcmVDb2xvcnNFcXVhbChmaWxsMS5jb2xvciwgZmlsbDIuY29sb3IpfSAgICAgICR7ZmlsbDJ9YCk7XG4gICAgICAgIGZpcnN0LmZpbGxzID0gW2ZpbGwyXTtcbiAgICAgICAgc2Vjb25kLmZpbGxzID0gW2ZpbGwxXTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRUZXh0Tm9kZXMobm9kZXMpIHtcbiAgICByZXR1cm4gbm9kZXMuZmlsdGVyKG4gPT4gbi50eXBlID09PSBcIlRFWFRcIik7XG59XG5mdW5jdGlvbiBhcmVDb2xvcnNFcXVhbChjMSwgYzIpIHtcbiAgICByZXR1cm4gKGMxLnIgPT09IGMyLnIgJiZcbiAgICAgICAgYzEuZyA9PT0gYzIuZyAmJlxuICAgICAgICBjMS5iID09PSBjMi5iKTtcbn1cbmZ1bmN0aW9uIHRvU3RyaW5nKHsgciwgZywgYiB9KSB7XG4gICAgcmV0dXJuIGAke3J9LCR7Z30sJHtifWA7XG59XG5mdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cbi8vIEBUT0RPXG4vLyAgLSBuZXcgYnV0dG9uOiBcIkNvbWJpbmF0ZSBDb2xvcnNcIiBET05FXG4vLyAgLSBuZXcgZXZlbnQgaGFuZGxlOiBcImNvbWJpbmF0ZS1jb2xvcnNcIiBET05FXG4vLyAgLSBuZXcgaWYgc3RhdGVtZW50IFwiY29tYmluYXRlLWNvbG9yc1wiIERPTkVcbi8vICAtIG5ldyBmdW5jdGlvbiBcImNvbWJpbmF0ZUNvbG9yc1wiXG4vLyAgLSAgIGZvciBldmVyeSBub2RlXG4vLyAgICAgICAgZ2V0IGl0J3MgZmlsbCBjb2xvciBhbmQgYWRkIGl0IHRvIGEgZGljdCB0aGF0IGlzIGNvbG9yIC0+IFtOb2RlXVxuLy8gICAgICAgIGlmIEkgcGVybXV0ZSBbW05vZGVdXSBhbmQgYXNzaWduIGNvbG9ycyB0byB0aGUgc2FtZSBzcG90cyAoaS5lLiBwaW5rIC0+IDEpXG4vLyAgICAgICAgICB0aGVuIEkgc2hvdWxkIGdldCB0aGUgc2FtZSByZXN1bHQuXG5mdW5jdGlvbiBjb21iaW5hdGVDb2xvcnMobXNnKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xuICAgIGNvbnN0IGZpbGxzID0gW107XG4gICAgc2VsZWN0aW9uLmZvckVhY2gobiA9PiB7XG4gICAgICAgIGlmIChcImZpbGxzXCIgaW4gbikge1xuICAgICAgICAgICAgaWYgKGZpbGxzLmZpbHRlcihmID0+IGFyZUNvbG9yc0VxdWFsKGYuY29sb3IsIG4uZmlsbHNbMF0uY29sb3IpKS5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgZmlsbHMucHVzaChuLmZpbGxzWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFwiQ29tYmluYXRlIENvbG9yc1wiIGFjY2VwdHMgb25seSBub2RlcyB3aXRoIGZpbGxzYCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBjb2xvcnNUb05vZGVzID0ge307XG4gICAgc2VsZWN0aW9uLmZvckVhY2gobiA9PiB7XG4gICAgICAgIGlmIChcImZpbGxzXCIgaW4gbikge1xuICAgICAgICAgICAgY29uc3QgYyA9IHRvU3RyaW5nKG4uZmlsbHNbMF0uY29sb3IpO1xuICAgICAgICAgICAgaWYgKGNvbG9yc1RvTm9kZXNbY10pIHtcbiAgICAgICAgICAgICAgICBjb2xvcnNUb05vZGVzW2NdID0gY29sb3JzVG9Ob2Rlc1tjXS5jb25jYXQobik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb2xvcnNUb05vZGVzW2NdID0gW25dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZmlsbHMucHVzaChudWxsKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGNvbG9yT3JkZXJzID0gcGVybXV0YXRpb24oZmlsbHMpO1xuICAgIGNvbnN0IG5vZGVDb2xvckdyb3VwcyA9IE9iamVjdC52YWx1ZXMoY29sb3JzVG9Ob2Rlcyk7XG4gICAgY29uc29sZS5sb2coYCR7bm9kZUNvbG9yR3JvdXBzfWApO1xuICAgIGxldCBudW1DbG9uZXMgPSAwO1xuICAgIGNvbG9yT3JkZXJzLmZvckVhY2goY28gPT4ge1xuICAgICAgICBudW1DbG9uZXMrKztcbiAgICAgICAgY2xvbmVGcmFtZShudW1DbG9uZXMpO1xuICAgICAgICBjby5mb3JFYWNoKChmLCBpKSA9PiB7XG4gICAgICAgICAgICBub2RlQ29sb3JHcm91cHNbaV0uZm9yRWFjaChuID0+IHtcbiAgICAgICAgICAgICAgICAvLyBuZXdGaWxsLmNvbG9yID0gYztcbiAgICAgICAgICAgICAgICBuLmZpbGxzID0gW2ZdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHBlcm11dGF0aW9uKGFycmF5KSB7XG4gICAgICAgIGZ1bmN0aW9uIHAoYXJyYXksIHRlbXApIHtcbiAgICAgICAgICAgIHZhciBpLCB4O1xuICAgICAgICAgICAgaWYgKCFhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0ZW1wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHggPSBhcnJheS5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgICAgICAgICAgcChhcnJheSwgdGVtcC5jb25jYXQoeCkpO1xuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZShpLCAwLCB4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHAoYXJyYXksIFtdKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
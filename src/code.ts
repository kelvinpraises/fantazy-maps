if (figma.editorType === "figma") {
  figma.showUI(__html__, { width: 350, height: 600, title: "Fantazy maps" });

  figma.ui.onmessage = (msg) => {
    const { type } = msg;
    if (type === "ASSIGN_COLOR") {
      const { selection } = figma.currentPage;
      const { data } = msg;
      const fills = clone((selection[0] as any).fills);
      fills[0].color = data;
      (selection[0] as any).fills = fills;
    }
  };

  figma.ui.onmessage = async (msg) => {
    if (msg.type === "import-svg") {
      const importedNodes = figma.createNodeFromSvg(msg.data);
      figma.currentPage.appendChild(importedNodes);
      figma.ui.postMessage({ type: "svg-imported" });
    }
  };

  // figma.ui.onmessage = async (msg) => {
  //   // figma.ui.postMessage({ type: "svg-imported" });
  //   if (msg.type === "create-frame") {
  //     const nodes = figma.currentPage.selection;

  //     // Get the bounding box of the selection
  //     const x = figma.viewport.bounds.x;
  //     const y = figma.viewport.bounds.y;
  //     const width = figma.viewport.bounds.width;
  //     const height = figma.viewport.bounds.height;

  //     // Create a new frame node
  //     const frame = figma.createFrame();
  //     frame.name = "New Frame";

  //     // Set the position and size of the new frame node
  //     frame.x = x;
  //     frame.y = y;
  //     frame.resize(width, height);

  //     // Add the selected nodes to the new frame
  //     nodes.forEach((node) => {
  //       frame.appendChild(node);
  //     });

  //     // Add the new frame to the current page
  //     figma.currentPage.appendChild(frame);

  //     // Deselect the original nodes
  //     figma.currentPage.selection = [];

  //     // Select the new frame
  //     figma.currentPage.selection = [frame];

  //     figma.ui.postMessage({ type: "frame-created" });
  //   }
  // };

  figma.on("selectionchange", () => {
    detectSelection();
  });

  const detectSelection = () => {
    const { selection } = figma.currentPage;
    if (selection.length) {
      figma.ui.postMessage({ type: "ITEM_SELECTED" });
    } else {
      figma.ui.postMessage({ type: "ITEM_NOT_SELECTED" });
    }
  };

  const clone = (val: any) => {
    return JSON.parse(JSON.stringify(val));
  };

  detectSelection();
}

// // This file holds the main code for the plugin. It has access to the *document*.
// // You can access browser APIs such as the network by creating a UI which contains
// // a full browser environment (see documentation).

// // Runs this code if the plugin is run in Figma
// if (figma.editorType === 'figma') {
//   // This plugin will open a window to prompt the user to enter a number, and
//   // it will then create that many rectangles on the screen.

//   // This shows the HTML page in "ui.html".
//   figma.showUI(__html__);

//   // Calls to "parent.postMessage" from within the HTML page will trigger this
//   // callback. The callback will be passed the "pluginMessage" property of the
//   // posted message.
//   figma.ui.onmessage = msg => {
//     // One way of distinguishing between different types of messages sent from
//     // your HTML page is to use an object with a "type" property like this.
//     if (msg.type === 'create-shapes') {
//       const nodes: SceneNode[] = [];
//       for (let i = 0; i < msg.count; i++) {
//         const rect = figma.createRectangle();
//         rect.x = i * 150;
//         rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
//         figma.currentPage.appendChild(rect);
//         nodes.push(rect);
//       }
//       figma.currentPage.selection = nodes;
//       figma.viewport.scrollAndZoomIntoView(nodes);
//     }

//     // Make sure to close the plugin when you're done. Otherwise the plugin will
//     // keep running, which shows the cancel button at the bottom of the screen.
//     figma.closePlugin();
//   };

// // If the plugins isn't run in Figma, run this code
// } else {
//   // This plugin will open a window to prompt the user to enter a number, and
//   // it will then create that many shapes and connectors on the screen.

//   // This shows the HTML page in "ui.html".
//   figma.showUI(__html__);

//   // Calls to "parent.postMessage" from within the HTML page will trigger this
//   // callback. The callback will be passed the "pluginMessage" property of the
//   // posted message.
//   figma.ui.onmessage = msg => {
//     // One way of distinguishing between different types of messages sent from
//     // your HTML page is to use an object with a "type" property like this.
//     if (msg.type === 'create-shapes') {
//       const numberOfShapes = msg.count;
//       const nodes: SceneNode[] = [];
//       for (let i = 0; i < numberOfShapes; i++) {
//         const shape = figma.createShapeWithText();
//         // You can set shapeType to one of: 'SQUARE' | 'ELLIPSE' | 'ROUNDED_RECTANGLE' | 'DIAMOND' | 'TRIANGLE_UP' | 'TRIANGLE_DOWN' | 'PARALLELOGRAM_RIGHT' | 'PARALLELOGRAM_LEFT'
//         shape.shapeType = 'ROUNDED_RECTANGLE'
//         shape.x = i * (shape.width + 200);
//         shape.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
//         figma.currentPage.appendChild(shape);
//         nodes.push(shape);
//       };

//       for (let i = 0; i < (numberOfShapes - 1); i++) {
//         const connector = figma.createConnector();
//         connector.strokeWeight = 8

//         connector.connectorStart = {
//           endpointNodeId: nodes[i].id,
//           magnet: 'AUTO',
//         };

//         connector.connectorEnd = {
//           endpointNodeId: nodes[i+1].id,
//           magnet: 'AUTO',
//         };
//       };

//       figma.currentPage.selection = nodes;
//       figma.viewport.scrollAndZoomIntoView(nodes);
//     }

//     // Make sure to close the plugin when you're done. Otherwise the plugin will
//     // keep running, which shows the cancel button at the bottom of the screen.
//     figma.closePlugin();
//   };
// };

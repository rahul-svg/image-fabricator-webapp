import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { useLocation } from "react-router-dom";
import "../styles/CanvasEditor.css";

const CanvasEditor = () => {
  const [canvas, setCanvas] = useState(null);
  const [caption, setCaption] = useState("");
  const [canvasLogs, setCanvasLogs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const initCanvas = new fabric.Canvas("canvas", {
      height: 400,
      width: 600,
      backgroundColor: "lightblue",
    });
    setCanvas(initCanvas);
    return () => initCanvas.dispose();
  }, [location]);

  const onHandleChange = (e) => {
    setCaption(e.target.value);
  };

  const addRect = (canv) => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: "green",
    });
    canv.add(rect);
    canv.renderAll();
    logCanvasLayers(canv);
  };

  const addCircle = (canv) => {
    const circle = new fabric.Circle({
      radius: 50,
      fill: "red",
    });
    canv.add(circle);
    canv.renderAll();
    logCanvasLayers(canv);
  };

  const addTriangle = (canv) => {
    const triangle = new fabric.Triangle({
      cornerSize: 20,
      fill: "yellow",
    });
    canv.add(triangle);
    canv.renderAll();
    logCanvasLayers(canv);
  };

  const addPolygon = (canv) => {
    const points = [
      { x: 200, y: 0 },
      { x: 250, y: 50 },
      { x: 250, y: 100 },
      { x: 150, y: 100 },
      { x: 150, y: 50 },
    ];
    const polygon = new fabric.Polygon(points, {
      fill: "yellow",
      left: 100,
      top: 100,
    });
    canv.add(polygon);
    canv.renderAll();
    logCanvasLayers(canv);
  };

  const addImage = (canv) => {
    fabric.Image.fromURL(
      location.state?.largeImageURL || "", // Safe fallback
      (img) => {
        img.scale(0.5);
        img.crossOrigin = "Anonymous";
        canv.add(img);
        canv.renderAll();
        logCanvasLayers(canv);
      },
      { crossOrigin: "Anonymous" }
    );
  };

  const addText = (canv) => {
    if (!caption) {
      alert("Please enter some text first.");
      return;
    }
    const textObj = new fabric.Text(caption, {
      left: 100,
      top: 100,
      fontFamily: "Impact",
      stroke: "#c3bfbf",
      strokeWidth: 3,
    });
    canv.add(textObj);
    canv.renderAll();
    logCanvasLayers(canv);
  };

  const downloadImage = () => {
    const dataURI = canvas.toDataURL("image/png");
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(canvas.msToBlob(), "captioned-image.png");
    } else {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = dataURI;
      a.download = "captioned-image.jpeg";
      a.click();
      document.body.removeChild(a);
    }
  };

  const logCanvasLayers = (canv) => {
    const objects = canv.getObjects();
    const logData = objects.map((obj) => {
      let objectInfo = {
        type: obj.type,
      };

      if (obj.type === "image") {
        objectInfo.src = obj.getSrc();
        objectInfo.scaleX = obj.scaleX;
        objectInfo.scaleY = obj.scaleY;
      } else if (obj.type === "text") {
        objectInfo.text = obj.text;
        objectInfo.fontFamily = obj.fontFamily;
        objectInfo.fontSize = obj.fontSize;
      } else if (
        obj.type === "rect" ||
        obj.type === "circle" ||
        obj.type === "triangle" ||
        obj.type === "polygon"
      ) {
        objectInfo.fill = obj.fill;
        objectInfo.width = obj.width;
        objectInfo.height = obj.height;
      }

      return objectInfo;
    });

    setCanvasLogs(logData);
  };

  return (
    <div className="canvas-container">
      <div className="caption-container">
        <input
          type="text"
          placeholder="Enter Caption"
          value={caption}
          onChange={onHandleChange}
          className="caption-input"
        />
        <button onClick={() => addText(canvas)} className="caption-btn">
          Add Caption
        </button>
      </div>
      <div className="editor-container">
        <div className="canvas-wrapper">
          <canvas id="canvas" className="fabric-canvas" />
        </div>
        <div className="button-wrapper">
          <button onClick={() => addRect(canvas)}>Rectangle</button>
          <button onClick={() => addCircle(canvas)}>Circle</button>
          <button onClick={() => addTriangle(canvas)}>Triangle</button>
          <button onClick={() => addPolygon(canvas)}>Polygon</button>
          <button onClick={() => addImage(canvas)}>Image</button>
          <button onClick={downloadImage}>Download</button>
        </div>
      </div>
      <div className="log-container">
        <h3>Canvas Layers and Attributes</h3>
        <pre>{JSON.stringify(canvasLogs, null, 2)}</pre>
      </div>
    </div>
  );
};

export default CanvasEditor;

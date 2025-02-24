"use client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { FaEraser, FaUndo, FaDownload } from "react-icons/fa";
import { MathJax } from "better-react-mathjax";

export default function Canvas({
  res,
  loading,
  canvasRef,
  contextRef,
  recognizeText,
}) {
  const [isDrawing, setIsDrawing] = useState(false); // Track if user is currently drawing
  const [paths, setPaths] = useState([]); // Store all drawing paths
  const [currentPath, setCurrentPath] = useState([]); // Store current drawing path

  // Initialize canvas when component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Make canvas responsive to container size
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight - container.clientHeight * 0.2;
    }

    const context = canvas.getContext("2d");
    if (!context) return;

    // Set initial canvas drawing properties
    context.fillStyle = "white"; // White background
    context.strokeStyle = "#2563eb"; // Blue color for drawing
    context.lineWidth = 2;
    context.lineCap = "round"; // Smooth line endings
    contextRef.current = context;
  }, []);

  // Handle start of drawing (mouse down or touch start)
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    const { x, y } = getCoordinates(e, canvas);
    setCurrentPath([{ x, y }]); // Start new path at current coordinates
  };

  // Handle active drawing (mouse move or touch move)
  const draw = (e) => {
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;

    e.preventDefault(); // Prevent scrolling while drawing on touch devices
    const { x, y } = getCoordinates(e, canvasRef.current);

    // Update current path with new point
    const newPath = [...currentPath, { x, y }];
    setCurrentPath(newPath);

    // Draw line to new point
    const context = contextRef.current;
    context.beginPath();
    context.moveTo(
      currentPath[currentPath.length - 1].x,
      currentPath[currentPath.length - 1].y
    );
    context.lineTo(x, y);
    context.stroke();
  };

  // Handle end of drawing (mouse up, touch end, or mouse leave)
  const stopDrawing = () => {
    setIsDrawing(false);
    if (currentPath.length > 0) {
      setPaths([...paths, currentPath]); // Save completed path
    }
    setCurrentPath([]); // Reset current path
  };

  // Helper function to get coordinates for both mouse and touch events
  const getCoordinates = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches[0]) {
      // Handle touch event
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    // Handle mouse event
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // Clear entire canvas and reset paths
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    setPaths([]);
    setCurrentPath([]);
  };

  // Undo last drawing path
  const undoLastPath = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    if (paths.length === 0) return;

    // Remove last path from history
    const newPaths = paths.slice(0, -1);
    setPaths(newPaths);

    // Redraw all remaining paths
    context.clearRect(0, 0, canvas.width, canvas.height);
    newPaths.forEach((path) => {
      context.beginPath();
      path.forEach((point, index) => {
        if (index === 0) {
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      });
      context.stroke();
    });
  };

  function downloadImage() {
    const tempCanvas = prepareCanvasImage(canvasRef);
    if (!tempCanvas) return;

    const dataURL = tempCanvas.toDataURL("image/png"); // Convert canvas to image URL
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "handwriting.png"; // Set download filename
    link.click();
    toast.success("Image Downloaded!!!");
  }
  return (
    <main className="flex flex-col h-screen bg-slate-50 max-w-3xl mx-auto p-5">
      <div className="flex items-center justify-between">
        <div className="">
          {/* Question Display Section */}
          <div className="p-4">
            <h2 className="text-2xl font-bold text-blue-600">
              Math Handwriting Recognizer
            </h2>
            {/* <p className="mt-2 text-lg">{question}</p> */}
          </div>

          {/* Canvas Control Tools */}
          <div className="flex items-center gap-2 p-4 border-b">
            <button className="btn" onClick={clearCanvas}>
              <FaEraser className="h-4 w-4" />
              <span className="sr-only">Clear canvas</span>
            </button>
            <button className="btn" onClick={undoLastPath}>
              <FaUndo className="h-4 w-4" />
              <span className="sr-only">Undo last stroke</span>
            </button>
          </div>
        </div>
        {/* Math Rendering */}
        <div className="px-3">
          <div
            className={`animate-ping w-5 h-5 bg-gray-300 rounded-full ${
              loading ? "block" : "hidden"
            }`}
          ></div>
          <div
            className={`text-3xl font-bold ${!loading ? "block" : "hidden"}`}
          >
            <MathJax>{res}</MathJax>
          </div>
        </div>
      </div>
      {/* Drawing Canvas Container */}
      <div className="flex-1 relative p-4">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 touch-none bg-white rounded-lg shadow-sm"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Submit Button */}
      <div className="p-4 flex justify-center gap-x-2">
        <button
          className="btn btn-primary w-full max-w-md text-lg"
          onClick={recognizeText}
        >
          Submit
        </button>
        <button className="btn btn-primary" onClick={downloadImage}>
          <FaDownload />
        </button>
      </div>
    </main>
  );
}

const prepareCanvasImage = (canvasRef) => {
  const canvas = canvasRef.current;
  if (!canvas) return null;

  // Create a temporary canvas
  const tempCanvas = document.createElement("canvas");
  const ctx = tempCanvas.getContext("2d");

  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  // Fill background with white
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  // Draw the existing handwriting on top
  ctx.drawImage(canvas, 0, 0);

  return tempCanvas;
};

export { prepareCanvasImage };

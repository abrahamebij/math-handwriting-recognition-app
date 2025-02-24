"use client";
import Canvas, { prepareCanvasImage } from "./Canvas";
import { useState, useRef } from "react";
import recognizeText from "../database/utils/recognizeText";
import { MathJaxContext } from "better-react-mathjax";
export default function Home() {
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);
  // Refs and state management
  const canvasRef = useRef(null); // Reference to canvas element
  const contextRef = useRef(null); // Reference to canvas context

  const recognize = async () => {
    setLoading(true);
    const canvas = prepareCanvasImage(canvasRef);
    const dataURL = canvas.toDataURL("image/png");
    let response = await recognizeText({ img: dataURL });
    // console.log(response);
    setRes(response);
    setLoading(false);
  };

  return (
    <>
      <MathJaxContext
      >
        <Canvas
          res={res}
          loading={loading}
          recognizeText={recognize}
          canvasRef={canvasRef}
          contextRef={contextRef}
        />
      </MathJaxContext>
    </>
  );
}

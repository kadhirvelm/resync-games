import { useCallback, useEffect, useRef, useState } from "react";
import { throttle } from "lodash-es";

interface Point {
  x: number;
  y: number;
}

export const DrawingBoard = ({
  onCavasChange
}: {
  onCavasChange: (dataUrl: string) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [tool, setTool] = useState<"marker" | "eraser">("marker");
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to match its container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const onSaveCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dataURL = canvas.toDataURL("image/png");
    onCavasChange(dataURL);
  }, []);

  // Create throttled version of onSaveCanvas using lodash-es
  const throttledSaveCanvas = useRef(throttle(onSaveCanvas, 300)).current;

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    throttledSaveCanvas();
  };

  const getPointFromEvent = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ): Point => {
    const rect = canvas.getBoundingClientRect();
    const clientX = ("touches" in e ? e.touches[0]?.clientX : e.clientX) ?? 0;
    const clientY = ("touches" in e ? e.touches[0]?.clientY : e.clientY) ?? 0;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const point = getPointFromEvent(e, canvas);
    setIsDrawing(true);
    setStartPoint(point);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing || !startPoint) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentPoint = getPointFromEvent(e, canvas);

    // Draw line
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 20;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 2;
    }

    ctx.strokeStyle = "#000000";
    ctx.lineCap = "round";
    ctx.stroke();

    setStartPoint(currentPoint);
    throttledSaveCanvas();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setStartPoint(null);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => setTool("marker")}
          style={{
            backgroundColor: tool === "marker" ? "#e0e0e0" : "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "5px",
            padding: "5px 10px"
          }}
        >
          Marker
        </button>
        <button
          onClick={() => setTool("eraser")}
          style={{
            backgroundColor: tool === "eraser" ? "#e0e0e0" : "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "5px",
            padding: "5px 10px"
          }}
        >
          Eraser
        </button>
        <button
          onClick={clearCanvas}
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "5px",
            padding: "5px 10px"
          }}
        >
          Clear
        </button>
      </div>
      <canvas
        onMouseDown={startDrawing}
        onMouseLeave={stopDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
        onTouchStart={startDrawing}
        ref={canvasRef}
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: tool === "eraser" ? "cell" : "crosshair",
          touchAction: "none"
        }}
      />
    </div>
  );
};

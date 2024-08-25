import React, { useRef, useState, useEffect, useCallback } from "react";

interface PanZoomCanvasProps {
  draw: (
    ctx: CanvasRenderingContext2D,
    scale: number,
    translatePos: { x: number; y: number }
  ) => void;
  height: number;
  style?: React.CSSProperties;
  width: number;
}

const PanZoomCanvas: React.FC<PanZoomCanvasProps> = ({
  draw,
  width,
  height,
  style
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [translatePos, setTranslatePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  const handleWheel = useCallback((event: React.WheelEvent) => {
    event.preventDefault();
    const scaleAmount = event.deltaY > 0 ? 0.9 : 1.1;
    setScale((prevScale) => Math.max(0.1, prevScale * scaleAmount));
  }, []);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: event.clientX, y: event.clientY });
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (isDragging) {
        const dx = event.clientX - lastMousePos.x;
        const dy = event.clientY - lastMousePos.y;
        setTranslatePos((prevPos) => ({
          x: prevPos.x + dx,
          y: prevPos.y + dy
        }));
        setLastMousePos({ x: event.clientX, y: event.clientY });
      }
    },
    [isDragging, lastMousePos]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(translatePos.x, translatePos.y);
        ctx.scale(scale, scale);
        draw(ctx, scale, translatePos);
        ctx.restore();
      }
    }
  }, [draw, scale, translatePos]);

  return (
    <canvas
      height={height}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      ref={canvasRef}
      style={{ cursor: isDragging ? "grabbing" : "grab", ...style }}
      width={width}
    />
  );
};

export default PanZoomCanvas;

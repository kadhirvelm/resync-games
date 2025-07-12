import clsx from "clsx";
import { throttle } from "lodash-es";
import { EraserIcon, Redo, Undo } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Flex } from "../radix";
import styles from "./DrawingBoard.module.scss";

interface Point {
  x: number;
  y: number;
}

const COLORS = [
  "#cb4335",
  "#f1c40f",
  "#1d8348",
  "#2e86c1",
  "#8e44ad",
  "#e67e22",
  "#FFC0CB",
  "#c5c8ca",
  "#000000"
];

const LINE_WIDTHS = [2, 5, 10, 15, 20];

export const DrawingBoard = ({
  onCavasChange,
  initialDataUrl
}: {
  initialDataUrl?: string;
  onCavasChange?: (dataUrl: string) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [tool, setTool] = useState<"marker" | "eraser">("marker");
  const [color, setColor] = useState<string>("#000000");
  const [lineWidth, setLineWidth] = useState<number>(5);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);

  const [history, setHistory] = useState<string[]>([]);
  const [redoHistory, setRedoHistory] = useState<string[]>([]);

  const onSaveCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dataURL = canvas.toDataURL("image/png");
    onCavasChange?.(dataURL);
    setHistory((prev) => [...prev, dataURL]);
  }, [onCavasChange]);

  // Create throttled version of onSaveCanvas using lodash-es
  const throttledSaveCanvas = useRef(throttle(onSaveCanvas, 300)).current;

  const loadImage = useCallback((dataUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
    img.src = dataUrl;
  }, []);

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

      // Reload the image after resize if we have initial data
      if (initialDataUrl) {
        loadImage(initialDataUrl);
      }
    };

    resizeCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadImage]);

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

    ctx.lineWidth = lineWidth;

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
    }

    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.stroke();

    setStartPoint(currentPoint);
    setRedoHistory([]);
    throttledSaveCanvas();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setStartPoint(null);
  };

  const onUndo = () => {
    const latestHistory = history[history.length - 1];
    if (!latestHistory) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    loadImage(latestHistory);
    setHistory((prev) => prev.slice(0, -1));
    setRedoHistory((prev) => [...prev, latestHistory]);
  };

  const onRedo = () => {
    const latestRedo = redoHistory[redoHistory.length - 1];
    if (!latestRedo) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    loadImage(latestRedo);
    setRedoHistory((prev) => prev.slice(0, -1));
    setHistory((prev) => [...prev, latestRedo]);
  };

  return (
    <Flex className={styles.temp} direction="column" flex="1" gap="2">
      <canvas
        className={styles.background}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
        onTouchStart={startDrawing}
        ref={canvasRef}
      />
      <Flex align="center">
        {COLORS.map((colorOption) => (
          <Flex
            className={clsx(styles.colorSelector, {
              [styles.active ?? ""]: color === colorOption
            })}
            onClick={() => {
              setTool("marker");
              setColor(colorOption);
            }}
            style={{
              background: colorOption
            }}
          />
        ))}
        <Flex ml="2">
          <Button
            onClick={() => setTool("eraser")}
            variant={tool === "eraser" ? "solid" : "outline"}
          >
            <EraserIcon />
          </Button>
        </Flex>
      </Flex>
      <Flex align="center" gap="2">
        <Flex align="center" flex="1" gap="2">
          {LINE_WIDTHS.map((width) => (
            <svg
              className={clsx(styles.lineWidth, {
                [styles.activeCanvas ?? ""]: lineWidth === width
              })}
              height="40"
              key={width}
              onClick={() => setLineWidth(width)}
              width="40"
            >
              <path
                className={styles.lineWidthInactive}
                d="M20 10 C15 15, 25 25, 20 30"
                fill="none"
                strokeLinecap="round"
                strokeWidth={width / 2}
              />
            </svg>
          ))}
        </Flex>
        <Flex>
          <Button
            disabled={history.length === 0}
            onClick={onUndo}
            variant="outline"
          >
            <Undo />
          </Button>
        </Flex>
        <Flex>
          <Button
            disabled={redoHistory.length === 0}
            onClick={onRedo}
            variant="outline"
          >
            <Redo />
          </Button>
        </Flex>
        <Flex>
          <Button onClick={clearCanvas} variant="outline">
            Clear
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

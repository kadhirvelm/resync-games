import { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import { displayDollar } from "../../utils/displayDollar";

export const TimeSeries = ({
  x,
  xAxisLabel,
  xAxisCursor,
  y
}: {
  x: number[];
  xAxisCursor?: (value: number) => string | undefined;
  xAxisLabel?: (value: number) => string | undefined;
  y: number[];
}) => {
  const chartRef = useRef<uPlot | null>(null);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  const color = () => {
    const start = y[0] ?? 0;
    const end = y[y.length - 1] ?? 0;

    return end <= start
      ? ["rgba(203, 67, 53, 0.3)", "red"]
      : ["rgba(29, 131, 72, 0.3)", "green"];
  };

  useEffect(() => {
    if (chartContainerRef.current == null) {
      return;
    }

    const [fill, stroke] = color();

    chartRef.current = new uPlot(
      {
        axes: [
          {
            grid: {
              show: true
            },
            values: (_, values) =>
              values.map(
                (value) =>
                  xAxisLabel?.(value) ??
                  `${new Date(value).getMinutes().toString().padStart(2, "0")}:${new Date(value).getSeconds().toString().padStart(2, "0")}`
              )
          },
          {
            size: 75,
            values: (_, values) => values.map((value) => displayDollar(value))
          }
        ],
        height: chartContainerRef.current.clientHeight,
        hooks: {
          draw: [
            (u) => {
              const ctx = u.ctx;
              const { top, height } = u.bbox;
              ctx.save();
              ctx.strokeStyle = "rgba(0,0,0,0.5)";
              ctx.lineWidth = 1;

              for (let i = 0; i < u.data[0].length; i++) {
                const date = new Date(u.data[0][i] ?? 0 * 1000);
                if (date.getHours() === 0 && date.getMinutes() === 0) {
                  const x = Math.round(
                    u.valToPos(u.data[0][i] ?? 0, "x", true)
                  );
                  ctx.beginPath();
                  ctx.moveTo(x, top);
                  ctx.lineTo(x, top + height);
                  ctx.stroke();
                }
              }

              ctx.restore();
            }
          ]
        },
        id: "price",
        series: [
          {
            value: (_, value) => {
              return value == null
                ? value
                : (xAxisCursor?.(value) ?? new Date(value).toLocaleString());
            }
          },
          {
            fill,
            label: "Price",
            show: true,
            spanGaps: false,
            stroke,
            value: (_, value) => displayDollar(value),
            width: 1
          }
        ],
        width: chartContainerRef.current.clientWidth
      },
      [x, y],
      chartContainerRef.current
    );

    return () => {
      chartRef.current?.destroy();
    };
  }, [chartRef.current]);

  return <div ref={chartContainerRef} style={{ display: "flex", flex: 1 }} />;
};

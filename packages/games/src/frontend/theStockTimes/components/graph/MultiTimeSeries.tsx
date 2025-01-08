import { useEffect, useRef } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import { displayDollar } from "../../utils/displayDollar";
import React from "react";

export const MultiTimeSeries = ({
  x,
  xAxisLabel,
  xAxisCursor,
  y,
  yLabels
}: {
  x: number[];
  xAxisCursor?: (value: number) => string | undefined;
  xAxisLabel?: (value: number) => string | undefined;
  y: [number[], number[]];
  yLabels: [string, string];
}) => {
  const chartRef = useRef<uPlot | null>(null);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartContainerRef.current == null) {
      return;
    }

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
            fill: "rgba(27, 79, 114, 0.5)",
            label: yLabels[0],
            show: true,
            spanGaps: false,
            stroke: "rgba(23, 32, 42)",
            value: (_, value) => displayDollar(value),
            width: 1
          },
          {
            fill: "rgba(244, 208, 63, 0.5)",
            label: yLabels[1],
            show: true,
            spanGaps: false,
            stroke: "rgba(23, 32, 42)",
            value: (_, value) => displayDollar(value),
            width: 1
          }
        ],
        width: chartContainerRef.current.clientWidth
      },
      [x, y[0], y[1]],
      chartContainerRef.current
    );

    return () => {
      chartRef.current?.destroy();
    };
  }, [chartRef.current]);

  return <div ref={chartContainerRef} style={{ display: "flex", flex: 1 }} />;
};

import React from "react";
import { Group } from "@visx/group";
import { AreaClosed, LinePath } from "@visx/shape";
import { AxisLeft, AxisBottom, AxisScale } from "@visx/axis";
import { LinearGradient } from "@visx/gradient";
import { curveMonotoneX } from "@visx/curve";
import { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { Container, Text } from "@nextui-org/react";
import {
  XYChart,
  AnimatedGrid,
  AnimatedAxis,
  AnimatedLineSeries,
  Tooltip,
} from "@visx/xychart";
import { format } from "date-fns";
import {
  BlockchainId,
  getBlockchainById,
} from "../../../constants/blockchains";
import { Glyph, GlyphCircle } from "@visx/glyph";
import { LegendOrdinal, LegendItem, LegendLabel, Legend } from "@visx/legend";
import events from "events";
import { scaleOrdinal } from "@visx/scale";
import MetricCard from "../../MetricCard/MetricCard";

interface ChartLineData {
  dataset: Array<LineData>;
  color: `#${string}`;
}

type BlockchainIdToLineData = {
  [id in BlockchainId]: ChartLineData;
};

interface LineData {
  x: string;
  y: number;
}

// Initialize some variables
const axisColor = "#fff111";
const axisBottomTickLabelProps = {
  textAnchor: "middle" as const,
  fontFamily: "Arial",
  fontSize: 10,
  fill: axisColor,
};
const axisLeftTickLabelProps = {
  dx: "-0.25em",
  dy: "0.25em",
  fontFamily: "Arial",
  fontSize: 10,
  textAnchor: "end" as const,
  fill: axisColor,
};

const accessors = {
  xAccessor: (d: LineData) => new Date(`${d.x}T00:00:00`),
  yAccessor: (d: LineData) => d.y,
};

const tickLabelOffset = 10;

const ordinalColorScale = scaleOrdinal({
  domain: ["a", "b", "c", "d"],
  range: ["#66d981", "#71f5ef", "#4899f1", "#7d81f6"],
});

const legendGlyphSize = 15;

export default function LineChart({
  data,
  name,
}: {
  data: BlockchainIdToLineData;
  name: string;
}) {
  const dataArray = Object.entries<ChartLineData>(data);
  const latestDataPoints = dataArray.map(([key, data]) => {
    const lastIndex = data.dataset.length - 1;
    return { key, color: data.color, data: data.dataset[lastIndex] };
  });
  console.log(latestDataPoints)
  return (
    <div>
      <Text h1 css={{ mt: 8 }}>
        {name}
      </Text>
      <div style={{display: "flex", gap: "2rem", margin: "1rem 0"}}>
      {latestDataPoints.map(({ key, data, color }) => (
        <MetricCard key={key} blockchainName={getBlockchainById(key).name} value={data.y} color={color} />
      ))}
      </div>
      <LegendOrdinal
        scale={ordinalColorScale}
        labelFormat={(label: any) => `${label.toUpperCase()}`}
      >
        {(labels) => (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {dataArray.map(([key, _], arrIndex) => (
              <LegendItem
                key={`legend-quantile-${key}`}
                margin="0 5px"
                onClick={() => {
                  if (events)
                    alert(`clicked: ${JSON.stringify(getBlockchainById(key))}`);
                }}
              >
                <svg width={legendGlyphSize} height={legendGlyphSize}>
                  <rect
                    fill={
                      Object.entries<ChartLineData>(data)[arrIndex][1].color
                    }
                    width={legendGlyphSize}
                    height={legendGlyphSize}
                  />
                </svg>
                <LegendLabel align="left" margin="0 0 0 4px">
                  {getBlockchainById(key).name}
                </LegendLabel>
              </LegendItem>
            ))}
          </div>
        )}
      </LegendOrdinal>
      <XYChart
        height={270}
        margin={{ left: 60, top: 35, bottom: 38, right: 27 }}
        xScale={{ type: "time" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedGrid
          columns={false}
          numTicks={4}
          lineStyle={{
            stroke: "#e1e1e1",
            strokeLinecap: "round",
            strokeWidth: 1,
          }}
          strokeDasharray="0, 4"
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          orientation="bottom"
          tickLabelProps={() => ({ dy: tickLabelOffset })}
          left={30}
          numTicks={4}
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          orientation="left"
          numTicks={4}
          tickLabelProps={() => ({ dx: -10 })}
        />
        {dataArray.map(([id, chartData]) => (
          <AnimatedLineSeries
            key={id}
            stroke={chartData.color}
            dataKey={id}
            data={chartData.dataset}
            {...accessors}
          />
        ))}

        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          renderGlyph={({ key }: any) => {
            const color = data[key as BlockchainId].color;
            return <GlyphCircle color={color} fill={color} />;
          }}
          showSeriesGlyphs
          glyphStyle={{
            fill: "#008561",
            strokeWidth: 0,
          }}
          renderTooltip={({ tooltipData }: any) => {
            return (
              <div>
                <div className="date">
                  {format(
                    accessors.xAccessor(tooltipData.nearestDatum.datum),
                    "MMM d"
                  )}
                </div>
                {Object.entries(tooltipData.datumByKey).map(
                  (lineDataArray, arrIndex) => {
                    const [key, value] = lineDataArray as any;
                    const blockchain = getBlockchainById(key);
                    const color =
                      Object.entries<ChartLineData>(data)[arrIndex][1].color;

                    return (
                      <div className="row" key={key}>
                        <div style={{ color: color }}>
                          {blockchain.name} {accessors.yAccessor(value.datum)}{" "}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            );
          }}
        />
      </XYChart>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import ColNoSpacing from "src/components/ColNoSpacing";
import { ChartLayout, Container, NoteLayout } from "./barChart.styles";
import BarLabel from "./components/Note";

export interface IDataset {
  label: string;
  backgroundColor?: string[] | string;
  data: number[];
}

export interface INote {
  label: string;
  value: string;
  color: string;
}

export interface IBarChartProps {
  labels: string[];
  datasets: IDataset[];
  tickColor: string;
  notes: INote[];
  options?: unknown;
  canvasStyle?: unknown;
}

const BarChart = (props) => {
  const {
    datasets = [],
    labels = [],
    tickColor = "#8D959C",
    notes,
    options,
    canvasStyle,
  } = props;
  const chartRef: React.Ref<HTMLCanvasElement> = useRef(null);
  useEffect(() => {
    const ctx = chartRef?.current?.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      options: {
        responsive: true,
        aspectRatio: 2,
        maintainAspectRatio: false,
        plugins: {
          legend: false,
        },
        scales: {
          x: {
            ticks: {
              color: tickColor,
              font: "MuseoSans",
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              color: tickColor,
              font: "MuseoSans",
            },
            grid: {
              display: false,
            },
          },
        },
        ...options,
      } as unknown,
      data: {
        labels,
        datasets,
      },
    });
    return () => chart.destroy();
  }, [datasets]);

  return (
    <Container>
      <ChartLayout
        xl={{ size: 12 }}
        lg={{ size: 12 }}
        md={{ size: 12 }}
        sm={{ size: 12 }}
        xs={{ size: 12 }}
      >
        <canvas ref={chartRef} style={canvasStyle} />
      </ChartLayout>
      <NoteLayout>
        {Array.isArray(notes) &&
          notes?.map((note: INote, index: number) => (
            <ColNoSpacing key={index}>
              <BarLabel
                label={note?.label}
                value={note?.value}
                color={note?.color}
              />
            </ColNoSpacing>
          ))}
      </NoteLayout>
    </Container>
  );
};

export default BarChart;

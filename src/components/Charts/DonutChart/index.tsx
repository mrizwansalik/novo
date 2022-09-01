import { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import get from "lodash/get";
import ColNoSpacing from "../../ColNoSpacing";
import PieLabel from "./components/PieLabel";
import {
  Container,
  TitleLayout,
  ChartLayout,
  ChartOverlay,
} from "./donutChart.styles";

export interface IDonutDataset {
  labels: string[];
  backgroundColor: string[];
  data: number[];
}

export interface IDonutChartProps {
  dataset: IDonutDataset;
  hiddenValue?: boolean;
  cutout?: number;
  aspectRatio?: number;
  customOverlay?: React.ReactNode;
}

const DonutChart = (props: IDonutChartProps) => {
  const { dataset, hiddenValue, cutout, aspectRatio, customOverlay } = props;
  const chartRef: React.Ref<HTMLCanvasElement> = useRef(null);

  useEffect(() => {
    const ctx = chartRef?.current?.getContext("2d");
    const chart = new Chart(ctx, {
      type: "doughnut",
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: aspectRatio ? aspectRatio : 1.7,
        cutout: cutout ? cutout : 50,
        plugins: {
          legend: false,
        },
      } as unknown,
      data: {
        labels: dataset?.labels.map((label: string) => label),
        datasets: [dataset],
      },
    });
    return () => chart.destroy();
  }, [dataset]);

  return (
    <Container>
      <ColNoSpacing
        md={{ size: 6, offset: 6 }}
        sm={{ size: 6, offset: 6 }}
        xs={{ size: 12, offset: 0 }}
      >
        <ChartOverlay>{customOverlay}</ChartOverlay>
      </ColNoSpacing>
      <TitleLayout
        md={{ size: 6, order: 1 }}
        sm={{ size: 6, order: 1 }}
        xs={{ size: 12, order: 2 }}
      >
        {Array.isArray(dataset?.labels) &&
          dataset?.labels.map((_, index: number) => (
            <PieLabel
              label={get(dataset, `labels[${index}]`, "")}
              value={get(dataset, `data[${index}]`, "")}
              color={get(dataset, `backgroundColor[${index}]`, "")}
              hiddenValue={hiddenValue}
            />
          ))}
      </TitleLayout>
      <ChartLayout
        md={{ size: 6, order: 2 }}
        sm={{ size: 6, order: 2 }}
        xs={{ size: 12, order: 1 }}
      >
        <canvas ref={chartRef} />
      </ChartLayout>
    </Container>
  );
};

export default DonutChart;

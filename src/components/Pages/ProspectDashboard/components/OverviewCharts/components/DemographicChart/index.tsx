import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import BarChart, { IDataset, INote } from "src/components/Charts/BarChart";
import useStore from "src/utils/useStore";
import { EmptyGraphIcon, NoDataText } from "../../overviewCharts.styles";
import { Container, ChartName } from "./demographicChart.styles";
import { formatCensusForChart } from "./utils";

const DemographicChart = () => {
  const [chartData, setChartData] = useState<IDataset[]>([]);
  const [chartLegend, setChartLegend] = useState<INote[]>([]);

  const { censusDetailsStore } = useStore();
  const { censusHumans } = censusDetailsStore;

  const hasNoCensus = !Array.isArray(censusHumans) || censusHumans.length === 0;

  const ageMappings: string[] = [
    "< 30",
    "30 - 40",
    "40 - 50",
    "50 - 60",
    "> 60",
  ];

  useEffect(() => {
    const { data, legend } = formatCensusForChart(censusHumans);
    setChartData(data);
    setChartLegend(legend);
  }, [censusHumans]);

  return (
    <Container>
      <ChartName>Demographics</ChartName>
      {hasNoCensus ? (
        <>
          <NoDataText>You are missing information</NoDataText>
          <EmptyGraphIcon iconName="graph_empty.jpg" width={195} height={93} />
        </>
      ) : (
        <BarChart
          labels={ageMappings}
          datasets={chartData}
          notes={chartLegend}
        />
      )}
    </Container>
  );
};

export default observer(DemographicChart);

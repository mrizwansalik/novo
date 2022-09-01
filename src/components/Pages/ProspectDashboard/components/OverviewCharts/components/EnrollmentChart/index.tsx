import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import { IDonutDataset } from "src/components/Charts/DonutChart";
import { IPlanParticipation } from "src/interfaces/census";
import { IParamTypes } from "src/types";
import { getPlanParticipation } from "src/utils/census";
import useStore from "src/utils/useStore";
import { EmptyGraphIcon } from "../../overviewCharts.styles";
import {
  Container,
  ChartName,
  DonutChartWrapper,
  NoDataText,
} from "./enrollmentChart.styles";

const EnrollmentChart = () => {
  const [
    planParticipation,
    setPlanParticipation,
  ] = useState<IPlanParticipation>({
    participation_estimation_employee: 0,
    participation_estimation_employee_spouse: 0,
    participation_estimation_employee_child: 0,
    participation_estimation_employee_family: 0,
  });
  const { prospectId } = useParams<IParamTypes>();
  const { censusDetailsStore } = useStore();
  const { censusHumans } = censusDetailsStore;

  const hasNoCensus = !Array.isArray(censusHumans) || censusHumans.length === 0;

  const chartData: IDonutDataset = {
    labels: ["EE", "ES", "EC", "EF"],
    backgroundColor: ["#1fb2ff", "#ffb42e", "#4b27e6", "#fa39e8"],
    data: [
      planParticipation.participation_estimation_employee,
      planParticipation.participation_estimation_employee_spouse,
      planParticipation.participation_estimation_employee_child,
      planParticipation.participation_estimation_employee_family,
    ],
  };

  useEffect(() => {
    censusDetailsStore.getCensusHumansList(prospectId);
  }, [prospectId]);

  useEffect(() => {
    const participation = getPlanParticipation(censusHumans);
    setPlanParticipation(participation);
  }, [censusHumans]);

  return (
    <Container>
      <ChartName>Enrollment</ChartName>
      {hasNoCensus ? (
        <>
          <NoDataText>You are missing information</NoDataText>
          <EmptyGraphIcon iconName="graph_empty.jpg" width={195} height={93} />
        </>
      ) : (
        <DonutChartWrapper dataset={chartData} />
      )}
    </Container>
  );
};

export default observer(EnrollmentChart);

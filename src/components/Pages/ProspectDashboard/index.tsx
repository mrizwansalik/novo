import { useEffect } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import Header from "./components/Header";
import Illustrative from "./components/Illustrative";
import OverviewCharts from "./components/OverviewCharts";
import { Container, Row, ColNoSpacing } from "./prospectDashboard.styles";

const ProspectDashboard = () => {
  const { onboardingQuoteStore, workerStore } = useStore();

  const { prospectId }: IParamTypes = useParams();

  useEffect(() => {
    workerStore.fetchCurrentWorker();
  }, []);

  useEffect(() => {
    onboardingQuoteStore.getProspectDetail(prospectId);
  }, [prospectId]);

  return (
    <Container>
      <Row>
        <ColNoSpacing md={12}>
          <Header />
        </ColNoSpacing>
      </Row>
      <Row>
        <ColNoSpacing md={12}>
          <OverviewCharts />
        </ColNoSpacing>
      </Row>
      <Row>
        <ColNoSpacing md={12}>
          <Illustrative />
        </ColNoSpacing>
      </Row>
    </Container>
  );
};

export default observer(ProspectDashboard);

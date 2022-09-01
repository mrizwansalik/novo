import ClientOverviewChart from "./components/ClientOverviewChart";
import DemographicChart from "./components/DemographicChart";
import EnrollmentChart from "./components/EnrollmentChart";
import {
  EnrollmentLayout,
  DemographicLayout,
  ClientOverviewLayout,
  Container,
} from "./overviewCharts.styles";

const OverviewCharts = () => {
  return (
    <Container>
      <EnrollmentLayout
        xl={{ size: 3 }}
        lg={{ size: 7, order: 1 }}
        md={{ size: 6, order: 1 }}
        sm={{ size: 12 }}
        xs={{ size: 12 }}
      >
        <EnrollmentChart />
      </EnrollmentLayout>
      <DemographicLayout
        xl={{ size: 5 }}
        lg={{ size: 12, order: 2 }}
        md={{ size: 12, order: 2 }}
        sm={{ size: 12 }}
        xs={{ size: 12 }}
      >
        <DemographicChart />
      </DemographicLayout>
      <ClientOverviewLayout
        xl={{ size: 4 }}
        lg={{ size: 5, order: 3 }}
        md={{ size: 6, order: 4 }}
        sm={{ size: 12 }}
        xs={{ size: 12 }}
      >
        <ClientOverviewChart />
      </ClientOverviewLayout>
    </Container>
  );
};

export default OverviewCharts;

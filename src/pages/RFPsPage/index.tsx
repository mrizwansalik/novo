import PageLayout from "src/components/PageLayout";
import RFPsPage from "../../components/Pages/RFPsPage";
import { Container, MainContent } from "./style";
const BrokerageListLayout = () => {
  return (
    <PageLayout title="RFPs | Novo Connection">
      <Container>
        <MainContent>
          <RFPsPage />
        </MainContent>
      </Container>
    </PageLayout>
  );
};

export default BrokerageListLayout;

import React from "react";
import PageLayout from "src/components/PageLayout";
import BrokerageListPage from "../../components/Pages/BrokerageListPage";
import { Container, MainContent } from "./style";
const BrokerageListLayout = () => {
  return (
    <PageLayout title="Brokerages | Novo Connection">
      <Container>
        <MainContent>
          <BrokerageListPage />
        </MainContent>
      </Container>
    </PageLayout>
  );
};

export default BrokerageListLayout;

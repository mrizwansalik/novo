import React from "react";
import SubHeader from "src/components/Header/components/SubHeader";
import PageLayout from "src/components/PageLayout";
import SavedProgramsPage from "../../components/Pages/SavedProgramsPage";
import { Container, MainContent } from "./style";

const BrokerageListLayout = () => {
  return (
    <PageLayout title="My Programs | Novo Connection">
      <Container>
        <SubHeader />
        <MainContent>
          <SavedProgramsPage />
        </MainContent>
      </Container>
    </PageLayout>
  );
};

export default BrokerageListLayout;

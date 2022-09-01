import React from "react";
import PageLayout from "src/components/PageLayout";
import AddBrokeragePage from "../../components/Pages/AddBrokeragePage";
import { Container, MainContent } from "./style";
const AddBrokerageLayout = () => {
  return (
    <PageLayout title="Add Brokerage | Novo Connection">
      <Container>
        <MainContent>
          <AddBrokeragePage />
        </MainContent>
      </Container>
    </PageLayout>
  );
};

export default AddBrokerageLayout;

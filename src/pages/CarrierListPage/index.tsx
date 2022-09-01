import React from "react";
import PageLayout from "src/components/PageLayout";
import CarrierListPage from "src/components/Pages/CarrierListPage";
import { Container, MainContent } from "./style";
const CarrierListLayout = () => {
  return (
    <PageLayout title="Stop Loss Carriers | Novo Connection">
      <Container>
        <MainContent>
          <CarrierListPage />
        </MainContent>
      </Container>
    </PageLayout>
  );
};

export default CarrierListLayout;

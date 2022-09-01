import React from "react";
import PageLayout from "src/components/PageLayout";
import ProgramIngredientListPage from "src/components/Pages/ProgramIngredientsListPage";
import { Container, MainContent } from "./style";
const ProgramIngredientListLayout = () => {
  return (
    <PageLayout title="Program Ingredient | Novo Connection">
      <Container>
        <MainContent>
          <ProgramIngredientListPage />
        </MainContent>
      </Container>
    </PageLayout>
  );
};

export default ProgramIngredientListLayout;

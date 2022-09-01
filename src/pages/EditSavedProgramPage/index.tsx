import React from "react";
import { observer } from "mobx-react";
import PageLayout from "src/components/PageLayout";
import EditSavedProgramPages from "src/components/Pages/EditSavedProgramPage";
import { Container, MainContent } from "./style";

const EditSavedProgramPage = () => {
  return (
    <PageLayout title="Edit Custom Modal Stop-loss | Novo Connection">
      <Container>
        <MainContent>
          <EditSavedProgramPages />
        </MainContent>
      </Container>
    </PageLayout>
  );
};

export default observer(EditSavedProgramPage);

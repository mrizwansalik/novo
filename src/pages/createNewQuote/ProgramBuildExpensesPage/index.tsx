import React from "react";
import { observer } from "mobx-react";
import ProgramBuildExpenses from "src/components/Pages/ProgramBuildExpenses";
import ProgramBuildOnboardingLayout from "src/components/Pages/ProgramBuildOnboardingLayout";

const ProgramBuildExpensesPage = () => {
  return (
    <ProgramBuildOnboardingLayout
      title="Add Expenses | Novo Connection"
      step={6}
    >
      <ProgramBuildExpenses />
    </ProgramBuildOnboardingLayout>
  );
};

export default observer(ProgramBuildExpensesPage);

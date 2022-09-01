import React from "react";
import ProgramBuildExpenses from "src/components/Pages/ProgramBuildExpenses";
import ProgramBuildDashboardLayout from "src/components/ProgramBuildDashboardLayout";

const DashboardProgramBuildExpensesPage = () => {
  return (
    <ProgramBuildDashboardLayout
      title="Add Expenses | Novo Connection"
      step={6}
    >
      <ProgramBuildExpenses />
    </ProgramBuildDashboardLayout>
  );
};

export default DashboardProgramBuildExpensesPage;

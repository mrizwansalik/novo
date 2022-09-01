import React from "react";
import TPAListSection from "src/components/Pages/ProgramBuildTPA";
import ProgramBuildDashboardLayout from "src/components/ProgramBuildDashboardLayout";

const DashboardProgramBuildTPAPage = () => {
  return (
    <ProgramBuildDashboardLayout title="Select TPAs | Novo Connection" step={4}>
      <TPAListSection />
    </ProgramBuildDashboardLayout>
  );
};

export default DashboardProgramBuildTPAPage;

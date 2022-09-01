import React from "react";
import { observer } from "mobx-react";
import ProgramBuildStopLoss from "src/components/Pages/ProgramBuildStopLoss";
import ProgramBuildDashboardLayout from "src/components/ProgramBuildDashboardLayout";

const DashboardProgramBuildStopLossPage = () => {
  return (
    <ProgramBuildDashboardLayout
      title="Create Stop-loss Terms | Novo Connection"
      step={7}
    >
      <>
        <ProgramBuildStopLoss />
      </>
    </ProgramBuildDashboardLayout>
  );
};

export default observer(DashboardProgramBuildStopLossPage);

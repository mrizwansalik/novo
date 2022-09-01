import React from "react";
import { observer } from "mobx-react";
import ProgramBuildOnboardingLayout from "src/components/Pages/ProgramBuildOnboardingLayout";
import ProgramBuildStopLoss from "src/components/Pages/ProgramBuildStopLoss";

const ProgramBuildTPAPage = () => {
  return (
    <ProgramBuildOnboardingLayout
      title="Create Stop-loss Terms | Novo Connection"
      step={7}
    >
      <ProgramBuildStopLoss />
    </ProgramBuildOnboardingLayout>
  );
};

export default observer(ProgramBuildTPAPage);

import React from "react";
import { observer } from "mobx-react";
import ProgramBuildOnboardingLayout from "src/components/Pages/ProgramBuildOnboardingLayout";
import TPAListSection from "src/components/Pages/ProgramBuildTPA";

const ProgramBuildTPAPage = () => {
  return (
    <ProgramBuildOnboardingLayout
      title="Select TPAs | Novo Connection"
      step={4}
    >
      <TPAListSection />
    </ProgramBuildOnboardingLayout>
  );
};

export default observer(ProgramBuildTPAPage);

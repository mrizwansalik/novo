import React from "react";
import DashboardContentLayout from "src/components/Pages/ExistingPlansDashboardContentLayout";
import ExistingPlansParticipation from "src/components/Pages/ExistingPlansParticipation";
import ProspectDashboardLayout from "src/components/ProspectDashboardLayout";

const DashboardPlansParticipationPage = () => {
  return (
    <ProspectDashboardLayout>
      <DashboardContentLayout>
        <ExistingPlansParticipation />
      </DashboardContentLayout>
    </ProspectDashboardLayout>
  );
};

export default DashboardPlansParticipationPage;

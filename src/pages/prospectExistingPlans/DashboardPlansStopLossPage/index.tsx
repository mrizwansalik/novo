import React from "react";
import DashboardContentLayout from "src/components/Pages/ExistingPlansDashboardContentLayout";
import ExistingPlansStopLoss from "src/components/Pages/ExistingPlansStopLoss";
import ProspectDashboardLayout from "src/components/ProspectDashboardLayout";

const DashboardPlansStopLossPage = () => {
  return (
    <ProspectDashboardLayout>
      <DashboardContentLayout>
        <ExistingPlansStopLoss />
      </DashboardContentLayout>
    </ProspectDashboardLayout>
  );
};

export default DashboardPlansStopLossPage;

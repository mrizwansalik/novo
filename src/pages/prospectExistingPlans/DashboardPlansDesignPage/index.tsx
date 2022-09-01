import React from "react";
import DashboardContentLayout from "src/components/Pages/ExistingPlansDashboardContentLayout";
import PlanDesignForm from "src/components/Pages/ExistingPlansDesign/PlanDesignForm";
import ProspectDashboardLayout from "src/components/ProspectDashboardLayout";

const DashboardPlansDesignPage = () => {
  return (
    <ProspectDashboardLayout>
      <DashboardContentLayout>
        <PlanDesignForm />
      </DashboardContentLayout>
    </ProspectDashboardLayout>
  );
};

export default DashboardPlansDesignPage;

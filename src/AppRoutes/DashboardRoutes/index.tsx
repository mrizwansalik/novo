import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "src/HOCs/PrivateRoute";
import ProspectDashboardPage from "src/pages/ProspectDashboardPage";
import DashboardPlansDesignPage from "src/pages/prospectExistingPlans/DashboardPlansDesignPage";
import DashboardPlansDocumentPage from "src/pages/prospectExistingPlans/DashboardPlansDocumentPage";
import DashboardPlansParticipationPage from "src/pages/prospectExistingPlans/DashboardPlansParticipationPage";
import DashboardPlansStopLossPage from "src/pages/prospectExistingPlans/DashboardPlansStopLossPage";
import DashboardProgramBuildExpensesPage from "src/pages/prospectProgramBuild/DashboardProgramBuildExpensesPage";
import DashboardProgramBuildNetworkPage from "src/pages/prospectProgramBuild/DashboardProgramBuildNetworkPage";
import DashboardProgramBuildPharmacyPage from "src/pages/prospectProgramBuild/DashboardProgramBuildPharmacyPage";
import DashboardProgramBuildPlanDesignPage from "src/pages/prospectProgramBuild/DashboardProgramBuildPlanDesignPage";
import DashboardProgramBuildPlanSetsPage from "src/pages/prospectProgramBuild/DashboardProgramBuildPlanSetsPage";
import DashboardProgramBuildSolutionPartnersPage from "src/pages/prospectProgramBuild/DashboardProgramBuildSolutionPartnersPage";
import DashboardProgramBuildStopLossPage from "src/pages/prospectProgramBuild/DashboardProgramBuildStopLossPage";
import DashboardProgramBuildTPAPage from "src/pages/prospectProgramBuild/DashboardProgramBuildTPAPage";
import QouteProposal from "src/pages/QouteProposalRequest";
import QouteRFPsList from "src/pages/QouteRFPsPage";
import QouteRFPsUpdate from "src/pages/QouteRFPsUpdate";
import routes from "src/routes";

const DashboardRoutes = () => {
  return (
    <Switch>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.prospectId.dashboard
            .value
        }
      >
        <ProspectDashboardPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans
            .selfFunded.documents.value
        }
      >
        <DashboardPlansDocumentPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans
            .fullyInsured.documents.value
        }
      >
        <DashboardPlansDocumentPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans
            .selfFunded.stopLoss.value
        }
      >
        <DashboardPlansStopLossPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans
            .selfFunded.design.value
        }
      >
        <DashboardPlansDesignPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans
            .fullyInsured.design.value
        }
      >
        <DashboardPlansDesignPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans
            .selfFunded.participation.value
        }
      >
        <DashboardPlansParticipationPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans
            .fullyInsured.participation.value
        }
      >
        <DashboardPlansParticipationPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe
            .recipeId.network.value
        }
      >
        <DashboardProgramBuildNetworkPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe
            .recipeId.pharmacyBenefitManager.value
        }
      >
        <DashboardProgramBuildPharmacyPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe
            .recipeId.costContainmentVendors.value
        }
      >
        <DashboardProgramBuildSolutionPartnersPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe
            .recipeId.plansets.plans.value
        }
      >
        <DashboardProgramBuildPlanDesignPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe
            .recipeId.plansets.value
        }
      >
        <DashboardProgramBuildPlanSetsPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe
            .recipeId.tpa.value
        }
      >
        <DashboardProgramBuildTPAPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe
            .recipeId.expenses.value
        }
      >
        <DashboardProgramBuildExpensesPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe
            .recipeId.stopLoss.value
        }
      >
        <DashboardProgramBuildStopLossPage />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.prospectId.rfps
            .rfpList.value
        }
      >
        <QouteRFPsList />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.prospectId.rfps
            .proposalRequest.value
        }
      >
        <QouteProposal />
      </PrivateRoute>
      <PrivateRoute
        path={
          routes.dashboard.brokerage.brokerageId.prospects.prospectId.rfps
            .proposalRequestUpdate.value
        }
      >
        <QouteRFPsUpdate />
      </PrivateRoute>
    </Switch>
  );
};
export default DashboardRoutes;

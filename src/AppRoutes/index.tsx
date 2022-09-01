/* eslint-disable max-lines */
import React from "react";
import { createBrowserHistory } from "history";
import { syncHistoryWithStore } from "mobx-react-router";
import { Router, Switch, Route, Redirect } from "react-router";
import Acknowledgement from "src/components/Pages/Addacknowledge";
import BodyMeasurement from "src/components/Pages/Bodymeasurement";
import Contactinfo from "src/components/Pages/Contactinfo";
import Employeecontactdeatil from "src/components/Pages/Contactinfoemployee";
import Dependents from "src/components/Pages/Dependents";
import Dependentsintro from "src/components/Pages/DependentsIntro";
// import Employeestatusform from "src/components/Pages/Employeestatusform";
import Loginverification from "src/components/Pages/loginverification";
import Setpassword from "src/components/Pages/setpassword";
import Signup from "src/components/Pages/signup";
import Signupsetup from "src/components/Pages/signupsetup";
import Adddependents from "src/pages/Adddependents";
import AddedTpas from "src/pages/AddedTpas";
import CarrierListLayout from "src/pages/CarrierListPage";
import ProgramBuildExpensesPage from "src/pages/createNewQuote/ProgramBuildExpensesPage";
import ProgramBuildPlanPage from "src/pages/createNewQuote/ProgramBuildPlanPage";
import ProgramBuildStopLossPage from "src/pages/createNewQuote/ProgramBuildStopLossPage";
import ProgramBuildTPAPage from "src/pages/createNewQuote/ProgramBuildTPAPage";
import CreateTpa from "src/pages/CreateTpa";
import DashboardClaimsLargePage from "src/pages/DashboardClaimsDataPage/DashboardClaimsLargePage";
import DashboardClaimsMonthlyPage from "src/pages/DashboardClaimsDataPage/DashboardClaimsMonthlyPage";
import EditCarrierPage from "src/pages/EditCarrierPage";
import EditSavedProgramPage from "src/pages/EditSavedProgramPage";
import EditTPAProgramIngredients from "src/pages/EditTpaProgramIngredient";
import Employeeposition from "src/pages/Employeeposition";
import Highfive from "src/pages/Highfive";
import OldDashboard from "src/pages/OldDashboard";
import ProgramIngredientListPage from "src/pages/ProgramIngredientsListPage";
import EditProgramIngredients from "src/pages/ProgramIngredientsListPage/EditProgramIngredientsPage";
import Socialsecurityno from "src/pages/Socialsecurity";
import TPAListLayout from "src/pages/TPAListPage";
import UpdateDependent from "src/pages/Updatedependent";
import Waiving from "src/pages/Waiving";
import routes from "src/routes";
import PrivateRoute from "../HOCs/PrivateRoute";
import AddBrokeragePage from "../pages/AddBrokeragePage";
import BrokerageListPage from "../pages/BrokerageListPage";
import CensusCustomTemplatePage from "../pages/CensusCustomTemplatePage";
import CensusDetailPage from "../pages/CensusDetailPage";
import ClientProfilePage from "../pages/ClientProfilePage";
import ExistingPlansDesignPage from "../pages/createNewQuote/ExistingPlansDesignPage";
import ExistingPlansDocumentsPage from "../pages/createNewQuote/ExistingPlansDocumentsPage";
import ExistingPlansPage from "../pages/createNewQuote/ExistingPlansPage";
import ExistingPlansParticipationPage from "../pages/createNewQuote/ExistingPlansParticipationPage";
import ExistingPlansSelfFundedPage from "../pages/createNewQuote/ExistingPlansSelfFundedPage";
import HealthChoicePage from "../pages/createNewQuote/HealthChoicePage";
import HealthClaimsDocumentsPage from "../pages/createNewQuote/HealthClaimsDocumentsPage";
import HealthClaimsHistoryPage from "../pages/createNewQuote/HealthClaimsHistoryPage";
import OnboardingCensusDetailsPage from "../pages/createNewQuote/OnboardingCensusDetailsPage";
import OnboardingCensusPage from "../pages/createNewQuote/OnboardingCensusPage";
import OnboardingCensusTemplatePage from "../pages/createNewQuote/OnboardingCensusTemplatePage";
import OnboardingProfilePage from "../pages/createNewQuote/OnboardingProfilePage";
import PersonalHealthQuestionnairesAssignPage from "../pages/createNewQuote/PersonalHealthQuestionnairesAssignPage";
import PersonalHealthQuestionnairesPage from "../pages/createNewQuote/PersonalHealthQuestionnairesPage";
import PersonalHealthQuestionnairesStatusPage from "../pages/createNewQuote/PersonalHealthQuestionnairesStatusPage";
import ProgramBuildChoicePage from "../pages/createNewQuote/ProgramBuildChoicePage";
import ProgramBuildNetworkPage from "../pages/createNewQuote/ProgramBuildNetworkPage";
import ProgramBuildPharmacyBenefitManagerPage from "../pages/createNewQuote/ProgramBuildPharmacyBenefitManagerPage";
import ProgramBuildPlanSetsPage from "../pages/createNewQuote/ProgramBuildPlanSetsPage";
import ProgramBuildSolutionPartnersPage from "../pages/createNewQuote/ProgramBuildSolutionPartnersPage";
import DashboardClaimsDocumentsPage from "../pages/DashboardClaimsDataPage/DashboardClaimsDocumentsPage";
import DashboardPage from "../pages/DashboardPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import HealthHistoryPage from "../pages/HealthHistoryPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Organizatons from "../pages/OrganizationPage";
import PHQsPage from "../pages/PHQsPage";
import ProgramDetail from "../pages/ProgramDetailPage";
import EditProgram from "../pages/ProgramEditPage";
import ProspectDashboardPage from "../pages/ProspectDashboardPage";
import ProspectsListPage from "../pages/ProspectsListPage";
import Quotemetrics from "../pages/Quotemetrics";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import RFPs from "../pages/RFPsPage";
import SavedPrograms from "../pages/SavedPrograms";
import SetupPassword from "../pages/SetupPasswordPage";
import TeamMemberPage from "../pages/TeamMemberPage";
import Tpaprogramingridients from "../pages/Tpaprogramingridients";
import routerStore from "../stores/routerStore";
import DashboardRoutes from "./DashboardRoutes";

const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, routerStore);

const AppRoute = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path={routes.value} exact={true}>
          <Redirect to={routes.login.value} />
        </Route>
        <Route path={routes.login.value} exact={true} component={LoginPage} />
        <Route path={routes.signup.value} exact={true} component={Signup} />
        <Route
          path={routes.setpassword.value}
          exact={true}
          component={Setpassword}
        />
        <Route
          path={routes.contactinfo.value}
          exact={true}
          component={Contactinfo}
        />
        <Route
          path={routes.employeecontactform.value}
          exact={true}
          component={Employeecontactdeatil}
        />
        <Route
          path={routes.employeeposition.value}
          exact={true}
          component={Employeeposition}
        />
        <Route path={routes.waiving.value} exact={true} component={Waiving} />
        <Route
          path={routes.dependentsintro.value}
          exact={true}
          component={Dependentsintro}
        />
        <Route
          path={routes.dependents.value}
          exact={true}
          component={Dependents}
        />
        <Route
          path={routes.adddependents.value}
          exact={true}
          component={Adddependents}
        />
        <Route
          path={routes.editdependents.value}
          exact={true}
          component={UpdateDependent}
        />
        <Route
          path={routes.acknowledge.value}
          exact={true}
          component={Acknowledgement}
        />
        <Route
          path={routes.socialsecurity.value}
          exact={true}
          component={Socialsecurityno}
        />
        <Route path={routes.highfive.value} exact={true} component={Highfive} />
        <Route
          path={routes.bodymeasurement.value}
          exact={true}
          component={BodyMeasurement}
        />
        <Route
          path={routes.contactinfo.value}
          exact={true}
          component={Contactinfo}
        />
        <Route
          path={routes.loginverified.value}
          exact={true}
          component={Loginverification}
        />
        <Route
          path={routes.goscreen.value}
          exact={true}
          component={Signupsetup}
        />
        <Route
          path={routes.login.forgetPassword.value}
          exact={true}
          component={ForgetPasswordPage}
        />
        <Route path={routes.value} exact={true} component={HomePage} />
        <Route
          path={routes.dashboard.brokerage.teamMembers.value}
          component={TeamMemberPage}
        />
        <Route
          path="/dashboard/brokerage/prospects/:prospectId/dashboard"
          component={ProspectDashboardPage}
        />
        {/* Onboarding routes */}
        <PrivateRoute
          path={
            routes.dashboard.brokerage.prospects.onBoarding.health.choice.value
          }
        >
          <HealthChoicePage />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/brokerage/prospects/onboarding/:prospectId/health/claims-documents">
          <HealthClaimsDocumentsPage />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/brokerage/prospects/onboarding/:prospectId/health/claims-history">
          <HealthClaimsHistoryPage />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/brokerage/prospects/onboarding/:prospectId/health/phqs/invite">
          <PersonalHealthQuestionnairesPage />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/brokerage/prospects/onboarding/:prospectId/health/phqs/assign-phqs">
          <PersonalHealthQuestionnairesAssignPage />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/brokerage/prospects/onboarding/:prospectId/health/phqs/status">
          <PersonalHealthQuestionnairesStatusPage />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/brokerage/prospects/onboarding/:prospectId/program-build/choice">
          <ProgramBuildChoicePage />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/god/brokerage/:orgId/prospects/onboarding/:prospectId/program-build/recipe/:recipeId/network">
          <ProgramBuildNetworkPage />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/god/brokerage/:orgId/prospects/onboarding/:prospectId/program-build/recipe/:recipeId/pharmacy-benefit-manager">
          <ProgramBuildPharmacyBenefitManagerPage />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/god/brokerage/:orgId/prospects/onboarding/:prospectId/program-build/recipe/:recipeId/cost-containment-vendors">
          <ProgramBuildSolutionPartnersPage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.god.brokerages.prospects.onboarding.programBuild
              .recipe.tpa.value
          }
        >
          <ProgramBuildTPAPage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.god.brokerages.prospects.onboarding.programBuild
              .recipe.expenses.value
          }
        >
          <ProgramBuildExpensesPage />
        </PrivateRoute>
        <PrivateRoute
          path={routes.dashboard.god.brokerages.prospects.oldDashboard.value}
        >
          <OldDashboard />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.god.brokerages.prospects.onboarding.programBuild
              .recipe.plansets.plans.value
          }
        >
          <ProgramBuildPlanPage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.god.brokerages.prospects.onboarding.programBuild
              .recipe.plansets.value
          }
        >
          <ProgramBuildPlanSetsPage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.god.brokerages.prospects.onboarding.programBuild
              .recipe.stopLoss.value
          }
        >
          <ProgramBuildStopLossPage />
        </PrivateRoute>{" "}
        {/* End of Onboarding routes */}
        {/*TODO: attached mock HomePage to test navbar routing, willing to mount correct component later*/}
        {/* <Route path={routes.profile.value} component={HomePage} /> */}
        <Route
          path={routes.dashboard.god.brokerages.value}
          exact={true}
          component={HomePage}
        />
        <PrivateRoute path={routes.dashboard.god.brokerages.list.value}>
          <BrokerageListPage />
        </PrivateRoute>
        {/* <PrivateRoute path={routes.dashboard.god.mypage.list.value}> */}
        {/* <Tpaprogramingridients /> */}
        {/* </PrivateRoute> */}
        <PrivateRoute path={routes.dashboard.god.orgs.quoteMetrics.value}>
          <Quotemetrics />
        </PrivateRoute>
        <PrivateRoute path={routes.dashboard.god.carriers.edit.value}>
          <EditCarrierPage />
        </PrivateRoute>
        {/* <PrivateRoute path={routes.dashboard.god.orgs}>
          <Signup />
        </PrivateRoute> */}
        <PrivateRoute path={routes.dashboard.god.tpa.edit.value}>
          <AddedTpas />
        </PrivateRoute>
        <PrivateRoute path={routes.dashboard.god.tpa.add.value}>
          <CreateTpa />
        </PrivateRoute>
        <PrivateRoute path={routes.dashboard.god.tpa.programingredients.value}>
          <Tpaprogramingridients />
        </PrivateRoute>
        <PrivateRoute path={routes.dashboard.god.carriers.list.value}>
          <CarrierListLayout />
        </PrivateRoute>
        <PrivateRoute path={routes.dashboard.god.carriers.edit.value}>
          <EditCarrierPage />
        </PrivateRoute>
        <Route
          path={routes.dashboard.god.brokerages.add.value}
          exact={true}
          component={AddBrokeragePage}
        />
        <PrivateRoute
          path={routes.dashboard.brokerage.prospects.onBoarding.profile.value}
        >
          <OnboardingProfilePage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.brokerage.prospects.onBoarding.census.choice.value
          }
        >
          <OnboardingCensusPage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.brokerage.prospects.onBoarding.census.template
              .value
          }
        >
          <OnboardingCensusTemplatePage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.brokerage.prospects.onBoarding.census.details.value
          }
        >
          <OnboardingCensusDetailsPage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.brokerage.prospects.onBoarding.existingPlans.choice
              .value
          }
        >
          <ExistingPlansPage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.brokerage.prospects.onBoarding.existingPlans
              .planDesign.value
          }
        >
          <ExistingPlansDesignPage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.brokerage.prospects.onBoarding.existingPlans
              .selfFunded.value
          }
        >
          <ExistingPlansSelfFundedPage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.brokerage.prospects.onBoarding.existingPlans
              .participation.value
          }
        >
          <ExistingPlansParticipationPage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.brokerage.prospects.onBoarding.existingPlans
              .documents.value
          }
        >
          <ExistingPlansDocumentsPage />
        </PrivateRoute>
        <PrivateRoute path={routes.dashboard.brokerage.prospects.list.value}>
          <ProspectsListPage />
        </PrivateRoute>
        <PrivateRoute path={"/dashboard/brokerage/:id/prospects/list"}>
          <ProspectsListPage />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/brokerage/prospects/:prospectId/profile">
          <ClientProfilePage />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/brokerage/prospects/:prospectId/census/template/:templateId">
          <CensusCustomTemplatePage />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/brokerage/prospects/:prospectId/census/template">
          <CensusCustomTemplatePage />
        </PrivateRoute>
        <PrivateRoute path="/dashboard/brokerage/prospects/:prospectId/census/details">
          <CensusDetailPage />
        </PrivateRoute>
        <PrivateRoute
          path={routes.dashboard.brokerage.prospects.prospectId.health.value}
        >
          <HealthHistoryPage />
        </PrivateRoute>
        <PrivateRoute
          path={routes.dashboard.brokerage.prospects.prospectId.phqs.value}
        >
          <PHQsPage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.brokerage.prospects.prospectId.claims.documents
              .value
          }
        >
          <DashboardClaimsDocumentsPage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.brokerage.prospects.prospectId.claims.monthlyClaims
              .value
          }
        >
          <DashboardClaimsMonthlyPage />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.brokerage.prospects.prospectId.claims.largeClaims
              .value
          }
        >
          <DashboardClaimsLargePage />
        </PrivateRoute>
        <PrivateRoute path={routes.dashboard.god.rfps.value}>
          <RFPs />{" "}
        </PrivateRoute>
        <PrivateRoute path={routes.dashboard.god.tpa.list.value}>
          <TPAListLayout />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.brokerage.prospects.prospectId.programDetail.value
          }
        >
          <ProgramDetail />
        </PrivateRoute>
        <PrivateRoute
          path={
            routes.dashboard.brokerage.prospects.prospectId.programEdit.value
          }
        >
          <EditProgram />
        </PrivateRoute>
        <PrivateRoute path={routes.dashboard.god.programIngredients.edit.value}>
          <EditProgramIngredients />
        </PrivateRoute>
        <PrivateRoute
          path={routes.dashboard.god.tpa.editTpaProgramIngredients.value}
        >
          <EditTPAProgramIngredients />
        </PrivateRoute>
        <PrivateRoute path={routes.dashboard.god.programIngredients.add.value}>
          <EditProgramIngredients />
        </PrivateRoute>
        <PrivateRoute path={routes.dashboard.god.programIngredients.list.value}>
          <ProgramIngredientListPage />
        </PrivateRoute>
        <PrivateRoute path={routes.dashboard.god.org.list.value}>
          <Organizatons />
        </PrivateRoute>
        <PrivateRoute
          path={routes.dashboard.brokerage.editTemplatePrograms.value}
        >
          <EditSavedProgramPage />
        </PrivateRoute>
        <Route
          path={routes.dashboard.brokerage.prospects.value}
          component={HomePage}
        />
        <Route
          path={routes.dashboard.brokerage.templatePrograms.value}
          component={SavedPrograms}
        />
        <Route
          path={routes.dashboard.brokerage.security.value}
          component={HomePage}
        />
        <Route path={routes.dash.value} component={DashboardPage} />
        <Route
          path={routes.dashboard.brokerage.changePassword.value}
          component={SetupPassword}
        />
        <Route
          path={routes.dashboard.changePassword.value}
          component={ResetPasswordPage}
        />
        {/*END OF TODO*/}
        <DashboardRoutes />
      </Switch>
    </Router>
  );
};
export default AppRoute;

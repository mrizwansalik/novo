import { RouterStore as MobxRouterStore } from "mobx-react-router";
import AuthenticationStore from "./authenticationStore";
import BenefitStore from "./benefitStore";
import BrokerageListStore from "./brokerageListStore";
import BrokerProspectsListStore from "./brokerProspectsListStore";
import BrokerStore from "./brokerStore";
import CarrierListStore from "./carrierListStore";
import CensusDetailsStore from "./censusDetailsStore";
import CreateQuoteStore from "./createQuoteStore";
import ExistingPlansDocumentsStore from "./existingPlansDocumentsStore";
import ExistingPlansStore from "./existingPlansStore";
import HealthHistoryStore from "./healthHistoryStore";
import IllustrativeStore from "./illustrativeStore";
import OnboardingQuoteStore from "./onboardingQuoteStore";
import OrganizationStore from "./organizationStore";
import OrgStore from "./orgStore";
import ProductMetricsStore from "./productmetricsStore";
import ProgramBuildExpensesStore from "./programBuildExpensesStore";
import ProgramBuildPlanSetsStore from "./programBuildPlanSetsStore";
import ProgramBuildStore from "./programBuildStore";
import ProgramBuildTpaStore from "./programBuildTpaStore";
import ProgramIngredientListStore from "./programIngredientsListStore";
import ProgramStore from "./programStore";
import ProspectDashboardStore from "./prospectDashboardStore";
import ProspectProgramsStore from "./prospectProgramsStore";
import QouteProposalStore from "./qouteProposalStore";
import QouteRFPsStore from "./qouteRFPsStore";
import RFPStore from "./rfpStore";
import RouterStore from "./routerStore";
import SavedProgramStore from "./savedProgramStore";
import TPAStore from "./tpaListStore";
import WorkerStore from "./workerStore";
export interface IRootStore {
  authenticationStore: AuthenticationStore;
  brokerProspectsListStore: BrokerProspectsListStore;
  productMetricsStore: ProductMetricsStore;
  brokerStore: BrokerStore;
  censusDetailsStore: CensusDetailsStore;
  onboardingQuoteStore: OnboardingQuoteStore;
  orgStore: OrgStore;
  existingPlansStore: ExistingPlansStore;
  existingPlansDocumentsStore: ExistingPlansDocumentsStore;
  workerStore: WorkerStore;
  routerStore: MobxRouterStore;
  organizationStore: OrganizationStore;
  brokerageListStore: BrokerageListStore;
  carrierListStore: CarrierListStore;
  benefitStore: BenefitStore;
  createQuoteStore: CreateQuoteStore;
  programStore: ProgramStore;
  programBuildStore: ProgramBuildStore;
  programBuildPlanSetsStore: ProgramBuildPlanSetsStore;
  programBuildExpensesStore: ProgramBuildExpensesStore;
  programBuildTpaStore: ProgramBuildTpaStore;
  prospectDashboardStore: ProspectDashboardStore;
  healthHistoryStore: HealthHistoryStore;
  prospectProgramsStore: ProspectProgramsStore;
  rfpStore: RFPStore;
  savedProgramStore: SavedProgramStore;
  tpaStore: TPAStore;
  programIngredientStore: ProgramIngredientListStore;
  illustrativeStore: IllustrativeStore;
  qouteRFPsStore: QouteRFPsStore;
  qouteProposalStore: QouteProposalStore;
}

class RootStore {
  authenticationStore: AuthenticationStore;
  benefitStore: BenefitStore;
  brokerageListStore: BrokerageListStore;
  productMetricsStore: ProductMetricsStore;
  carrierListStore: CarrierListStore;
  brokerProspectsListStore: BrokerProspectsListStore;
  brokerStore: BrokerStore;
  censusDetailsStore: CensusDetailsStore;
  createQuoteStore: CreateQuoteStore;
  existingPlansStore: ExistingPlansStore;
  existingPlansDocumentsStore: ExistingPlansDocumentsStore;
  onboardingQuoteStore: OnboardingQuoteStore;
  organizationStore: OrganizationStore;
  orgStore: OrgStore;
  routerStore: MobxRouterStore;
  workerStore: WorkerStore;
  programStore: ProgramStore;
  programBuildStore: ProgramBuildStore;
  programBuildPlanSetsStore: ProgramBuildPlanSetsStore;
  programBuildExpensesStore: ProgramBuildExpensesStore;
  programBuildTpaStore: ProgramBuildTpaStore;
  prospectDashboardStore: ProspectDashboardStore;
  healthHistoryStore: HealthHistoryStore;
  prospectProgramsStore: ProspectProgramsStore;
  rfpStore: RFPStore;
  savedProgramStore: SavedProgramStore;
  tpaStore: TPAStore;
  programIngredientStore: ProgramIngredientListStore;
  illustrativeStore: IllustrativeStore;
  qouteRFPsStore: QouteRFPsStore;
  qouteProposalStore: QouteProposalStore;

  constructor() {
    this.authenticationStore = new AuthenticationStore(this);
    this.brokerProspectsListStore = new BrokerProspectsListStore(this);
    this.productMetricsStore = new ProductMetricsStore(this);
    this.brokerStore = new BrokerStore(this);
    this.censusDetailsStore = new CensusDetailsStore(this);
    this.onboardingQuoteStore = new OnboardingQuoteStore(this);
    this.orgStore = new OrgStore(this);
    this.existingPlansStore = new ExistingPlansStore(this);
    this.existingPlansDocumentsStore = new ExistingPlansDocumentsStore(this);
    this.workerStore = new WorkerStore(this);
    this.organizationStore = new OrganizationStore(this);
    this.brokerageListStore = new BrokerageListStore(this);
    this.carrierListStore = new CarrierListStore(this);
    this.benefitStore = new BenefitStore(this);
    this.createQuoteStore = new CreateQuoteStore(this);
    this.programStore = new ProgramStore(this);
    this.programBuildStore = new ProgramBuildStore(this);
    this.programBuildPlanSetsStore = new ProgramBuildPlanSetsStore(this);
    this.programBuildExpensesStore = new ProgramBuildExpensesStore(this);
    this.programBuildTpaStore = new ProgramBuildTpaStore(this);
    this.prospectDashboardStore = new ProspectDashboardStore(this);
    this.healthHistoryStore = new HealthHistoryStore(this);
    this.prospectProgramsStore = new ProspectProgramsStore(this);
    this.rfpStore = new RFPStore(this);
    this.savedProgramStore = new SavedProgramStore(this);
    this.tpaStore = new TPAStore(this);
    this.programIngredientStore = new ProgramIngredientListStore(this);
    this.illustrativeStore = new IllustrativeStore(this);
    this.qouteRFPsStore = new QouteRFPsStore(this);
    this.qouteProposalStore = new QouteProposalStore(this);
    this.routerStore = RouterStore;
  }
}

export default function initializeStore(): IRootStore {
  const store = new RootStore();
  return store;
}

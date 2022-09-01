import { get } from "lodash";
import { action, observable, makeObservable } from "mobx";
import moment from "moment";
import {
  getProspectProgress,
  updateProspectDetails,
  getProspectDetails,
} from "src/api/prospects";
import { IOrg } from "src/interfaces/org";
import { IProspectProgress, IPlanDocuments } from "src/interfaces/prospects";
import {
  PROSPECT_SORT_BY,
  PROSPECT_SORT_TYPE,
  PROSPECT_TYPE,
} from "../constants";
import { getBrokerageProspectsList } from "../utils/brokerService";
import { filterSearch } from "../utils/search";
import { IRootStore } from "./rootStore";
class BrokerProspectsListStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.setCurrentProspect = this.setCurrentProspect.bind(this);
    this.setCurrentProspectProgress = this.setCurrentProspectProgress.bind(
      this
    );
  }

  @observable
  currentOrgs: IOrg[] = [];

  @observable
  filteredOrgs: IOrg[] = [];

  @observable
  sortedOrgs: IOrg[] = [];

  @observable
  search: string = "";

  @observable
  sortBy: PROSPECT_SORT_BY = PROSPECT_SORT_BY.CREATED;

  @observable
  sortType: PROSPECT_SORT_TYPE = PROSPECT_SORT_TYPE.ASD;

  @observable
  prospectType: PROSPECT_TYPE = PROSPECT_TYPE.ACTIVE;

  @observable
  currentProspect: IOrg = null;

  @observable
  currentProspectProgress: IProspectProgress = null;

  @observable
  currentPlanDocuments: IPlanDocuments[] = [];

  @action
  public setSearch(search: string) {
    this.search = search;
    this.filterOrgs(search);
  }

  @action
  public setSortBy(sortBy: PROSPECT_SORT_BY) {
    this.sortBy = sortBy;
    this.sortOrgs(sortBy, this.sortType);
  }

  @action
  public setSortType(sortType: PROSPECT_SORT_TYPE) {
    this.sortType = sortType;
    this.sortOrgs(this.sortBy, sortType);
  }

  @action
  public setProspectType(prospectType: PROSPECT_TYPE) {
    this.prospectType = prospectType;

    const { orgDetail } = this.rootStore.orgStore;
    const orgId = get(orgDetail, "id");
    if (orgId) {
      this.getOrgsToFilter(orgId, prospectType);
    }
  }

  @action
  public async setCurrentProspect(prospectId: string): Promise<void> {
    this.currentProspect = await getProspectDetails(prospectId);
    if (this.currentProspect) {
      this.currentPlanDocuments = get(
        this.currentProspect,
        "generic_field_responses.plan_documents",
        []
      );
    }
  }

  @action
  public async getOrgsToFilter(
    orgId: string,
    prospectListType: PROSPECT_TYPE
  ): Promise<void> {
    const prospectsList = await getBrokerageProspectsList(
      orgId,
      prospectListType
    );
    this.currentOrgs = prospectsList;
  }

  @action
  public filterOrgs(search: string) {
    if (!search) {
      this.filteredOrgs = this.currentOrgs;
      return;
    }
    const filteredOrgs = filterSearch(this.currentOrgs, ["name"], search);
    this.filteredOrgs = filteredOrgs;
  }

  @action
  public sortOrgs(sortBy: PROSPECT_SORT_BY, sortType: PROSPECT_SORT_TYPE) {
    let sortFunction;
    switch (sortBy) {
      case PROSPECT_SORT_BY.NAME:
        sortFunction = (a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -sortType;
          }
          return sortType;
        };
        break;
      case PROSPECT_SORT_BY.CREATED:
        sortFunction = (a, b) => {
          const aCreated = moment(a.created, "YYYY-MM-DD");
          const bCreated = moment(b.created, "YYYY-MM-DD");
          if (aCreated.isAfter(bCreated)) {
            return -sortType;
          }
          return sortType;
        };
        break;
      case PROSPECT_SORT_BY.EFFECTIVE_DATE:
        sortFunction = (a, b) => {
          const aEffectiveDate = moment(
            get(a, "census_data.health_plan.effective_date"),
            "YYY-MM-DD"
          );
          const bEffectiveDate = moment(
            get(b, "census_data.health_plan.effective_date"),
            "YYY-MM-DD"
          );

          if (!aEffectiveDate) {
            return -sortType;
          }

          if (!bEffectiveDate) {
            return sortType;
          }

          if (aEffectiveDate.isAfter(bEffectiveDate)) {
            return -sortType;
          }
          return sortType;
        };
        break;
      case PROSPECT_SORT_BY.PRIMARY_ADVISOR:
        sortFunction = (a, b) => {
          const aCreatedBy = get(a, "primary_broker.name", "").toLowerCase();
          const bCreatedBy = get(b, "primary_broker.name", "").toLowerCase();

          if (aCreatedBy < bCreatedBy) {
            return -sortType;
          }
          return sortType;
        };
        break;
    }

    const sortedOrgs = this.filteredOrgs.sort(sortFunction);
    this.sortedOrgs = sortedOrgs;
  }

  @action
  public async setCurrentProspectProgress(prospectId: string) {
    this.currentProspectProgress = await getProspectProgress(prospectId);
  }

  @action
  public setCurrentPlanDocuments(planDocuments: IPlanDocuments[]) {
    this.currentPlanDocuments = planDocuments || [];
  }

  @action
  public async updateProspect(prospectId: string) {
    this.currentProspect.generic_field_responses.plan_documents =
      this.currentPlanDocuments || [];
    this.currentProspect = await updateProspectDetails(
      this.currentProspect,
      prospectId
    );
    this.currentPlanDocuments =
      this.currentProspect.generic_field_responses.plan_documents || [];
  }

  @action addNewPlanDocument(planDocument: IPlanDocuments) {
    this.currentPlanDocuments.push(planDocument);
  }
}

export default BrokerProspectsListStore;

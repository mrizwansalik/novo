import { get } from "lodash";
import { action, observable, makeObservable } from "mobx";
import { getOrgDetail, getOrgList } from "../api/org";
import { IOrg } from "../interfaces/org";
import { filterSearch } from "../utils/search";
import { IRootStore } from "./rootStore";

class OrgStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.setOrgDisplayList = this.setOrgDisplayList.bind(this);
    this.filterDisplayList = this.filterDisplayList.bind(this);
    this.getOrgList = this.getOrgList.bind(this);
  }

  @observable
  orgDetail: IOrg = undefined;

  @observable
  orgDisplayList: any = [];
  @observable
  orgList: any = [];

  @observable
  isGodOrg: boolean = false;

  @action
  public async getOrg(): Promise<void> {
    const fetchedOrg = await getOrgDetail();
    this.orgDetail = fetchedOrg;
    const isGodOrg = get(
      fetchedOrg,
      "is_the_force_strong_with_this_one",
      false
    );
    this.isGodOrg = isGodOrg;
  }

  @action
  public async getOrgList(): Promise<void> {
    const fetchedOrg = await getOrgList();
    this.orgList = fetchedOrg;
    this.orgDisplayList = fetchedOrg;
  }
  @action
  public setOrgDisplayList(orgList: any[]) {
    this.orgDisplayList = orgList;
  }

  @action
  public filterDisplayList(value: string) {
    const filteredDisplayList = filterSearch(this.orgList, ["name"], value);
    this.setOrgDisplayList(filteredDisplayList);
  }
  @action
  public setOrg(org: IOrg): void {
    this.orgDetail = org;
  }
}

export default OrgStore;

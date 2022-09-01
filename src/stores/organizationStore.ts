import { get } from "lodash";
import { action, observable } from "mobx";
import { fetchCurrentOrganization as fetchCurrentOrganizationApi } from "../api/fetchOrganization";
import { IOrganization } from "../interfaces/organization";
import { IRootStore } from "./rootStore";
class OrganizationStore {
  rootStore: IRootStore;
  @observable currentOrganization: IOrganization;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    this.fetchCurrentOrganization = this.fetchCurrentOrganization.bind(this);
  }

  @action
  public async fetchCurrentOrganization() {
    try {
      const organizationInfo: IOrganization = await fetchCurrentOrganizationApi();
      this.currentOrganization = organizationInfo;
      localStorage.setItem(
        "orgName",
        get(this.currentOrganization, "name", "")
      );
    } catch (err) {}
  }
}

export default OrganizationStore;

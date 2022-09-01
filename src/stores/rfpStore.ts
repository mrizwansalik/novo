import { action, observable, makeObservable } from "mobx";
import { rfpList } from "../api/rfps";
import { filterSearch } from "../utils/search";
import { IRootStore } from "./rootStore";

class RFPStore {
  rootStore: IRootStore;

  constructor(rootStore: any) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.setRFPDisplayList = this.setRFPDisplayList.bind(this);
    this.filterDisplayList = this.filterDisplayList.bind(this);
    this.rfpList = this.rfpList.bind(this);
    this.filterStatusDisplayList = this.filterStatusDisplayList.bind(this);
    this.filterBrokerDisplayList = this.filterBrokerDisplayList.bind(this);
    this.filterCarrierDisplayList = this.filterCarrierDisplayList.bind(this);
  }

  @observable
  rfpStore: any[] = [];

  @observable
  rfpDisplayList: any[] = [];

  @action
  async rfpList(): Promise<any> {
    const rfp = await rfpList();
    this.rfpStore = rfp;
    this.rfpDisplayList = rfp;

    return rfp;
  }

  @action
  public setRFPDisplayList(displayList: any[]) {
    this.rfpDisplayList = displayList;
  }

  @action
  public filterDisplayList(value: string) {
    const filteredDisplayList = filterSearch(
      this.rfpStore,
      ["org.name"],
      value
    );
    this.setRFPDisplayList(filteredDisplayList);
  }

  @action
  public filterStatusDisplayList(value: string) {
    const filteredDisplayList = filterSearch(this.rfpStore, ["status"], value);
    this.setRFPDisplayList(filteredDisplayList);
  }
  @action
  public filterBrokerDisplayList(value: string) {
    const filteredDisplayList = filterSearch(
      this.rfpStore,
      ["brokerage.id"],
      value
    );
    this.setRFPDisplayList(filteredDisplayList);
  }
  @action
  public filterCarrierDisplayList(value: string) {
    const filteredDisplayList = filterSearch(
      this.rfpStore,
      ["rfps[stop_loss_carrier.id]"],
      value
    );
    this.setRFPDisplayList(filteredDisplayList);
  }
}

export default RFPStore;

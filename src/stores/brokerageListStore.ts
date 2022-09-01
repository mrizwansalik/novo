import { action, observable, makeObservable } from "mobx";
import { getBrokerageList } from "src/api/brokerage";
import { IBrokerage } from "src/interfaces/broker";
import { filterSearch } from "../utils/search";
import { IRootStore } from "./rootStore";
class BrokerageListStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.getBrokerageList = this.getBrokerageList.bind(this);
    this.setBrokerageDisplayList = this.setBrokerageDisplayList.bind(this);
    this.filterDisplayList = this.filterDisplayList.bind(this);
  }

  @observable
  brokerageList: IBrokerage[] = [];

  @observable
  brokerageDisplayList: IBrokerage[] = [];

  @action
  public async getBrokerageList(): Promise<IBrokerage[]> {
    const brokerages = await getBrokerageList();

    this.brokerageList = brokerages;
    this.brokerageDisplayList = brokerages;

    return brokerages;
  }

  @action
  public setBrokerageDisplayList(displayList: IBrokerage[]) {
    this.brokerageDisplayList = displayList;
  }

  @action
  public filterDisplayList(value: string) {
    const filteredDisplayList = filterSearch(
      this.brokerageList,
      ["name"],
      value
    );
    this.setBrokerageDisplayList(filteredDisplayList);
  }
}

export default BrokerageListStore;

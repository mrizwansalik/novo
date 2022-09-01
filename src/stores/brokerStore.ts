import { action, observable, makeObservable } from "mobx";
import {
  listBrokerageBroker,
  listBrokerageBrokerByOrgId,
} from "src/api/broker";
import { IBroker, IBrokerage } from "src/interfaces/broker";
import { IRootStore } from "./rootStore";

class BrokerStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.getBrokerageBrokers = this.getBrokerageBrokers.bind(this);
  }

  @observable
  brokerage: IBrokerage;

  @observable
  brokerageBrokers: IBroker[] = [];

  @action
  public async getBrokerageBrokers(orgId: string): Promise<IBroker> {
    let brokers;
    if (orgId) {
      brokers = await listBrokerageBrokerByOrgId(orgId);
    } else {
      brokers = await listBrokerageBroker();
    }
    this.brokerageBrokers = brokers;
    return brokers;
  }

  @action
  public setBrokerage(brokerage: IBrokerage) {
    this.brokerage = brokerage;
  }
}

export default BrokerStore;

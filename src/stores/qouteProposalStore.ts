import { action, observable, makeObservable } from "mobx";
import { addProposal, underwriters } from "../api/qouteProposal";
import { IRootStore } from "./rootStore";

class QouteProposalStore {
  rootStore: IRootStore;

  constructor(rootStore: any) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.qouteProposal = this.qouteProposal.bind(this);
    this.getUnderwriters = this.getUnderwriters.bind(this);
  }

  @observable
  qouteRFPs: any[] = [];

  @observable
  underwriters: any[] = [];

  @observable
  rfpDisplayList: any[] = [];

  @action
  async qouteProposal(id: string, data: any): Promise<any> {
    const rfp = await addProposal(id, data);
    this.qouteRFPs = rfp;
    this.rfpDisplayList = rfp;

    return rfp;
  }

  @action
  async getUnderwriters(): Promise<any> {
    const res = await underwriters();
    this.underwriters = res;

    return res;
  }
}

export default QouteProposalStore;

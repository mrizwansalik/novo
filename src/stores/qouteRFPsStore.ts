import { action, observable, makeObservable } from "mobx";
import {
  getQouteRFPs,
  updateQouteRFPs,
  deleteQouteRFPs,
  getMessages,
  getProposals,
  updateProposals,
  addProposals,
  deleteProposals,
  getRates,
  addRates,
  updateRates,
  deleteRates,
  getLasers,
  addLasers,
  updateLasers,
  deleteLasers,
  getRfpSet,
  getQouteOrg,
  createMessage,
  createMessageAllRfps,
} from "../api/qouteRFPs";
import { IRootStore } from "./rootStore";

class RFPStore {
  rootStore: IRootStore;

  constructor(rootStore: any) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.qouteRFPList = this.qouteRFPList.bind(this);
    this.deleteQouteRfp = this.deleteQouteRfp.bind(this);
    this.updateQouteRfp = this.updateQouteRfp.bind(this);
    this.getQouteMessages = this.getQouteMessages.bind(this);
    this.getQouteProposals = this.getQouteProposals.bind(this);
    this.addQouteProposals = this.addQouteProposals.bind(this);
    this.updateQouteProposals = this.updateQouteProposals.bind(this);
    this.deleteQouteProposals = this.deleteQouteProposals.bind(this);
    this.getQouteRates = this.getQouteRates.bind(this);
    this.addQouteRates = this.addQouteRates.bind(this);
    this.updateQouteRates = this.updateQouteRates.bind(this);
    this.deleteQouteRates = this.deleteQouteRates.bind(this);
    this.getQouteLasers = this.getQouteLasers.bind(this);
    this.addQouteLasers = this.addQouteLasers.bind(this);
    this.updateQouteLasers = this.updateQouteLasers.bind(this);
    this.deleteQouteLasers = this.deleteQouteLasers.bind(this);
    this.getRfpSet = this.getRfpSet.bind(this);
    this.getQouteOrg = this.getQouteOrg.bind(this);
    this.getBroker = this.getBroker.bind(this);
    this.createQouteMessage = this.createQouteMessage.bind(this);
    this.createQouteMessageWithRfps = this.createQouteMessageWithRfps.bind(
      this
    );
  }

  @observable
  qouteRFPs: any[] = [];

  @observable
  qouteMessages: any[] = [];

  @observable
  qouteDisplayMessagesList: any[] = [];

  @observable
  qouteProposals: any[] = [];

  @observable
  qouteRates: any[] = [];

  @observable
  qouteLasers: any[] = [];

  @observable
  rfpDisplayList: any[] = [];

  @observable
  rfpSetList: any[] = [];

  @observable
  qouteOrg: any = {};

  @observable
  broker: any = {};

  @action
  async qouteRFPList(id: string): Promise<any> {
    const rfp = await getQouteRFPs(id);
    this.qouteRFPs = rfp;
    this.rfpDisplayList = rfp;

    return rfp;
  }

  @action
  async getRfpSet(id: string): Promise<any> {
    const rfp = await getRfpSet(id);
    this.rfpSetList = rfp;

    return rfp;
  }

  @action
  async getQouteOrg(id: string): Promise<any> {
    const rfp = await getQouteOrg(id);
    this.qouteOrg = rfp;

    return rfp;
  }
  @action
  async getBroker(id: string): Promise<any> {
    const rfp = await getQouteOrg(id);
    this.broker = rfp;

    return rfp;
  }

  @action
  async getQouteMessages(orgId: string, rfpId: string): Promise<any> {
    const res = await getMessages(orgId, rfpId);
    this.qouteMessages = res;

    return res;
  }

  @action
  async createQouteMessage(
    orgId: string,
    rfpId: string,
    data: any
  ): Promise<any> {
    const res = await createMessage(orgId, rfpId, data);
    this.qouteMessages = [...this.qouteMessages, res];

    return res;
  }

  @action
  async createQouteMessageWithRfps(
    orgId: string,
    rfpId: string,
    data: any
  ): Promise<any> {
    const res = await createMessageAllRfps(orgId, rfpId, data);
    this.qouteMessages = [...this.qouteMessages, res];

    return res;
  }

  @action
  async updateQouteRfp(orgId: string, rfpId: string, data: any): Promise<any> {
    const res = await updateQouteRFPs(orgId, rfpId, data);

    return res;
  }

  @action
  async deleteQouteRfp(orgId: string, rfpId: string): Promise<any> {
    const res = await deleteQouteRFPs(orgId, rfpId);

    return res;
  }

  @action
  async getQouteProposals(orgId: string, rfpId: string): Promise<any> {
    const res = await getProposals(orgId, rfpId);
    this.qouteProposals = res;

    return res;
  }

  @action
  async addQouteProposals(
    orgId: string,
    rfpId: string,
    data: any
  ): Promise<any> {
    const res = await addProposals(orgId, rfpId, data);

    return res;
  }
  @action
  async updateQouteProposals(
    orgId: string,
    rfpId: string,
    proposalId: string,
    data: any
  ): Promise<any> {
    const res = await updateProposals(orgId, rfpId, proposalId, data);

    return res;
  }

  @action
  async deleteQouteProposals(
    orgId: string,
    rfpId: string,
    proposalId: string
  ): Promise<any> {
    const res = await deleteProposals(orgId, rfpId, proposalId);

    return res;
  }

  @action
  async getQouteRates(orgId: string, rfpId: string): Promise<any> {
    const res = await getRates(orgId, rfpId);
    this.qouteRates = res;

    return res;
  }
  @action
  async addQouteRates(orgId: string, rfpId: string, data: any): Promise<any> {
    const res = await addRates(orgId, rfpId, data);

    return res;
  }
  @action
  async updateQouteRates(
    orgId: string,
    rfpId: string,
    rateId: string,
    data: any
  ): Promise<any> {
    const res = await updateRates(orgId, rfpId, rateId, data);

    return res;
  }
  @action
  async deleteQouteRates(
    orgId: string,
    rfpId: string,
    rateId: string
  ): Promise<any> {
    const res = await deleteRates(orgId, rfpId, rateId);

    return res;
  }

  @action
  async getQouteLasers(orgId: string, rfpId: string): Promise<any> {
    const res = await getLasers(orgId, rfpId);
    this.qouteLasers = res;

    return res;
  }
  @action
  async addQouteLasers(orgId: string, rfpId: string, data: any): Promise<any> {
    const res = await addLasers(orgId, rfpId, data);

    return res;
  }
  @action
  async updateQouteLasers(
    orgId: string,
    rfpId: string,
    laserId: string,
    data: any
  ): Promise<any> {
    const res = await updateLasers(orgId, rfpId, laserId, data);

    return res;
  }

  @action
  async deleteQouteLasers(
    orgId: string,
    rfpId: string,
    laserId: string
  ): Promise<any> {
    const res = await deleteLasers(orgId, rfpId, laserId);

    return res;
  }
}

export default RFPStore;

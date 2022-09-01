import { action, observable, makeObservable } from "mobx";
import {
  createStopLossCarrier,
  deleteStopLossCarrier,
  getStopLossCarrier,
  updateStopLossCarrier,
  getCarrier,
} from "src/api/carrier";
import { IStopLossCarrier } from "src/interfaces/carrier";
import { filterSearch } from "../utils/search";
import { IRootStore } from "./rootStore";
class CarrierListStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.getCarrierList = this.getCarrierList.bind(this);
    this.setBrokerageDisplayList = this.setBrokerageDisplayList.bind(this);
    this.filterDisplayList = this.filterDisplayList.bind(this);
  }

  @observable
  carrierList: IStopLossCarrier[] = [];

  @observable
  carrierDisplayList: IStopLossCarrier[] = [];

  @action
  public async getCarrierList(): Promise<IStopLossCarrier[]> {
    const carriers = await getStopLossCarrier();

    this.carrierList = carriers;
    this.carrierDisplayList = carriers;

    return carriers;
  }
  @action
  public async getCarrier(): Promise<IStopLossCarrier[]> {
    const carriers = await getCarrier();

    this.carrierList = carriers;
    this.carrierDisplayList = carriers;

    return carriers;
  }

  @action
  public setBrokerageDisplayList(displayList: IStopLossCarrier[]) {
    this.carrierDisplayList = displayList;
  }

  @action
  public filterDisplayList(value: string) {
    const filteredDisplayList = filterSearch(this.carrierList, ["name"], value);
    this.setBrokerageDisplayList(filteredDisplayList);
  }

  @action
  public async createStopLossCarrier(
    carrier: IStopLossCarrier
  ): Promise<IStopLossCarrier> {
    const createdCarrier = await createStopLossCarrier(carrier);
    this.carrierDisplayList = [...this.carrierDisplayList, createdCarrier];
    return createdCarrier;
  }

  @action
  public async updateStopLossCarrier(
    carrier: IStopLossCarrier
  ): Promise<IStopLossCarrier> {
    const updatedCarrier = await updateStopLossCarrier(carrier);
    this.carrierDisplayList = [
      ...this.carrierDisplayList.filter((i) => i.id === carrier.id),
      updatedCarrier,
    ];
    return updatedCarrier;
  }
  @action
  public async deleteCarrier(carrierId: string): Promise<IStopLossCarrier> {
    const updatedCarrier = await deleteStopLossCarrier(carrierId);
    this.carrierDisplayList = this.carrierDisplayList.filter(
      (i) => i.id !== carrierId
    );
    return updatedCarrier;
  }
}

export default CarrierListStore;

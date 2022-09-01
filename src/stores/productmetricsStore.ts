import { action, observable, makeObservable } from "mobx";
import { GetProductlist } from "src/api/productMetrics";
import { IProduct } from "src/interfaces/productmetrics";

import { IRootStore } from "./rootStore";
class productMetricsStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.GetProductList = this.GetProductList.bind(this);
  }
  @observable
  productList: IProduct[] = [];
  @action
  public async GetProductList(): Promise<any[]> {
    const product = await GetProductlist();

    this.productList = product;

    return product;
  }
}
export default productMetricsStore;

import { action, observable, makeObservable } from "mobx";
import { ITpa } from "src/interfaces/benefit";
import { IRootStore } from "./rootStore";

class ProgramBuildTpaStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable
  tpas: ITpa[] = [];

  @observable
  filteredTpas: ITpa[] = [];

  @observable
  tpaDisplaySettings: {};

  @observable
  filters = {
    text: "",
    category: "all",
  };

  @observable
  collapseAll: boolean = true;

  @action
  public setTpas(tpas: ITpa[]) {
    this.tpas = tpas;
  }

  @action
  public setFilteredTpas(filteredTpas: ITpa[]) {
    this.filteredTpas = filteredTpas;
  }

  @action
  public setTpaDisplaySettings(tpaDisplaySettings) {
    this.tpaDisplaySettings = tpaDisplaySettings;
  }

  @action
  public setCollapseAll(collapseAll: boolean) {
    this.collapseAll = collapseAll;
  }
}

export default ProgramBuildTpaStore;

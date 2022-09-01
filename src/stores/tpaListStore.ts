import { action, observable, makeObservable } from "mobx";
import {
  getTPA,
  getTPAPrograms,
  createTPA,
  updateTPA,
  deleteTPA,
  getSingleTPA,
  addTpaProgram,
  updateTpaProgram,
  deleteTpaProgram,
  getSingleTpaProgram,
} from "src/api/tpa";
import { ITPA } from "src/interfaces/tpa";
import { TypeFilter } from "../constants";
import { filterSearch } from "../utils/search";
import { IRootStore } from "./rootStore";
class TPAListStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.getTPAList = this.getTPAList.bind(this);
    this.setBrokerageDisplayList = this.setBrokerageDisplayList.bind(this);
    this.filterDisplayList = this.filterDisplayList.bind(this);
    this.FilterByTypes = this.FilterByTypes.bind(this);
    this.getTpaPrograms = this.getTpaPrograms.bind(this);
    this.createTpa = this.createTpa.bind(this);
    this.updateTPA = this.updateTPA.bind(this);
    this.deleteTPA = this.deleteTPA.bind(this);
    this.getSingleTPA = this.getSingleTPA.bind(this);
    this.createTpaProgram = this.createTpaProgram.bind(this);
    this.updateTpaProgram = this.updateTpaProgram.bind(this);
    this.deleteTPAProgram = this.deleteTPAProgram.bind(this);
    this.FilterProgramIngredientBySubTypes = this.FilterProgramIngredientBySubTypes.bind(
      this
    );
    this.filterTpaProgramIngredient = this.filterTpaProgramIngredient.bind(
      this
    );
    this.FilterProgramIngredientByTypes = this.FilterProgramIngredientByTypes.bind(
      this
    );
    this.setTpaProgramIngredientList = this.setTpaProgramIngredientList.bind(
      this
    );
  }

  @observable
  TPAList: ITPA[] = [];

  @observable
  TPADisplayList: ITPA[] = [];

  @observable
  TpaProgramsList: any[] = [];

  @observable
  TpaProgramsDisplayList: any[] = [];

  @observable
  singleTpa: any = {};

  @observable
  singleTpaProgram: any = {};

  @observable
  sortBy: TypeFilter = TypeFilter.STANDANDARD;

  @action
  public async getTPAList(): Promise<ITPA[]> {
    const tpas = await getTPA();

    this.TPAList = tpas;

    this.TPADisplayList = filterSearch(tpas, ["is_standard"], this.sortBy);

    return tpas;
  }

  @action
  public setBrokerageDisplayList(displayList: ITPA[]) {
    this.TPADisplayList = displayList;
  }
  @action
  public setTpaProgramIngredientList(displayList: ITPA[]) {
    this.TpaProgramsDisplayList = displayList;
  }

  @action
  public filterDisplayList(value: string) {
    const filteredDisplayList = filterSearch(this.TPAList, ["name"], value);
    this.setBrokerageDisplayList(filteredDisplayList);
  }

  @action
  public filterTpaProgramIngredient(value: string) {
    const filteredDisplayList = filterSearch(
      this.TpaProgramsList,
      ["name"],
      value
    );
    this.setTpaProgramIngredientList(filteredDisplayList);
  }

  @action
  public FilterByTypes(value: string) {
    const filteredDisplayList = filterSearch(
      this.TPAList,
      ["is_standard"],
      value
    );
    this.setBrokerageDisplayList(filteredDisplayList);
  }
  @action
  public FilterProgramIngredientByTypes(value: string) {
    const filteredDisplayList = filterSearch(
      this.TpaProgramsList,
      ["is_standard"],
      value
    );
    this.setTpaProgramIngredientList(filteredDisplayList);
  }

  @action
  public FilterProgramIngredientBySubTypes(value: string) {
    const filteredDisplayList = filterSearch(
      this.TpaProgramsList,
      ["network_ingredient_sub_type"],
      value
    );
    this.setTpaProgramIngredientList(filteredDisplayList);
  }

  @action
  public async getTpaPrograms(tpaId: string): Promise<any[]> {
    const res = await getTPAPrograms(tpaId);
    this.TpaProgramsList = res;
    this.TpaProgramsDisplayList = filterSearch(
      res,
      ["is_standard"],
      this.sortBy
    );
    return res;
  }

  @action
  public async getSingleTPA(tpaId: string): Promise<any> {
    const res = await getSingleTPA(tpaId);
    this.singleTpa = res;
    return res;
  }

  @action
  public async createTpa(tpa): Promise<any> {
    const createdCarrier = await createTPA(tpa);
    this.TPADisplayList = [...this.TPADisplayList, createdCarrier];
    return createdCarrier;
  }

  @action
  public async updateTPA(tpa: any): Promise<any> {
    const updatedCarrier = await updateTPA(tpa);
    this.TPADisplayList = [
      ...this.TPADisplayList.filter((i) => i.id === tpa.id),
      updatedCarrier,
    ];
    return updatedCarrier;
  }
  @action
  public async deleteTPA(tpaId: string): Promise<any> {
    const updatedCarrier = await deleteTPA(tpaId);
    this.TPADisplayList = this.TPADisplayList.filter((i) => i.id !== tpaId);
    return updatedCarrier;
  }

  @action
  public async getSingleTPAProgram(
    tpaId: string,
    programId: string
  ): Promise<any> {
    const res = await getSingleTpaProgram(tpaId, programId);
    this.singleTpa = res;
    return res;
  }

  @action
  public async createTpaProgram(tpaId: string, data: any): Promise<any> {
    const createdCarrier = await addTpaProgram(tpaId, data);
    this.TpaProgramsDisplayList = [
      ...this.TpaProgramsDisplayList,
      createdCarrier,
    ];
    return createdCarrier;
  }

  @action
  public async updateTpaProgram(tpaId: string, data: any): Promise<any> {
    const updatedCarrier = await updateTpaProgram(tpaId, data);
    this.TpaProgramsDisplayList = [
      ...this.TpaProgramsDisplayList.filter((i) => i.id === data.id),
      updatedCarrier,
    ];
    return updatedCarrier;
  }
  @action
  public async deleteTPAProgram(
    tpaId: string,
    programId: string
  ): Promise<any> {
    const updatedCarrier = await deleteTpaProgram(tpaId, programId);
    this.TpaProgramsDisplayList = this.TpaProgramsDisplayList.filter(
      (i) => i.id !== tpaId
    );
    return updatedCarrier;
  }
}

export default TPAListStore;

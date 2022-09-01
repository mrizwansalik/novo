import { action, observable, makeObservable } from "mobx";
import {
  getProgramIngredient,
  updateProgramIngredient,
  deleteProgramIngredient,
  createProgramIngredient,
} from "src/api/programIngredients";
import { IProgramIngredients } from "src/interfaces/programIngredients";
import { TypeFilter, SubTypeFilter } from "../constants";
import { filterSearch } from "../utils/search";
import { IRootStore } from "./rootStore";
class ProgramIngredientListStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.getProgramIngredientsList = this.getProgramIngredientsList.bind(this);
    this.setProgamIngredientsDisplayList = this.setProgamIngredientsDisplayList.bind(
      this
    );
    this.filterDisplayList = this.filterDisplayList.bind(this);
    this.createProgramIngredient = this.createProgramIngredient.bind(this);
    this.deleteProgramIngredient = this.deleteProgramIngredient.bind(this);
    this.updateProgramIngredient = this.updateProgramIngredient.bind(this);
    this.FilterByTypes = this.FilterByTypes.bind(this);
    this.SubTypeFilter = this.SubTypeFilter.bind(this);
  }

  @observable
  programIngredientsList: any = [];

  @observable
  programIngredientsDisplayList: any = [];

  @observable
  sortBy: TypeFilter = TypeFilter.STANDANDARD;
  @observable
  subTypeFilter: SubTypeFilter = SubTypeFilter.ALL;

  @action
  public async getProgramIngredientsList(id): Promise<any> {
    const programIngredients = await getProgramIngredient(id);

    this.programIngredientsList = programIngredients;
    this.programIngredientsDisplayList = filterSearch(
      programIngredients,
      ["is_standard"],
      this.sortBy
    );

    return programIngredients;
  }

  @action
  public setProgamIngredientsDisplayList(displayList: IProgramIngredients[]) {
    this.programIngredientsDisplayList = displayList;
  }

  @action
  public filterDisplayList(value: string) {
    const filteredDisplayList = filterSearch(
      this.programIngredientsList,
      ["name"],
      value
    );
    this.setProgamIngredientsDisplayList(filteredDisplayList);
  }

  @action
  public async createProgramIngredient(
    id,
    program: IProgramIngredients
  ): Promise<IProgramIngredients> {
    const createdCarrier = await createProgramIngredient(id, program);
    this.programIngredientsDisplayList = [
      ...this.programIngredientsDisplayList,
      createdCarrier,
    ];
    return createdCarrier;
  }

  @action
  public async updateProgramIngredient(
    id,
    program: IProgramIngredients
  ): Promise<IProgramIngredients> {
    const updatedCarrier = await updateProgramIngredient(id, program);
    this.programIngredientsDisplayList = [
      ...this.programIngredientsDisplayList.filter((i) => i.id === program.id),
      updatedCarrier,
    ];
    return updatedCarrier;
  }

  @action
  public FilterByTypes(value: string) {
    const filteredDisplayList = filterSearch(
      this.programIngredientsList,
      ["is_standard"],
      value
    );
    this.setProgamIngredientsDisplayList(filteredDisplayList);
  }
  @action
  public SubTypeFilter(value: string) {
    const filteredDisplayList = filterSearch(
      this.programIngredientsList,
      ["sub_type"],
      value
    );
    this.setProgamIngredientsDisplayList(filteredDisplayList);
  }

  @action
  public async deleteProgramIngredient(
    id,
    programId: string
  ): Promise<IProgramIngredients> {
    const updatedCarrier = await deleteProgramIngredient(id, programId);
    this.programIngredientsDisplayList = this.programIngredientsDisplayList.filter(
      (i) => i.id !== programId
    );
    return updatedCarrier;
  }
}

export default ProgramIngredientListStore;

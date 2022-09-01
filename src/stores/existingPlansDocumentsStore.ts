import { action, makeObservable, observable } from "mobx";
import { existingPlanDocumentTypeChoices } from "src/constants/quote";
import { IExistingPlanDocumentTypeChoice } from "./../constants/quote/index";
import { IExistingPlanDocument } from "./../interfaces/document";
import { IRootStore } from "./rootStore";

class ExistingPlansDocumentsStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable
  files: IExistingPlanDocument[] = [];

  @observable
  categoryTypes: IExistingPlanDocumentTypeChoice[] = existingPlanDocumentTypeChoices;

  @action
  public async onInit() {
    // TODO: suppose to be version, dont know how to get it yet, default undefined
    if (true) {
      // only return existing plan document types are needed for fully funded plans
      this.categoryTypes = this.categoryTypes.filter(
        (categoryType) => categoryType.fullyFunded
      );
    }
  }

  @action
  public async setFiles(files: IExistingPlanDocument[]) {
    this.files = files;
  }
}

export default ExistingPlansDocumentsStore;

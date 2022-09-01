import { debounce } from "lodash";
import { action, observable, makeObservable } from "mobx";
import {
  savedProgramsList,
  deleteSavedProgram,
  partialUpdateSavedProgram,
  getSingleSavedProgram,
  duplicateVersion,
  deleteVersion,
  updateVersion,
} from "../api/savedPrograms";
import { IRootStore } from "./rootStore";

class RFPStore {
  rootStore: IRootStore;

  constructor(rootStore: any) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.savedProgramList = this.savedProgramList.bind(this);
    this.UpdateSavedProgram = this.UpdateSavedProgram.bind(this);
    this.DeleteSavedProgram = this.DeleteSavedProgram.bind(this);
    this.getDetailOfProgram = this.getDetailOfProgram.bind(this);
    this.makeDuplicateVersion = this.makeDuplicateVersion.bind(this);
    this.deleteSpecificVersion = this.deleteSpecificVersion.bind(this);
    this.editSpecificVersion = this.editSpecificVersion.bind(this);
  }

  @observable
  savedProgramStore: any[] = [];

  @observable
  savedProgramDisplayList: any[] = [];

  @observable
  detailSavedProgram: any = {};

  @action
  async savedProgramList(id): Promise<any> {
    const savedProgram = await savedProgramsList(id);
    this.savedProgramStore = savedProgram;
    this.savedProgramDisplayList = savedProgram;

    return savedProgram;
  }
  @action
  async UpdateSavedProgram(orgId, programId, data): Promise<any> {
    const savedProgram = await partialUpdateSavedProgram(
      orgId,
      programId,
      data
    );
    if (savedProgram) {
      this.savedProgramList(localStorage.getItem("orgId"));
    }

    return savedProgram;
  }
  @action
  async DeleteSavedProgram(orgId, programId): Promise<any> {
    const savedProgram = await deleteSavedProgram(orgId, programId);
    if (savedProgram) {
      this.savedProgramList(localStorage.getItem("orgId"));
    }

    return savedProgram;
  }

  @action
  async getDetailOfProgram(orgId, programId): Promise<any> {
    const program = this.savedProgramStore.find(
      (item) => item.id === programId
    );
    const savedProgram = await getSingleSavedProgram(orgId, programId);
    this.detailSavedProgram = savedProgram || program;

    return savedProgram;
  }

  @action
  async makeDuplicateVersion(orgId, programId, versionId, data): Promise<any> {
    const savedProgram = await duplicateVersion(
      orgId,
      programId,
      versionId,
      data
    );

    if (savedProgram) {
      this.savedProgramList(localStorage.getItem("orgId"));
    }

    return savedProgram;
  }

  @action
  async deleteSpecificVersion(orgId, programId, versionId): Promise<any> {
    const savedProgram = await deleteVersion(orgId, programId, versionId);
    this.savedProgramDisplayList = this.savedProgramDisplayList
      .find((item) => item.id === programId)
      .versions.filter((ver) => ver.id !== versionId);
    debounce(() => {
      this.savedProgramList(localStorage.getItem("orgId"));
    }, 200);

    return savedProgram;
  }

  @action
  async editSpecificVersion(orgId, programId, versionId, data): Promise<any> {
    const savedProgram = await updateVersion(orgId, programId, versionId, data);
    debounce(() => {
      this.savedProgramList(localStorage.getItem("orgId"));
    }, 200);

    return savedProgram;
  }
}

export default RFPStore;

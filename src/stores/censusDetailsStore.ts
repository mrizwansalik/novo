/* eslint-disable max-lines */
import { each, filter, reduce } from "lodash";
import { action, observable, makeObservable } from "mobx";
import {
  getAllOrgSimpleCensusFormats,
  listOrgSimpleCensusHumans,
} from "src/api/org";
import { rowPerPageOptions } from "src/constants";
import { fieldsMap } from "src/constants/humanCensus";
import { ICensusHuman, ICensusTemplate } from "src/interfaces/census";
import {
  addFlattenedHumans,
  areDependentsIncomplete,
  humanSortFunction,
  isHumanIncomplete,
} from "src/utils/humanCensus";
import { IFieldInfo } from "./../pages/createNewQuote/components/CensusFieldInput/utils";
import { IRootStore } from "./rootStore";

class CensusDetailsStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable
  censusHumans: ICensusHuman[] = [];

  @observable
  filteredHumans: ICensusHuman[] = [];

  @observable
  flatHumans: ICensusHuman[] = [];

  @observable
  humansInView: ICensusHuman[] = [];

  @observable
  fields: IFieldInfo[] = [];

  @observable
  selectAll: boolean = false;

  @observable
  nameFilter: string = "";

  @observable
  numDependents: any = undefined;

  @observable
  currentPage: number = 1;

  @observable
  rowPerPage: number = rowPerPageOptions[0];

  @observable
  censusTemplates = [];

  @observable
  currentTemplate;

  @action
  public async onInit(orgId: string) {
    await this.getCensusHumansList(orgId);
    this.buildFields();
    this.filterHumans(false);
    this.onUpdateHumans();
  }

  @action
  public getHumansInView() {
    return this.flatHumans.slice(
      (this.currentPage - 1) * this.rowPerPage,
      this.currentPage * this.rowPerPage
    );
  }

  @action
  public async getCensusHumansList(orgId: string): Promise<void> {
    if (orgId) {
      const censusHumans = await listOrgSimpleCensusHumans(orgId);
      this.censusHumans = Array.isArray(censusHumans) ? censusHumans : [];
    }
  }

  @action
  public filterHumans(clearFilter: boolean = false) {
    if (clearFilter) {
      this.nameFilter = "";
    }
    if (this.nameFilter) {
      var filterString = this.nameFilter.trim().toLowerCase();
      this.filteredHumans = filter(this.censusHumans, function (human) {
        return (
          human.first_name.toLowerCase().includes(filterString) ||
          human.last_name.toLowerCase().includes(filterString)
        );
      });
    } else {
      this.filteredHumans = this.censusHumans.slice();
    }

    if (this.currentPage > this.numPages()) {
      this.currentPage = 1;
    }
  }

  @action
  public setHumansInView() {
    this.humansInView = this.flatHumans.slice(
      (this.currentPage - 1) * this.rowPerPage,
      this.currentPage * this.rowPerPage
    );
  }

  /*
    create a sorted, flattened list of humans in this manner:

    1) put employees missing info, or employees with dependents who are missing info, at the top
    2) put complete employees next
    3) sort both of these two groups by row number
  */
  @action
  public parseHumans(humans) {
    const fields = this.fields;
    const incompleteHumans = [];
    const completeHumans = [];
    each(humans, function (human) {
      if (
        isHumanIncomplete(human, fields) ||
        areDependentsIncomplete(human, fields)
      ) {
        incompleteHumans.push(human);
      } else {
        completeHumans.push(human);
      }
    });

    let flatHumans = [];
    incompleteHumans.sort(humanSortFunction);
    addFlattenedHumans(incompleteHumans, flatHumans);
    completeHumans.sort(humanSortFunction);
    addFlattenedHumans(completeHumans, flatHumans);
    this.flatHumans = flatHumans;

    this.setHumansInView();

    this.numDependents = reduce(
      flatHumans,
      function (memo, human) {
        if (human.employee) {
          memo++;
        }
        return memo;
      },
      0
    );
  }

  @action
  public buildFields() {
    const fields = [];
    fields.push({
      Header: "First Name",
      accessor: "first_name",
      field: fieldsMap["first_name"],
    });

    fields.push({
      Header: "Last Name",
      accessor: "last_name",
      field: fieldsMap["last_name"],
    });

    fields.push({
      Header: "Relationship",
      accessor: "relationship",
      field: fieldsMap["relationship"],
      requiredForDependent: true,
      dependentOnly: true,
    });

    fields.push({
      Header: "Zip Code",
      accessor: "postal",
      field: fieldsMap["postal"],
      textAlign: "center",
      requiredForEmployee: true,
    });

    fields.push({
      Header: "Date of Birth",
      accessor: "birthday",
      field: fieldsMap["birthday"],
      textAlign: "center",
      noWrap: true,
      requiredForEmployee: true,
      requiredForDependent: true,
    });

    fields.push({
      Header: "Gender",
      accessor: "gender",
      field: fieldsMap["gender"],
      textAlign: "center",
      requiredForEmployee: true,
      requiredForDependent: true,
    });

    fields.push({
      Header: "Coverage",
      accessor: "coverage_type",
      field: fieldsMap["coverage_type"],
      requiredForEmployee: true,
    });

    fields.push({
      Header: "Plan Name",
      accessor: "plan_name",
      field: fieldsMap["plan_name"],
    });

    this.fields = fields;
  }

  @action
  public numPages() {
    if (this.filteredHumans.length > 0) {
      return Math.ceil(this.filteredHumans.length / this.rowPerPage);
    }
    return 1;
  }

  @action
  public setRowPerPage(rowPerPage: number) {
    this.rowPerPage = rowPerPage;
    this.currentPage = 1;
    this.setHumansInView();
  }

  @action
  public setCurrentPage(pageIndex: number) {
    this.currentPage = pageIndex;
    this.setHumansInView();
  }

  @action
  public setSearch(searchString: string) {
    this.nameFilter = searchString;
    this.filterHumans();
  }

  @action
  public onUpdateHumans() {
    this.parseHumans(this.filteredHumans);
    this.selectAll = false;
  }

  @action
  public updateCensusHumans(humans: ICensusHuman[]) {
    if (Array.isArray(humans)) {
      this.censusHumans = humans;
      this.filterHumans();
      this.onUpdateHumans();
    }
  }

  @action
  public async getAllTemplates(orgId: string) {
    if (orgId) {
      const templates = await getAllOrgSimpleCensusFormats(orgId);
      this.censusTemplates = templates;
      return templates;
    }
    return [];
  }

  @action
  public setTemplates(templates) {
    this.censusTemplates = templates;
  }

  @action
  public async fetchProspectCensusHumanDetails(
    prospectId: string
  ): Promise<void> {
    const censusHumans = await listOrgSimpleCensusHumans(prospectId);
    this.censusHumans = Array.isArray(censusHumans) ? censusHumans : [];
  }

  @action
  public async initProspectCensusDetails(prospectId: string) {
    await this.fetchProspectCensusHumanDetails(prospectId);
    this.buildFields();
    this.filterHumans(false);
    this.onUpdateHumans();
  }

  @action
  public async setCurrentTemplate(
    prospectId: string,
    templateId: string
  ): Promise<ICensusTemplate> {
    await this.getAllTemplates(prospectId);
    this.currentTemplate = this.censusTemplates.find(
      (item) => item.id === templateId
    );
    return this.currentTemplate;
  }

  @action
  public clearCurrentTemplate() {
    this.currentTemplate = undefined;
  }
}

export default CensusDetailsStore;

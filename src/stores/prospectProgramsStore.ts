import { get, each, sortBy, cloneDeep } from "lodash";
import { action, makeObservable, observable } from "mobx";
import {
  listPlanComparisons,
  listPlanComparisonsWithSummaryPricing,
} from "src/api/plan";
import { PROGRAM_TYPE } from "src/constants";
import { ICarrierPlan, ITpa } from "src/interfaces/benefit";
import {
  getAvailableIllustrativePrograms,
  getAvailableUnderwrittenPlanComparisons,
  updateProgramsVersions,
} from "src/utils/prospectPrograms";
import { IRootStore } from "./rootStore";

class ProspectProgramsStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable
  filteredTpas: ITpa[] = [];

  @observable
  programType: string = PROGRAM_TYPE.ILLUST;

  @observable
  allProspectPrograms: ICarrierPlan[] = [];

  @observable
  programsByTpa: ITpa[] = [];

  @observable
  programsForUnderwriting: ICarrierPlan[] = [];

  @observable
  programsToDisplay: ICarrierPlan[] = [];

  @observable
  illustrativeVersions: Record<string, ICarrierPlan> = {};

  @observable
  refreshPriceTimer;

  @observable
  programDetailLoaded: boolean = false;

  @observable
  pricePollRetries: number = 0;

  @observable
  priceError: boolean = false;

  @observable
  filterText: string = "";

  @observable
  canBeUnderwritten: boolean = true;

  @action
  public async getProgramList(prospectId: string) {
    if (prospectId) {
      const planComparisons: ICarrierPlan[] = await listPlanComparisons(
        prospectId
      );
      this.allProspectPrograms = planComparisons;
      this.refreshPrices(prospectId);
    }
  }

  @action
  public async createTpaList() {
    if (this.programType === PROGRAM_TYPE.ILLUST) {
      this.programsToDisplay = getAvailableIllustrativePrograms(
        this.allProspectPrograms
      );
    } else if (this.programType === PROGRAM_TYPE.UW) {
      this.programsToDisplay = getAvailableUnderwrittenPlanComparisons(
        this.allProspectPrograms
      );
    }

    const TPAList = [];
    if (this.programsToDisplay.length > 0) {
      each(this.programsToDisplay, function (program: ICarrierPlan) {
        //only add carrier if not added already
        //and if program is available
        const foundIndex = TPAList.findIndex((tpa) => {
          const carrierId = get(program, "carrier.id");
          return tpa.id === carrierId;
        });
        if (foundIndex === -1) {
          TPAList.push(program.carrier);
        }
      });
      //then sort
      this.filteredTpas = sortBy(TPAList, "name");
      this.sortProgramsByTpa();
    }
  }

  @action
  public sortProgramsByTpa() {
    //create array of tpa objects,
    //at key 'programs' push programs linked to this tpa
    //this is so that for list view we can show first 3 programs linked to this tpa
    //and then use arrows to scroll to next 3(or 2 or 1 depending on screensize) programs linked to this tpa
    //programsToDisplay can be illustrative or underwritten
    //depending on param passed to createTPAList()
    const programTpaObj = {};
    const programsToDisplay = cloneDeep(this.programsToDisplay);
    const filteredTpas = cloneDeep(this.filteredTpas);

    filteredTpas.forEach(function (tpa) {
      programTpaObj[tpa.id] = tpa;
      programTpaObj[tpa.id].programs = [];
    });

    programsToDisplay.forEach(function (program) {
      filteredTpas.forEach(function (tpa) {
        const copyProgram = Object.assign({}, program, {
          tpa_id: tpa.id,
        });
        const carrierId = get(program, "carrier.id");
        if (programTpaObj[tpa.id] && tpa.id === carrierId) {
          programTpaObj[tpa.id].programs.push(copyProgram);
        }
      });
    });

    const tpas = [];
    Object.keys(programTpaObj).forEach(function (key) {
      if (programTpaObj.hasOwnProperty(key)) {
        tpas.push(programTpaObj[key]);
      }
    });

    this.filteredTpas = filteredTpas;
    this.programsByTpa = tpas;
  }

  @action
  public async refreshPrices(prospectId: string) {
    try {
      // Try to refresh prices Setup a timer to automatically re-call self if pricings are not fully complete:
      this.refreshPriceTimer = setTimeout(
        () => this.refreshPrices(prospectId),
        5000
      );
      // Get all prices.  If they are all complete timer will be cancelled. If there is an error
      // timer will be cancelled.
      const plansWithSummaryPricing = await listPlanComparisonsWithSummaryPricing(
        prospectId
      );
      // Set data to latest value calculated and refresh data.
      this.programDetailLoaded = true;

      const newPrograms = updateProgramsVersions(
        this.allProspectPrograms,
        plansWithSummaryPricing
      );
      this.allProspectPrograms = newPrograms;

      // Determine if all programs are completed.
      const allDone = this.allProspectPrograms.every((program) => {
        return program.pricing_calculation_complete;
      });
      // If we are all done, stop the timer.
      if (allDone) {
        this.clearPricePollingTimer();
        // TODO: update sth here
        //broadcast even so that we can update graphs
        // $scope.$broadcast("programsUpdated", { programs: ctrl.programs });
      } else {
        // Increase retries, if we have exceeded max report warning...
        this.pricePollRetries++;

        // if repeated a few times, throw error and stop
        if (this.pricePollRetries >= 6) {
          this.onPricePollFail();
        }
      }
    } catch (e) {
      this.onPricePollFail();
    }
  }

  @action
  public clearPricePollingTimer() {
    clearTimeout(this.refreshPriceTimer);
    this.refreshPriceTimer = null;
  }

  @action
  public onPricePollFail() {
    this.clearPricePollingTimer();
    this.priceError = true;
  }

  @action
  public updateProgramList(programs: ICarrierPlan[]) {
    this.allProspectPrograms = programs;
  }

  @action
  public updateSearchText(text: string = "") {
    this.filterText = text;
  }

  @action
  public setCanBeUnderwritten(canBeUnderwritten: boolean) {
    this.canBeUnderwritten = canBeUnderwritten;
  }

  @action
  public notifyProgramSelected(program: ICarrierPlan, selected: boolean) {
    const currentUnderwriting = this.programsForUnderwriting.slice();
    if (program && selected) {
      currentUnderwriting.push(program);
      this.programsForUnderwriting = currentUnderwriting;
    } else if (!selected) {
      this.programsForUnderwriting = currentUnderwriting.filter(
        (item) => item.id !== program.id
      );
    }
  }

  @action
  public clearProgramsForUnderwriting() {
    this.programsForUnderwriting = [];
  }
}

export default ProspectProgramsStore;

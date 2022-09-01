import { action, observable, makeObservable } from "mobx";
import { SpecialTime } from "src/constants";
import { IQuote } from "src/interfaces/quote";
import { IRootStore } from "./rootStore";

class CreateQuoteStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable
  quote: IQuote = {} as IQuote;

  @observable
  selectedYear: string = `${SpecialTime.LAST_YEAR}`;

  @action
  public setQuote(quote: IQuote): void {
    this.quote = quote;
  }

  @action
  public setSelectedYear(selectedYear: string): void {
    this.selectedYear = selectedYear;
  }
}

export default CreateQuoteStore;

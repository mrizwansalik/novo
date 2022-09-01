import { ICarrier, ITpa } from "src/interfaces/benefit";

export interface ITpaOption extends ITpa {
  label: string;
  value: string;
}

export interface IStopLossCarrierOption extends ICarrier {
  label: string;
  value: string;
}

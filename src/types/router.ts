export declare interface IHistory {
  push: (url: string) => void;
}
export interface IParamTypes {
  prospectId?: string;
  templateId?: string;
  brokerageId?: string;
  planId?: string;
  recipeId?: string;
  orgId?: string;
  planSetId?: string;
  stopLossId?: string;
  programId?: string;
  versionId?: string;
  tpaId?: string;
  rfpId?: string;
  dependentId: string;
}

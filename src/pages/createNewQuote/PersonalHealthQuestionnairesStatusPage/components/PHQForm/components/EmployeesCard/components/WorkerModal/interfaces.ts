import { IOption } from "src/interfaces/common";

export interface IWorkerTable {
  questionnaire: React.ReactNode;
  signature: string;
  updatedAt: string;
  submission: React.ReactNode;
}

export interface IWorkerTableDocument {
  submission: IOption;
  workerDocumentId: string;
  workerId: string;
}

export interface IWorkerTableFormValues {
  documents: IWorkerTableDocument[];
}

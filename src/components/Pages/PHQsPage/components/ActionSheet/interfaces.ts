import { IWorker } from "src/interfaces/worker";

export interface IDocument {
  document_id: string;
  name: string;
  updated: string;
  signature_state: string;
  status: string;
  worker_document_id: string;
}

export interface IWorkerWithDocuments extends IWorker {
  documents?: IDocument[];
}

export interface IStatusReportHeader {
  Employee: string;
  PHQ: string;
  State: string;
  Updated: string;
}

export interface IDownloadStatus {
  status: string;
  text: string;
}

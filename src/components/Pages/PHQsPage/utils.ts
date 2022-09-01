export interface IWorker {
  name?: string;
  email?: string;
  status?: string;
  phone?: string;
  documents?: unknown;
  id?: string;
}
export interface IWorkerList {
  title: string;
  workerList: IWorker[];
  submissionType: string;
}

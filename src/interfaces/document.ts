export interface IDocument {
  can_edit?: boolean;
  created?: string;
  document_type?: string;
  file: string;
  id?: string;
  modified?: string;
  name?: string;
  assigned?: unknown[];
  document_id?: string;
  filestack_url?: string;
  tags?: string;
}

export interface IWorkerDocument {
  archived: boolean;
  created: string;
  document_type: string;
  file: string;
  id: string;
  modified: string;
  name: string;
  parent_document: string;
  signature_state: string;
  status: string;
}

export interface IExistingPlanDocument {
  file: IDocument;
  name: string;
  category: string;
  name_edit: boolean;
}

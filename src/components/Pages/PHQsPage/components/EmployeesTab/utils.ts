import { DocumentStatus, SignatureState } from "src/constants/enum/document";
import { IPhqDocument, IWaivedUser } from "src/interfaces/benefit";
import { IWorker } from "src/interfaces/worker";

export enum DisplayStatus {
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  PENDING = "pending",
  WAIVED = "waived",
}
export function processUsers(
  workers: IWorker[],
  documents: IPhqDocument[],
  waivedUsers: IWaivedUser[]
) {
  const workerList = {};
  const idList = [];
  const awaitingWorkers = [];
  let submittedWorkers = [];
  const unsubmittedWorkers = [];
  const workersHasSignedDocuments = [];
  // Extract worker information to display on UI
  workers.forEach((item: IWorker) => {
    workerList[item.id] = {
      id: item.id,
      email: item.email,
      name: item.name,
      documents: [],
      phone: item.phone || "",
    };
    idList.push(item.id);
  });
  // Map documents to each worker
  documents.forEach((document: IPhqDocument) => {
    document.assigned?.forEach((item) => {
      workerList[item.owner.id]?.documents?.push({
        document_id: document.id,
        name: document.name,
        updated: item.modified,
        signature_state: item.signature_state,
        status: item.status,
        worker_document_id: item.worker_document,
      });
    });
  });

  // Filter out workers based on document states
  idList.forEach((id: string) => {
    if (
      workerList[id].documents?.some(
        (document) => document.signature_state === SignatureState.FULLY_SIGNED
      )
    ) {
      workersHasSignedDocuments.push(id);
    }
    if (
      workerList[id].documents?.some(
        (document) =>
          document.signature_state === SignatureState.NEEDS_SIGNATURES
      )
    ) {
      awaitingWorkers.push(workerList[id]);
    } else if (
      workerList[id].documents?.every(
        (document) => document.signature_state === SignatureState.FULLY_SIGNED
      ) &&
      workerList[id].documents?.some(
        (document) => document.status === DocumentStatus.UN_SUBMITTED
      )
    ) {
      unsubmittedWorkers.push(workerList[id]);
    } else if (
      workerList[id].documents?.every(
        (document) =>
          document.signature_state === SignatureState.FULLY_SIGNED &&
          (document.status === DocumentStatus.ACCEPTED ||
            document.status === DocumentStatus.SUBMITTED ||
            document.status === DocumentStatus.REJECTED)
      )
    ) {
      submittedWorkers.push(workerList[id]);
    }
  });

  // Add submit document status for submitted users
  submittedWorkers.forEach((item) => {
    if (
      item.documents?.every(
        (document) => document.status === DisplayStatus.ACCEPTED
      )
    ) {
      item.status = DisplayStatus.ACCEPTED;
    } else if (
      item.documents?.some(
        (document) => document.status === DisplayStatus.REJECTED
      )
    ) {
      item.status = DisplayStatus.REJECTED;
    } else {
      item.status = DisplayStatus.PENDING;
    }
  });
  waivedUsers.forEach((user) => {
    submittedWorkers = submittedWorkers.map((item) => {
      if (user.id === item.id) {
        item.status = DisplayStatus.WAIVED;
      }
      return item;
    });
  });

  return {
    awaitingWorkers,
    unsubmittedWorkers,
    submittedWorkers,
    workersHasSignedDocuments,
  };
}

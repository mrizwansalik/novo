import {
  DocumentStatus,
  DocumentSubmitStatus,
} from "src/constants/enum/document";
import { IPhqDocument } from "src/interfaces/benefit";

export interface SubmitDocumentStatus {
  status: DocumentSubmitStatus;
  label: string;
  iconName: string;
}

export function getDocumentsStatus(
  documents: IPhqDocument[]
): SubmitDocumentStatus {
  const isAccepted: boolean = documents?.every(
    (documentDetail: IPhqDocument) =>
      documentDetail?.status === DocumentStatus.ACCEPTED
  );

  if (isAccepted) {
    return {
      status: DocumentSubmitStatus.ACCEPTED,
      label: "Accepted",
      iconName: "tick64px-white.png",
    };
  }

  const isRejected: boolean = documents?.some(
    (documentDetail: IPhqDocument) =>
      documentDetail?.status === DocumentStatus.REJECTED
  );

  if (isRejected) {
    return {
      status: DocumentSubmitStatus.REJECTED,
      label: "Rejected",
      iconName: "x-no.png",
    };
  }

  return {
    status: DocumentSubmitStatus.PENDING,
    label: "Pending",
    iconName: "clock-white.png",
  };
}

export function showStatusBadge(documents: IPhqDocument[]): boolean {
  return documents?.every(
    (documentDetail: IPhqDocument) =>
      documentDetail?.status === DocumentStatus.SUBMITTED ||
      documentDetail?.status === DocumentStatus.REJECTED ||
      documentDetail?.status === DocumentStatus.ACCEPTED
  );
}

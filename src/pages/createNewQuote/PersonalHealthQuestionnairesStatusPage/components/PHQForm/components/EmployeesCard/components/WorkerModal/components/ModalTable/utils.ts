import { SignatureState } from "src/constants/enum/document";
import { IPhqDocument } from "src/interfaces/benefit";

export function isWorkerSubmitted(documents: IPhqDocument[]): boolean {
  return (
    Array.isArray(documents) &&
    documents?.every(
      (documentDetail: IPhqDocument) =>
        documentDetail?.signature_state === SignatureState.FULLY_SIGNED
    )
  );
}

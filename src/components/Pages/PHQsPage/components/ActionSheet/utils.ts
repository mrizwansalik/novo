import JSZip from "jszip";
import { flatten, get } from "lodash";
import moment from "moment";
import Papa from "papaparse";
import { getBlobFromUrl } from "src/api/file";
import { getCensusReportUrl, getHealthReportUrl } from "src/api/report";
import {
  inviteWorker,
  getAllDocumentsOfWorker,
  resetWorkerDocumentSignature,
  deleteWorker,
} from "src/api/worker";
import { DocumentStatus, SignatureState } from "src/constants/enum/document";
import { IPhqDocument } from "src/interfaces/benefit";
import { IWorkerDocument } from "src/interfaces/document";
import { CsvState } from "./enums";
import { IWorkerWithDocuments, IStatusReportHeader } from "./interfaces";
export async function downloadFileFromUrl(
  downloadUrl: string,
  downloadFileName: string
): Promise<void> {
  const blob = await getBlobFromUrl(downloadUrl);
  downloadBlob(blob, downloadFileName);
}

export async function downloadCensusReport(
  prospectId: string,
  prospectName: string
): Promise<void> {
  const timestamp = moment().format("YYYY_MM_DD");
  const downloadFileName = `${prospectName}_${timestamp}_Census_From_Phqs.csv`;
  const { url } = await getCensusReportUrl(prospectId);
  downloadFileFromUrl(url, downloadFileName);
}

export async function downloadHealthReport(
  prospectId: string,
  prospectName: string
): Promise<void> {
  const timestamp = moment().format("YYYY_MM_DD");
  const downloadFileName = `${prospectName}_${timestamp}_Health_Data.csv`;
  const { url } = await getHealthReportUrl(prospectId);
  downloadFileFromUrl(url, downloadFileName);
}

export async function generateStatusReport(
  workerList: IWorkerWithDocuments[],
  documentList: IPhqDocument[],
  prospectName: string
): Promise<void> {
  const jsonData: IStatusReportHeader[] = [];
  workerList.forEach((worker) => {
    if (Array.isArray(worker.documents) && worker.documents.length > 0) {
      worker.documents.forEach((item) => {
        jsonData.push({
          Employee: worker.name || "",
          PHQ: item.name || "",
          State:
            item.status !== DocumentStatus.UN_SUBMITTED
              ? CsvState.COMPLETE
              : CsvState.IN_PROGRESS,
          Updated: item.updated || "",
        });
      });
    } else {
      documentList?.forEach((item) => {
        jsonData.push({
          Employee: worker.name || "",
          PHQ: item.name || "",
          State: CsvState.IN_PROGRESS,
          Updated: "",
        });
      });
    }
  });
  const csvData = Papa.unparse(jsonData);

  const timestamp = moment().format("YYYY_MM_DD");
  const downloadFileName = `${prospectName}_${timestamp}_PHQ_Status.csv`;
  downloadBlob(csvData, downloadFileName);
}

export async function inviteWorkers(workerIds: any): Promise<void> {
  Promise.all([
    Object.keys(workerIds).map((id) => {
      if (workerIds[id] === true) {
        inviteWorker(id);
      }
      return id;
    }),
  ]);
}

export async function getWorkerSignedDocuments(
  workerIds: string[],
  prospectName: string
): Promise<void> {
  const zip = new JSZip();
  const documentList = await Promise.all(
    workerIds.map((id) => getAllDocumentsOfWorker(id))
  );
  const flattenList = flatten(documentList);
  const signedDocumentList = flattenList.filter(
    (document) => document.signature_state === SignatureState.FULLY_SIGNED
  );

  await Promise.allSettled(
    signedDocumentList?.map((signedDocument: IWorkerDocument) => {
      return getBlobFromUrl(signedDocument.file).then((data) => {
        const documentName: string = generateDocumentName(signedDocument);
        zip.file(documentName, data);
      });
    })
  );
  const content = await zip.generateAsync({ type: "blob" });
  const fileName: string = generateZipName(prospectName);
  downloadBlob(content, fileName);
}

export function generateDocumentName(document: IWorkerDocument): string {
  const timestamp = moment();
  const documentName: string = `${document?.name}_${get(
    document,
    "owner.name",
    ""
  )}_${timestamp.format("YYYY")}_${timestamp.format("MM")}_${timestamp.format(
    "DD"
  )}_${timestamp.format("hh")}_${timestamp.format("mm")}.pdf`;
  return documentName;
}

export function generateZipName(prospectName: string): string {
  const timestamp = moment();
  const filename: string = `${prospectName}_signed_phqs_${timestamp.format(
    "YYYY"
  )}_${timestamp.format("MM")}_${timestamp.format("DD")}_${timestamp.format(
    "hh"
  )}_${timestamp.format("mm")}.zip`;
  return filename;
}

export function downloadBlob(content, fileName: string): void {
  const url = window.URL.createObjectURL(new Blob([content]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);

  // Append to html link element page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up and remove the link
  link.parentNode.removeChild(link);
}

export async function deleteWorkers(workerIds: any): Promise<void> {
  const selectedIds = Object.keys(workerIds)?.filter(
    (id) => workerIds[id] === true
  );
  await Promise.all(selectedIds?.map((id: string) => deleteWorker(id)));
}

export async function clearWorkersDocumentSignature(
  signedWorkerIds: string[],
  keepSignatures: boolean
): Promise<void> {
  await Promise.all(
    signedWorkerIds?.map((workerId: string) =>
      resetWorkerDocumentSignature(workerId, keepSignatures)
    )
  );
}

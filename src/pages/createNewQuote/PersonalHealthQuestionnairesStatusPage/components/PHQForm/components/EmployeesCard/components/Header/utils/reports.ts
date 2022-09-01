import axios, { AxiosResponse } from "axios";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import flatten from "lodash/flatten";
import get from "lodash/get";
import moment from "moment";
import Papa from "papaparse";
import {
  getCensusReportUrl as getCensusReportUrlAPI,
  getHealthReportUrl as getHealthReportUrlAPI,
} from "src/api/report";
import { getWorkerDocument } from "src/api/worker";
import { DocumentStatus, SignatureState } from "src/constants/enum/document";
import { IPhqDocument } from "src/interfaces/benefit";
import { IWorkerDocument } from "src/interfaces/document";
import { IOrg } from "src/interfaces/org";
import { IAssignedDocumentsTree } from "src/pages/createNewQuote/PersonalHealthQuestionnairesStatusPage/utils";
import BenefitStore from "src/stores/benefitStore";
import BrokerProspectsListStore from "src/stores/brokerProspectsListStore";
import { IRawReport } from "./interfaces";

export async function getCensusReport(prospectId: string): Promise<void> {
  const { url } = await getCensusReportUrlAPI(prospectId);
  if (window) {
    window.location.href = url;
  }
}

export async function getHealthReport(prospectId: string): Promise<void> {
  const { url } = await getHealthReportUrlAPI(prospectId);
  if (window) {
    window.location.href = url;
  }
}

export async function getStatusReport(
  assignedDocuments: IAssignedDocumentsTree[],
  brokerProspectsListStore: BrokerProspectsListStore
): Promise<void> {
  const { currentProspect } = brokerProspectsListStore;
  const documents = assignedDocuments?.map(
    (assignedDocument: IAssignedDocumentsTree) => {
      const documents = assignedDocument?.documents || [];
      return documents?.map((document) => document);
    }
  );
  const flattenDocuments = flatten(documents);
  const rawReports: IRawReport[] = flattenDocuments?.map(
    (uploadedDocument: IPhqDocument) => {
      return {
        Employee: get(uploadedDocument, "owner.name", ""),
        PHQ: uploadedDocument?.name,
        State:
          uploadedDocument?.status !== DocumentStatus.UN_SUBMITTED
            ? "Complete"
            : "In progress",
        Updated: uploadedDocument?.modified,
      };
    }
  );
  const csvReport = Papa.unparse(rawReports);
  const blob = new Blob([csvReport], { type: "text/csv;charset=utf-8" });
  const filename: string = generateCsvFileName(currentProspect);
  saveAs(blob, filename, { autoBom: true });
}

export function generateDocumentName(signedDocument: IWorkerDocument): string {
  const timestamp = moment();
  const documentName: string = `${signedDocument?.name}_${get(
    signedDocument,
    "owner.name",
    ""
  )}_${timestamp.format("YYYY")}_${timestamp.format("MM")}_${timestamp.format(
    "DD"
  )}_${timestamp.format("hh")}_${timestamp.format("mm")}.pdf`;
  return documentName;
}

export function generateZipName(prospect: IOrg): string {
  const timestamp = moment();
  const filename: string = `${prospect?.name}_signed_phqs_${timestamp.format(
    "YYYY"
  )}_${timestamp.format("MM")}_${timestamp.format("DD")}_${timestamp.format(
    "hh"
  )}_${timestamp.format("mm")}.zip`;
  return filename;
}

export function generateCsvFileName(prospect: IOrg): string {
  const timestamp = moment();
  const filename: string = `${prospect?.name}_${timestamp.format(
    "YYYY"
  )}_${timestamp.format("MM")}_${timestamp.format("DD")}_${timestamp.format(
    "hh"
  )}_${timestamp.format("mm")}_PHQ_Status.csv`;
  return filename;
}

export async function downloadSignedDocuments(
  benefitStore: BenefitStore,
  brokerProspectsListStore: BrokerProspectsListStore,
  assignedDocuments: IAssignedDocumentsTree[]
): Promise<void> {
  try {
    benefitStore.setLoadingProgress(0);
    const { currentProspect } = brokerProspectsListStore;
    const zip = new JSZip();
    const documents = assignedDocuments?.map(
      (assignedDocument: IAssignedDocumentsTree) => {
        const documents = assignedDocument?.documents || [];
        return documents?.map((document) => document);
      }
    );
    const flattenDocuments = flatten(documents).filter(
      (documentDetail: IPhqDocument) =>
        documentDetail?.signature_state === SignatureState.FULLY_SIGNED
    );
    benefitStore.setLoadingProgress(25);
    const signedDocuments: IWorkerDocument[] = await Promise.all(
      flattenDocuments?.map((documentDetail: IPhqDocument) => {
        return getWorkerDocument(
          get(documentDetail, "owner.id", ""),
          get(documentDetail, "worker_document", "")
        );
      })
    );
    benefitStore.setLoadingProgress(50);
    await Promise.allSettled(
      signedDocuments?.map((signedDocument: IWorkerDocument) => {
        return axios({
          url: signedDocument?.file,
          method: "GET",
          responseType: "blob",
        }).then((response: AxiosResponse) => {
          const documentName: string = generateDocumentName(signedDocument);
          zip.file(documentName, response?.data);
        });
      })
    );
    benefitStore.setLoadingProgress(90);
    const content = await zip.generateAsync({ type: "blob" });
    benefitStore.setLoadingProgress(100);
    const filename: string = generateZipName(currentProspect);
    saveAs(content, filename);
  } catch (error) {
    benefitStore.setLoadingProgress(0);
  }
}

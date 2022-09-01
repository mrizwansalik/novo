import filter from "lodash/filter";
import orderBy from "lodash/orderBy";
import moment from "moment";
import { createClaimsData, updateClaimsData } from "src/api/benefits";
import { IClaimsData, IClaimsDocument } from "src/interfaces/benefit";
import { IUploadedFile } from "src/interfaces/file";
import BenefitStore from "src/stores/benefitStore";

export function getDocumentsChecklist(
  claimsChecklist: IClaimsData[]
): IClaimsData[] {
  const checklist: IClaimsData[] = orderBy(
    filter(claimsChecklist, (claim: IClaimsData) => !!claim?.year),
    ["year"],
    ["desc"]
  );
  return checklist;
}

export async function handleCreateClaimsDocument(
  claimsData: IClaimsData[],
  orgId: string,
  uploadedFiles: IUploadedFile[],
  benefitStore: BenefitStore
): Promise<void> {
  const foundClaimDataIndex: number = Array.isArray(claimsData)
    ? claimsData?.findIndex(
        (claimData: IClaimsData) =>
          claimData?.year === moment().toDate().getFullYear()
      )
    : -1;
  const foundClaimData = claimsData[foundClaimDataIndex];
  const newClaimsDocuments: IClaimsDocument[] = uploadedFiles.map(
    (uploadedFile) => ({
      archived: false,
      created: moment().toString(),
      file: uploadedFile?.file,
      mime_type: uploadedFile?.mime_type,
      modified: moment().toString(),
      name: uploadedFile?.title,
      tags: "",
    })
  );

  if (!foundClaimData) {
    const newClaimsData: IClaimsData = {
      assumed_discount: null,
      contract_length: 12,
      experience_average_employees: 0,
      experience_coinsurance: 0,
      experience_deductible: 0,
      experience_oop_max: 0,
      experience_plan_type: "",
      experience_rx: "",
      files_skipped: false,
      generic_field_responses: {
        claims_documents: newClaimsDocuments,
      },
      monthly_claims: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      paid_status: "paid",
      paid_through_date: null,
      start_date: null,
      stop_loss_claims: [],
      year: moment().toDate().getFullYear(),
    };
    const createdData = await createClaimsData(orgId, newClaimsData);
    const updatedClaimsData = [...claimsData, createdData];
    benefitStore.setClaimsData(updatedClaimsData);
  }
  if (!!foundClaimData) {
    const newClaimsData: IClaimsData = {
      ...foundClaimData,
      generic_field_responses: {
        claims_documents: [
          ...(foundClaimData?.generic_field_responses?.claims_documents ?? []),
          ...newClaimsDocuments,
        ],
      },
    };
    const updatedData = await updateClaimsData(
      orgId,
      foundClaimData?.id,
      newClaimsData
    );
    claimsData[foundClaimDataIndex] = updatedData;
    benefitStore.setClaimsData(claimsData);
  }
}

export function getClaimsDetail(
  benefitStore: BenefitStore,
  prospectId: string
): void {
  benefitStore.getClaimsDetail(prospectId);
}

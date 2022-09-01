import flatten from "lodash/flatten";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";
import moment from "moment";
import { createClaimsData, updateClaimsData } from "src/api/benefits";
import { IClaimsData, IClaimsDocument } from "src/interfaces/benefit";
import { IOption } from "src/interfaces/common";
import BenefitStore from "src/stores/benefitStore";
import { Reset } from "src/types/hookForm";
import { HealthClaimsFormValues } from "../components/HealthClaimsDocumentsForm/enums";
import { IClaimsDocumentsForm } from "../components/HealthClaimsDocumentsForm/interfaces";
import { getCategoryTypeOptions, getLastYears } from "./options";

export function extractTableRows(claimsData: IClaimsData[]): IClaimsDocument[] {
  if (!Array.isArray(claimsData)) return [];

  const claimUploaded = claimsData?.map((claimsDetail: IClaimsData) => {
    const includedDocuments: boolean =
      Array.isArray(claimsDetail?.generic_field_responses?.claims_documents) &&
      claimsDetail?.generic_field_responses?.claims_documents?.length > 0;

    if (includedDocuments) {
      return claimsDetail?.generic_field_responses?.claims_documents?.map(
        (claimsDocument: IClaimsDocument) => ({
          ...claimsDocument,
          year: claimsDetail?.year,
        })
      );
    }
    return [];
  });
  return flatten(claimUploaded);
}

export function findDefaultCategoryOption(optionValue: string): IOption {
  const options = getCategoryTypeOptions();
  const defaultValue =
    options?.find((option: IOption) => option?.value === optionValue) ||
    ({} as IOption);
  return defaultValue;
}

export function initDocumentTable(
  claimDocuments: IClaimsDocument[],
  reset: Reset
): void {
  if (!Array.isArray(claimDocuments)) return;
  const tableRows = orderBy(
    claimDocuments.map((claimDetail: IClaimsDocument) => ({
      id: claimDetail?.id,
      name: claimDetail?.name,
      uploadDate: moment(claimDetail?.created)?.toString(),
      fileUrl: claimDetail?.file,
      year: {
        label: claimDetail?.year?.toString(),
        value: claimDetail?.year,
      },
      categoryType: findDefaultCategoryOption(claimDetail?.tags),
    })),
    ["uploadDate"],
    ["asc"]
  );
  reset({ [HealthClaimsFormValues.CLAIM_DOCUMENTS]: tableRows });
}

export async function updateDocumentRecords(
  prospectId: string,
  claimDocumentsForm: IClaimsDocumentsForm[],
  benefitStore: BenefitStore
): Promise<void> {
  if (!Array.isArray(claimDocumentsForm)) return;
  const claimsData: IClaimsData[] = benefitStore?.claimsData || [];
  const newClaimsData = Array.isArray(claimsData)
    ? claimsData.map((claimsDetail: IClaimsData) => {
        const claimsDocuments: IClaimsDocument[] =
          claimsDetail?.generic_field_responses?.claims_documents || [];

        const newClaimsDetail: IClaimsData = {
          ...claimsDetail,
          generic_field_responses: {
            ...claimsDetail?.generic_field_responses,
            claims_documents: claimsDocuments?.map(
              (claimsDocument: IClaimsDocument) => {
                const foundClaimsDocument: IClaimsDocumentsForm = claimDocumentsForm?.find(
                  (claimDocumentForm: IClaimsDocumentsForm) =>
                    claimDocumentForm?.id === claimsDocument?.id
                );
                return {
                  ...claimsDocument,
                  ...(foundClaimsDocument?.name && {
                    name: foundClaimsDocument?.name,
                  }),
                  ...(foundClaimsDocument?.categoryType?.value && {
                    tags: String(foundClaimsDocument?.categoryType?.value),
                  }),
                  year: Number(foundClaimsDocument?.year?.value),
                };
              }
            ),
          },
        };
        return newClaimsDetail;
      })
    : [];

  const reshapeClaimsDocuments = flatten(
    newClaimsData?.map(
      (claimsDetail: IClaimsData) =>
        claimsDetail?.generic_field_responses?.claims_documents
    )
  );

  const claimsDocumentsGroup = groupBy(reshapeClaimsDocuments, "year");
  const years = getLastYears(5);

  await Promise.all(
    years?.map((year: number) => {
      const foundClaimData: IClaimsData = newClaimsData?.find(
        (claimsDetail: IClaimsData) => claimsDetail?.year === year
      );

      if (!!foundClaimData) {
        const updatedClaimData: IClaimsData = {
          ...foundClaimData,
          generic_field_responses: {
            ...foundClaimData?.generic_field_responses,
            claims_documents: get(
              claimsDocumentsGroup,
              foundClaimData?.year,
              []
            ),
          },
        };
        return updateClaimsData(
          prospectId,
          updatedClaimData?.id,
          updatedClaimData
        );
      }

      if (!foundClaimData) {
        const createdClaimsData: IClaimsData = {
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
            claims_documents: get(
              claimsDocumentsGroup,
              foundClaimData?.year,
              []
            ),
          },
          monthly_claims: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          paid_status: "paid",
          paid_through_date: null,
          start_date: null,
          stop_loss_claims: [],
          year,
        };
        return createClaimsData(prospectId, createdClaimsData);
      }

      return undefined;
    })
  );
}

export async function deleteDocumentRecords(
  prospectId: string,
  claimDocumentsForm: IClaimsDocumentsForm[],
  benefitStore: BenefitStore
): Promise<void> {
  if (!Array.isArray(claimDocumentsForm)) return;
  const claimsData: IClaimsData[] = benefitStore?.claimsData || [];

  await Promise.all(
    claimsData.map((claimsDetail: IClaimsData) => {
      const claimsDocuments: IClaimsDocument[] =
        claimsDetail?.generic_field_responses?.claims_documents || [];

      const newClaimsData = {
        ...claimsDetail,
        generic_field_responses: {
          ...claimsDetail?.generic_field_responses,
          claims_documents: claimsDocuments?.filter(
            (claimsDocument: IClaimsDocument) => {
              const foundDocument: IClaimsDocumentsForm = claimDocumentsForm
                ?.filter(
                  (claimDocumentsFormDetail: IClaimsDocumentsForm) =>
                    !!claimDocumentsFormDetail?.delete
                )
                ?.find(
                  (claimDocumentsFormDetail: IClaimsDocumentsForm) =>
                    claimDocumentsFormDetail?.id === claimsDocument?.id
                );

              if (!!foundDocument) return false;
              return true;
            }
          ),
        },
      };
      return updateClaimsData(prospectId, newClaimsData?.id, newClaimsData);
    })
  );
}

export function onCheckDeleteAll(
  checked: boolean,
  claimDocuments: IClaimsDocumentsForm[],
  reset: Reset
): void {
  if (!Array.isArray(claimDocuments)) return;
  const tableRows = claimDocuments.map(
    (claimDocument: IClaimsDocumentsForm) => ({
      ...claimDocument,
      delete: checked,
    })
  );
  reset({ [HealthClaimsFormValues.CLAIM_DOCUMENTS]: tableRows });
}

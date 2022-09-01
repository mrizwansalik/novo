import moment from "moment";
import { ClaimDocumentType } from "../components/HealthClaimsDocumentsForm/components/DocumentTable/enums";
import { IClaimsDocumentsForm } from "../components/HealthClaimsDocumentsForm/interfaces";

export function getChecklistStatus(
  category: string,
  year: number,
  claimDocumentsForm: IClaimsDocumentsForm[]
): boolean {
  const foundClaimDocument: IClaimsDocumentsForm = claimDocumentsForm?.find(
    (claimDocument: IClaimsDocumentsForm) =>
      claimDocument?.year?.value === year &&
      claimDocument?.categoryType?.value === category
  );
  return !!foundClaimDocument;
}

export function getChecklistOptionalStatus(
  category: string,
  claimDocumentsForm: IClaimsDocumentsForm[]
): boolean {
  const foundClaimDocument: IClaimsDocumentsForm = claimDocumentsForm?.find(
    (claimDocument: IClaimsDocumentsForm) =>
      claimDocument?.categoryType?.value === category
  );
  return !!foundClaimDocument;
}

export function getChecklistScore(
  category: string,
  year: number,
  claimDocumentsForm: IClaimsDocumentsForm[]
): number {
  const foundClaimDocument: IClaimsDocumentsForm = claimDocumentsForm?.find(
    (claimDocument: IClaimsDocumentsForm) =>
      claimDocument?.year?.value === year &&
      claimDocument?.categoryType?.value === category
  );
  return !!foundClaimDocument ? 1 : 0;
}

export function calcChecklistScore(
  claimDocumentsForm: IClaimsDocumentsForm[]
): number {
  const currentYear: number = moment().toDate().getFullYear();
  const lastYear: number = moment().subtract(1, "year").toDate().getFullYear();

  const currentYearScore =
    getChecklistScore(
      ClaimDocumentType.CLAIMS_LARGE,
      currentYear,
      claimDocumentsForm
    ) +
    getChecklistScore(
      ClaimDocumentType.CLAIMS_MONTHLY_PAID,
      currentYear,
      claimDocumentsForm
    ) +
    getChecklistScore(
      ClaimDocumentType.CLAIMS_SCHEDULE_OF_BENEFITS,
      currentYear,
      claimDocumentsForm
    );

  const lastYearScore =
    getChecklistScore(
      ClaimDocumentType.CLAIMS_LARGE,
      lastYear,
      claimDocumentsForm
    ) +
    getChecklistScore(
      ClaimDocumentType.CLAIMS_MONTHLY_PAID,
      lastYear,
      claimDocumentsForm
    );

  return currentYearScore + lastYearScore;
}

import moment from "moment";
import { updateClaimsData } from "src/api/benefits";
import { getBlobFromUrl } from "src/api/file";
import { IClaimsData } from "src/interfaces/benefit";
import { IClaimsDocuments } from "src/interfaces/prospects";

export const headerList = [
  {
    name: "Name",
  },
  {
    name: "Category Type",
  },
  {
    name: "Year",
  },
  {
    name: "Upload Date",
  },
];

export const categoryTypeOptions = [
  {
    label: "Detailed Large Claimant Report",
    value: "claims_large",
  },
  {
    label: "Monthly Premium vs. Claims Report",
    value: "claims_monthly_paid",
  },
  {
    label: "Monthly Enrollment Report",
    value: "claims_schedule_of_benefits",
  },
  {
    label: "Additional Claims Reports",
    value: "claims_additional",
  },
];

export const yearOptions = [
  {
    label: moment().toDate().getFullYear().toString(),
    value: moment().toDate().getFullYear(),
  },
  {
    label: moment().subtract(1, "year").toDate().getFullYear().toString(),
    value: moment().subtract(1, "year").toDate().getFullYear(),
  },
  {
    label: moment().subtract(2, "year").toDate().getFullYear().toString(),
    value: moment().subtract(2, "year").toDate().getFullYear(),
  },
  {
    label: moment().subtract(3, "year").toDate().getFullYear().toString(),
    value: moment().subtract(3, "year").toDate().getFullYear(),
  },
  {
    label: moment().subtract(4, "year").toDate().getFullYear().toString(),
    value: moment().subtract(4, "year").toDate().getFullYear(),
  },
];

export function getCategoryTypeValue(value: string) {
  return categoryTypeOptions.find((item) => item.value === value);
}

export function getYearValue(value: number) {
  return yearOptions.find((item) => item.value.toString() === value.toString());
}

export interface IEditingDocument {
  id?: string;
  name?: string;
}

export async function downloadFileFromUrl(
  downloadUrl: string,
  fileName: string
) {
  const blob = await getBlobFromUrl(downloadUrl);

  // Index of file extension splitter
  const index = fileName.lastIndexOf(".");
  const timestamp = moment().format("YYYY_MM_DD_HH_mm");

  const downloadFileName =
    index >= 0
      ? `${fileName.substring(0, index)}_${timestamp}.${fileName.substring(
          index + 1
        )}`
      : `${fileName}_${timestamp}`;

  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", downloadFileName);

  // Append to html link element page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up and remove the link
  link.parentNode.removeChild(link);
}

export function updateClaimsDocument(
  updatedDocument: IClaimsDocuments,
  claimsData: IClaimsData[],
  prospectId: string
): void {
  const selectedClaimsData = claimsData.find(
    (item) => item.year === updatedDocument.year
  );

  const updatedClaimsDocuments = selectedClaimsData.generic_field_responses?.claims_documents?.map(
    (document) => {
      if (document.id === updatedDocument.id) {
        return updatedDocument;
      }
      return document;
    }
  );

  selectedClaimsData.generic_field_responses.claims_documents = updatedClaimsDocuments;
  updateClaimsData(prospectId, selectedClaimsData.id, selectedClaimsData);
}

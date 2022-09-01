import moment from "moment";
import { getBlobFromUrl } from "src/api/file";

export const headerList = [
  {
    name: "Name",
  },
  {
    name: "Document Type",
  },
  {
    name: "Upload Date",
  },
];

export const selectOptions = [
  {
    label: "Census",
    value: "simple-census",
  },
  {
    label: "Current Plan Year Renewal",
    value: "existing_renewal_notices",
  },
  {
    label: "Existing Rates",
    value: "existing_rates",
  },
  {
    label: "Most Recent Carrier Invoice",
    value: "existing_recent_invoices",
  },
  {
    label: "Plan Document",
    value: "existing_plan_documents",
  },
  {
    label: "Summary of Benefits and Coverage",
    value: "existing_summary_of_benefits",
  },
  {
    label: "Upcoming Renewal",
    value: "existing_upcoming_renewal",
  },
  {
    label: "Summary Plan Description",
    value: "existing_summary_plan_description",
  },
  {
    label: "Other",
    value: "other",
  },
];

export function getSelectValue(value: string) {
  return selectOptions.find((item) => item.value === value);
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

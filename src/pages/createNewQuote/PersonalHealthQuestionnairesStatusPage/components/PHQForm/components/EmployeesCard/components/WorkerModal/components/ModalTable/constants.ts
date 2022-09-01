import { ITableHeader } from "src/interfaces/common";

export const tableHeaders: ITableHeader[] = [
  { Header: "Questionnaire", accessor: "questionnaire" },
  { Header: "Signature", accessor: "signature" },
  { Header: "Updated", accessor: "updatedAt" },
  { Header: "Submission", accessor: "submission" },
];

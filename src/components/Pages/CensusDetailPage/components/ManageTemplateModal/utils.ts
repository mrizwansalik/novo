import _ from "lodash";
import { exportCsvFile } from "src/utils/csv";
export const sampleInstructions = [
  "#",
  "#  INSTRUCTIONS",
  "#",
  "#  This spreadsheet is used to upload simple census information about people for",
  "#  insurance purposes.",
  "#",
  "#  For Illustrative census, dependent information is not required, and only the",
  "#  Coverage, Zip Code, Date of Birth, and Gender columns need to be filled out",
  "#  for each employee. All information for Employees and their Dependents will be",
  "#  required for Underwriting.",
  "#",
  "#  Each person's data must be entered in a single row. If an employee has",
  "#  dependents, each dependent must be entered on their own row, immediately",
  "#  following the employee's row.",
  "#",
  "#  Below is a list of all columns in the spreadsheet, with details on what kind of",
  "#  data they should contain, as well as any format or value constraints. Fields",
  "#  required for Illustrative census are marked with a *.",
  "#",
  "#  Coverage*: the benefits coverage the person has selected. Valid options are:",
  "#     EE",
  "#     ES",
  "#     EC",
  "#     EF",
  "#",
  "#  Zip Code*: the zip code of the region where the person resides.",
  "#",
  "#  Date of Birth*: the date of birth of the person. Valid formats include:",
  "#    MM-DD-YYYY    (month, day, 4-digit year. example: 11-28-2016)",
  "#    MM/DD/YYYY    (month, day, 4-digit year. example: 11/28/2016)",
  "#    MM-DD-YY      (month, day, 2-digit year. example: 11-28-16)",
  "#    MM/DD/YY      (month, day, 2-digit year. example: 11/28/16)",
  "#    YYYY-MM-DD    (4-digit year, month, day. example: 2016-11-28)",
  "#    YYYY/MM/DD    (4-digit year, month, day. example: 2016/11/28)",
  "#",
  "#  Gender*: the gender of the person. Valid options are:",
  "#     Male",
  "#     Female",
  "#     M",
  "#     F",
  "#",
  "#  First Name: the first name of the person.",
  "#",
  "#  Last Name: the last name of the person.",
  "#",
  "#  Relationship: the relationship of the person to the employee. Valid options are:",
  "#     for employee: leave blank",
  "#     for spouse: Spouse or S",
  "#     for child: child or C",
  "#",
  "#  Plan Name: the employee's plan selection",
  "#",
];

export const csvHeader = [
  "Coverage*",
  "ZIP Code*",
  "Date of Birth*",
  "Gender*",
  "First Name",
  "Last Name",
  "Relationship",
  "Plan Name",
];

export function exportSimpleCensusTemplateCSV(filename: string) {
  const rows = [];
  _.each(sampleInstructions, function (str) {
    rows.push(['"' + str + '"']);
  });
  rows.push(csvHeader);
  return exportCsvFile(rows, filename);
}

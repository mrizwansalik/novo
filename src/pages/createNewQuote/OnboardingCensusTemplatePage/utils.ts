import { each } from "lodash";
import * as Yup from "yup";
export interface ICensusTemplateFormValue {
  birthday_column: string;
  coverage_column: string;
  coverage_ec: string;
  coverage_ee: string;
  coverage_ef: string;
  coverage_es: string;
  coverage_waived: string;
  data_end_row: string | number;
  data_start_row: string | number;
  first_name_column_dep: string;
  first_name_column_ee: string;
  gender_column: string;
  id: string;
  last_name_column_dep: string;
  last_name_column_ee: string;
  name: string;
  plan_column: string;
  postal_column: string;
  relationship_child: string;
  relationship_column: string;
  relationship_employee: string;
  relationship_spouse: string;
  sheet_name: string;
  hasMultipleSheets: boolean;
}

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please fill out this field"),
});

export function preprocessData(data: ICensusTemplateFormValue) {
  const {
    relationship_column,
    relationship_child,
    relationship_spouse,
    coverage_column,
    coverage_ec,
    coverage_ee,
    coverage_ef,
    coverage_es,
    coverage_waived,
  } = data;
  if (relationship_column) {
    data.relationship_child = relationship_child || "Child";
    data.relationship_spouse = relationship_spouse || "Spouse";
  }

  if (coverage_column) {
    data.coverage_ec = coverage_ec || "EC";
    data.coverage_ee = coverage_ee || "EE";
    data.coverage_ef = coverage_ef || "EF";
    data.coverage_es = coverage_es || "ES";
    data.coverage_waived = coverage_waived || "W*";
  }

  return data;
}

export function sanitizeData(template: ICensusTemplateFormValue) {
  if (template.hasMultipleSheets === false) {
    template.sheet_name = "";
  }

  // sheet name
  if (template.name) {
    template.name = template.name.trim();

    // ensure unique
    const toLower = template.name.toLowerCase();
    if (toLower === "new custom template") {
      // statusMessageService.setError("That is not a valid name.");
      return false;
    }
    // TODO: case edit, implement later
    // if (template.id) {
    //   const found = find(censusTemplates, function (template) {
    //     return template.name.toLowerCase() === toLower;
    //   });
    //   if (found && found.id !== template.id) {
    //     // statusMessageService.setError("That name is already used.");
    //     return false;
    //   }
    // }
  }

  // start row
  template.data_start_row = Number(template.data_start_row);
  template.data_end_row = Number(template.data_end_row);
  if (isFinite(template.data_start_row)) {
    if (template.data_start_row < 1) {
      template.data_start_row = 1;
    }
  } else {
    template.data_start_row = 1;
  }

  // end row
  if (isFinite(template.data_end_row)) {
    if (template.data_end_row < 1) {
      template.data_end_row = 1;
    }
    if (template.data_end_row < template.data_start_row) {
      template.data_end_row = template.data_start_row;
    }
  } else {
    template.data_end_row = -1;
  }

  // trim and clear text fields
  const textMappings = [
    "sheet_name",
    "postal_column",
    "birthday_column",
    "gender_column",
    "relationship_column",
    "relationship_employee",
    "relationship_spouse",
    "relationship_child",
    "coverage_column",
    "coverage_ee",
    "coverage_es",
    "coverage_ec",
    "coverage_ef",
    "coverage_waived",
    "first_name_column_ee",
    "last_name_column_ee",
    "last_name_column_dep",
    "first_name_column_dep",
    "plan_column",
  ];

  each(textMappings, function (mapping) {
    if (template[mapping]) {
      template[mapping] = template[mapping].trim();
    } else {
      template[mapping] = "";
    }
  });

  return true;
}

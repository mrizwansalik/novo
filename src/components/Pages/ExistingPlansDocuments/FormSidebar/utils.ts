import { each } from "lodash";
import { IExistingPlanDocumentTypeChoice } from "src/constants/quote";
import { IExistingPlanDocument } from "src/interfaces/document";

export function getMissingDocsPercent(
  documentAddedCount: number,
  categoryTypes: IExistingPlanDocumentTypeChoice[]
): Number {
  return (documentAddedCount / categoryTypes.length) * 100;
}

export function getNumDocsAdded(
  files: IExistingPlanDocument[],
  categoryTypes: IExistingPlanDocumentTypeChoice[]
) {
  let numDocsAdded = [];
  each(files, function (file) {
    each(categoryTypes, function (type) {
      if (file.category === type.tag) {
        numDocsAdded.push(type);
      }
    });
  });
  return numDocsAdded.length;
}

export function isDocAdded(
  files: IExistingPlanDocument[],
  categoryType: IExistingPlanDocumentTypeChoice
) {
  return files.some((file) => file.category === categoryType.tag);
}

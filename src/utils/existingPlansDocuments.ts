import { indexOf } from "lodash";
import {
  existingPlanDocumentTypeTags,
  EXISTING_PLANS_FILES_MAPPING,
} from "src/constants/quote";
import { IDocument } from "src/interfaces/document";
import { IOrg } from "src/interfaces/org";
import {
  getDataObjectMapping,
  setDataObjectMapping,
} from "src/utils/requiredField";
import { IExistingPlanDocument } from "./../interfaces/document";
import { hasTag } from "./document";

export function getFiles(prospectDetail: IOrg): IDocument[] {
  let files = getDataObjectMapping(
    prospectDetail,
    EXISTING_PLANS_FILES_MAPPING
  );

  if (!Array.isArray(files)) {
    files = [];
    setDataObjectMapping(
      prospectDetail,
      EXISTING_PLANS_FILES_MAPPING,
      files,
      true
    );
  }

  return files;
}

export function sortFileInfo(files: IExistingPlanDocument[]) {
  files.sort(function (a, b) {
    const aIndex = indexOf(existingPlanDocumentTypeTags, a.category);
    const bIndex = indexOf(existingPlanDocumentTypeTags, b.category);
    return aIndex - bIndex;
  });
}

export function updateEditFiles(
  prospectDetail: IOrg,
  files: IExistingPlanDocument[],
  categoryTypes,
  sort: boolean
): IExistingPlanDocument[] {
  if (!Array.isArray(files)) {
    files = [];
  }

  let documents = getFiles(prospectDetail);
  documents.forEach((file) => {
    let tag = "";
    for (let i = 0; i < categoryTypes.length; ++i) {
      if (hasTag(file, categoryTypes[i].tag)) {
        tag = categoryTypes[i].tag;
        break;
      }
    }

    const addFile = {
      file: file,
      name: file.name,
      category: tag,
      name_edit: false,
    };

    // file may already have existing in list, update if so
    const foundIndex = files.findIndex((editFile) => {
      return editFile.file.file === addFile.file.file;
    });

    if (foundIndex > -1) {
      files[foundIndex] = addFile;
    } else {
      files.push(addFile);
    }
  });

  if (sort) {
    sortFileInfo(files);
  }

  return files;
}

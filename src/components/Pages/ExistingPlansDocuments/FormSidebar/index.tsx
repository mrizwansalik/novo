import React, { useState } from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { updateOrg } from "src/api/org";
import FileUploader from "src/components/FileUploader";
import Icon from "src/components/Icon";
import { BaseFilePath } from "src/constants";
import { EXISTING_PLANS_FILES_MAPPING } from "src/constants/quote";
import { IUploadedFile } from "src/interfaces/file";
import routes from "src/routes";
import { setDataObjectMapping } from "src/utils/requiredField";
import useStore from "src/utils/useStore";
import { getFiles } from "../DocumentsForm/utils";
import {
  ChecklistItem,
  ComponentContainer,
  PrimaryButton,
  ProgressBar,
  ProgressDetail,
  UploadButton,
} from "./formSidebar.style";
import { getMissingDocsPercent, getNumDocsAdded, isDocAdded } from "./utils";

const customAllowFileTypes = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/pdf",
];

const FormSidebar = () => {
  const history = useHistory();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const { onboardingQuoteStore, existingPlansDocumentsStore } = useStore();
  const { prospectDetail } = onboardingQuoteStore;
  const { files, categoryTypes } = existingPlansDocumentsStore;

  const currentRequiredDocs = categoryTypes.slice(0, categoryTypes.length - 1);
  const optionalDocs = [categoryTypes[categoryTypes.length - 1]];

  const documentAdded = getNumDocsAdded(files, currentRequiredDocs);
  const currentDocumentProcess = getMissingDocsPercent(
    documentAdded,
    categoryTypes
  );

  async function onUploadFile(uploadedFiles: IUploadedFile[]) {
    try {
      let allFiles = getFiles(prospectDetail);
      allFiles = [...allFiles, ...uploadedFiles];
      setDataObjectMapping(
        prospectDetail,
        EXISTING_PLANS_FILES_MAPPING,
        allFiles,
        false
      );
      toast.info("Saving file");
      const updatedProspect = await updateOrg(prospectDetail);
      existingPlansDocumentsStore.setFiles([]);
      onboardingQuoteStore.setProspectDetail(updatedProspect);
      toast.success("File saved");
    } catch (e) {
      toast.error("There was a problem saving the files.");
    }
  }

  return (
    <ComponentContainer>
      <PrimaryButton
        onClick={() =>
          history.push(
            routes.dashboard.brokerage.prospects.onBoarding.programBuild.choice.value(
              prospectDetail.id
            )
          )
        }
      >
        Next
      </PrimaryButton>
      <UploadButton onClick={() => setIsUploadModalOpen(true)}>
        <Icon iconName="emptyBlueCircleArrow.png" size={24} />
        <h5>Upload Documents</h5>
      </UploadButton>
      <ProgressBar value={currentDocumentProcess} />
      <ProgressDetail>
        <button disabled>Due for underwriting</button>
        <div>
          <Icon iconName="check-square.svg" size={18} />
          <span>
            {documentAdded}/{currentRequiredDocs.length}
          </span>
        </div>
      </ProgressDetail>
      <h3>Document Checklist</h3>
      <h5>Required</h5>
      <div>
        {currentRequiredDocs.map((docType) => {
          const isAdded = isDocAdded(files, docType);
          return (
            <ChecklistItem key={docType.name} isDisabled={!isAdded}>
              {docType.name}
              {isAdded && <Icon iconName="green_check_mark.png" size={16} />}
            </ChecklistItem>
          );
        })}
      </div>
      <h5>Optional</h5>
      <div>
        {optionalDocs.map((docType) => {
          const isAdded = isDocAdded(files, docType);
          return (
            <ChecklistItem key={docType.name} isDisabled={!isAdded}>
              {docType.name}
              {isAdded && <Icon iconName="green_check_mark.png" size={16} />}
            </ChecklistItem>
          );
        })}
      </div>

      <FileUploader
        allowMultipleUploads
        isOpen={isUploadModalOpen}
        filePath={BaseFilePath.PRIVATE}
        customAllowFileTypes={customAllowFileTypes}
        onRequestClose={() => setIsUploadModalOpen(false)}
        onMultipleUploadSuccess={onUploadFile}
      />
    </ComponentContainer>
  );
};

export default observer(FormSidebar);

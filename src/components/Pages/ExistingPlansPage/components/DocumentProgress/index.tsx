import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import FileUploader from "src/components/FileUploader";
import { BaseFilePath } from "src/constants";
import { IPlanDocuments } from "src/interfaces/prospects";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { getChecklistProgress } from "../../utils";
import DocumentChecklist from "../DocumentChecklist";
import {
  Container,
  ProgressBar,
  ProgressBarContainer,
  ProgressStatus,
  ProgressStatusContainer,
  UnderwritingText,
  UploadDocument,
  UploadIcon,
} from "./styles";

const customAllowFileTypes = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/pdf",
];

const DocumentProgress = () => {
  const [isModalUploadOpen, setIsModalUploadOpen] = useState(false);
  const { brokerProspectsListStore } = useStore();
  const { currentPlanDocuments } = brokerProspectsListStore;
  const { prospectId } = useParams<IParamTypes>();
  const [checklistProgress, setChecklistProgress] = useState<number>(0);

  function onUploadFile(uploadedFiles: IPlanDocuments[], fileData) {
    uploadedFiles.forEach((item) => {
      const newDocument = {
        name: item.file_name,
        mime_type: item.mime_type,
        file: item.file,
      };
      brokerProspectsListStore.addNewPlanDocument(newDocument);
    });
    brokerProspectsListStore.updateProspect(prospectId);
    setIsModalUploadOpen(false);
  }
  useEffect(() => {
    if (currentPlanDocuments) {
      setChecklistProgress(getChecklistProgress(currentPlanDocuments));
    }
  }, [currentPlanDocuments]);
  return (
    <Container>
      <UploadDocument onClick={() => setIsModalUploadOpen(true)}>
        <UploadIcon iconName="emptyBlueCircleArrow.png" size={24} />
        Upload Documents
      </UploadDocument>
      <ProgressBarContainer>
        <ProgressBar progress={checklistProgress} />
      </ProgressBarContainer>
      <ProgressStatusContainer>
        <UnderwritingText>Due for underwriting</UnderwritingText>
        <ProgressStatus>
          <UploadIcon iconName="check-square.svg" size={18} />
          {`${checklistProgress}/8`}
        </ProgressStatus>
      </ProgressStatusContainer>
      <DocumentChecklist />
      <FileUploader
        isOpen={isModalUploadOpen}
        onRequestClose={() => setIsModalUploadOpen(false)}
        filePath={BaseFilePath.PRIVATE}
        onMultipleUploadSuccess={onUploadFile}
        allowMultipleUploads
        customAllowFileTypes={customAllowFileTypes}
      />
    </Container>
  );
};

export default observer(DocumentProgress);

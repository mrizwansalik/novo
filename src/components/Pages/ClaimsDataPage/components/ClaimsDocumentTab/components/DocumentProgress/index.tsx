import React, { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { observer } from "mobx-react";
import { useParams, useHistory } from "react-router-dom";
import { updateClaimsData, createClaimsData } from "src/api/benefits";
import FileUploader from "src/components/FileUploader";
import { BaseFilePath } from "src/constants";
import { IPlanDocuments } from "src/interfaces/prospects";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { createEmptyClaimsData } from "../../../../utils";
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
  const { benefitStore } = useStore();
  const { currentClaimsDocuments, claimsData } = benefitStore;
  const { prospectId } = useParams<IParamTypes>();
  const [checklistProgress, setChecklistProgress] = useState<number>(0);
  const history = useHistory();

  const currentYear = new Date().getFullYear();
  async function onUploadFile(uploadedFiles: IPlanDocuments[], fileData) {
    let currentClaimsData = claimsData.find(
      (item) => item.year === currentYear
    );
    if (currentClaimsData) {
      uploadedFiles.forEach((item) => {
        const newDocument = {
          name: item.file_name,
          mime_type: item.mime_type,
          file: item.file,
          tags: "",
        };
        currentClaimsData.generic_field_responses.claims_documents.push(
          newDocument
        );
      });
      const updatedClaimsData = await updateClaimsData(
        prospectId,
        currentClaimsData.id,
        currentClaimsData
      );
      benefitStore.setClaimsData(
        claimsData.map((item) =>
          item.id === updatedClaimsData.id ? updatedClaimsData : item
        )
      );
    } else {
      currentClaimsData = createEmptyClaimsData(currentYear);
      uploadedFiles.forEach((item) => {
        const newDocument = {
          name: item.file_name,
          mime_type: item.mime_type,
          file: item.file,
          tags: "",
        };
        currentClaimsData.generic_field_responses.claims_documents.push(
          newDocument
        );
      });
      const newClaimsData = await createClaimsData(
        prospectId,
        currentClaimsData
      );
      const cloneClaimsData = cloneDeep(claimsData);
      cloneClaimsData.push(newClaimsData);
      benefitStore.setClaimsData(cloneClaimsData);
    }

    setIsModalUploadOpen(false);
  }
  useEffect(() => {
    if (currentClaimsDocuments) {
      setChecklistProgress(getChecklistProgress(currentClaimsDocuments));
    }
  }, [currentClaimsDocuments]);
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
          {`${checklistProgress}/5`}
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

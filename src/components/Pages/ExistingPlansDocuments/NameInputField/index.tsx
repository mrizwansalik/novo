import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { updateOrg } from "src/api/org";
import Icon from "src/components/Icon";
import { IDocument, IExistingPlanDocument } from "src/interfaces/document";
import useStore from "src/utils/useStore";
import {
  ButtonGroup,
  EditContainer,
  StyledButton,
  StyledInput,
  ValueContainer,
} from "./nameInputField.style";

interface INameInputFieldProps {
  file: IExistingPlanDocument;
}

const NameInputField = ({ file }: INameInputFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");

  const { onboardingQuoteStore } = useStore();
  const { prospectDetail } = onboardingQuoteStore;

  async function saveFileName() {
    const currentFileName = get(file, "file.name");
    if (name) {
      if (name !== currentFileName) {
        try {
          file.name = name;
          file.file.name = name;
          const currentPlanDocuments: IDocument[] = get(
            prospectDetail,
            "generic_field_responses.plan_documents",
            []
          );
          const newPlanDocuments = currentPlanDocuments.map((document) => {
            if (document.id === file.file.id) {
              return file.file;
            }
            return document;
          });
          prospectDetail.generic_field_responses.plan_documents = newPlanDocuments;
          await updateOrg(prospectDetail);
          onboardingQuoteStore.setProspectDetail(prospectDetail);
        } catch (e) {}
      }

      setIsEditing(false);
    }
  }

  function handleCancel() {
    const fileName = get(file, "file.name");
    setName(fileName);
    setIsEditing(false);
  }

  useEffect(() => {
    const fileName = get(file, "file.name");
    setName(fileName);
  }, [file]);

  if (isEditing) {
    return (
      <EditContainer>
        <StyledInput value={name} onChange={(e) => setName(e.target.value)} />
        <ButtonGroup>
          <StyledButton isUpdate onClick={saveFileName}>
            Update
          </StyledButton>
          <StyledButton onClick={handleCancel}>Cancel</StyledButton>
        </ButtonGroup>
      </EditContainer>
    );
  }

  return (
    <ValueContainer>
      <div>{name}</div>
      <Icon
        iconName="black_pencil.png"
        size={24}
        onClick={() => setIsEditing(true)}
      />
    </ValueContainer>
  );
};
export default NameInputField;

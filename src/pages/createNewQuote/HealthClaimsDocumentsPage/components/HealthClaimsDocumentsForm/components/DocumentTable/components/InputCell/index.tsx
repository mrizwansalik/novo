import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "reactstrap";
import Icon from "src/components/Icon";
import { HealthClaimsFormValues } from "../../../../enums";
import { IClaimsDocumentsForm } from "../../../../interfaces";
import {
  InputContainer,
  NameInput,
  NameLabel,
  InputSection,
  ButtonSection,
  UpdateButton,
  CancelButton,
} from "./inputCell.styles";
import { handleSave } from "./utils";

interface IInputCellProps {
  uploadedDocument: IClaimsDocumentsForm;
  order: number;
}

const InputCell = (props: IInputCellProps) => {
  const { uploadedDocument, order } = props;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>(uploadedDocument?.name);
  const { setValue, getValues } = useFormContext();

  const fileName: string =
    uploadedDocument?.name?.length > 25
      ? `${uploadedDocument?.name?.substring(0, 25)}...`
      : uploadedDocument?.name;

  return (
    <InputContainer>
      {!editMode && (
        <NameLabel>
          <Input
            type="checkbox"
            checked={uploadedDocument?.delete}
            onChange={(event) =>
              setValue(
                `${HealthClaimsFormValues.CLAIM_DOCUMENTS}[${order}].delete`,
                event?.target?.checked,
                {
                  shouldDirty: false,
                }
              )
            }
          />
          <span>
            {fileName}
            <Icon
              noWrapper
              iconName="black_pencil.png"
              onClick={() => setEditMode(true)}
            />
          </span>
        </NameLabel>
      )}
      {editMode && (
        <NameInput>
          <InputSection>
            <Input
              value={inputName}
              onChange={(event) => setInputName(event.target.value)}
              defaultValue={uploadedDocument?.name}
            />
          </InputSection>
          <ButtonSection>
            <UpdateButton
              label="Update"
              onClick={() => {
                handleSave(setValue, getValues, inputName, order);
                setEditMode(false);
              }}
            />
            <CancelButton label="Cancel" onClick={() => setEditMode(false)} />
          </ButtonSection>
        </NameInput>
      )}
    </InputContainer>
  );
};

export default InputCell;

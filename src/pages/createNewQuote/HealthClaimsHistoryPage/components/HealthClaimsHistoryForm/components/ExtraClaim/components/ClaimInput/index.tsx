import { useState } from "react";
import { observer } from "mobx-react";
import { toast } from "react-toastify";
import RowNoSpacing from "src/components/RowNoSpacing";
import { thousandSeparatorByComma } from "src/utils/form";
import {
  Label,
  EditIcon,
  RemoveIcon,
  AmountGroup,
  CommonInput,
  SaveButton,
} from "./claimInput.styles";

interface IClaimInputProps {
  value: number;
  stopLossClaimId: string;
  order: number;
  remove: (index: number) => void;
  handleUpdate: (order: number, updateValue: number) => void;
}

const LIMIT_AMOUNT: number = 10000;
const ClaimInput = (props: IClaimInputProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { value, order, remove, handleUpdate } = props;
  const [claimValue, setClaimValue] = useState<number>(value);

  return (
    <RowNoSpacing key={order}>
      <AmountGroup md={{ size: 4 }}>
        {!editMode && (
          <Label noSpacing>{`$${thousandSeparatorByComma(value)}`}</Label>
        )}
        {editMode && (
          <CommonInput
            defaultValue={value}
            onChange={(event) => setClaimValue(event.target.value)}
          />
        )}
        {editMode && (
          <SaveButton
            onClick={() => {
              if (claimValue < LIMIT_AMOUNT) {
                toast.error(
                  `Claims must larger than $${thousandSeparatorByComma(
                    LIMIT_AMOUNT - 1
                  )}`
                );
                return;
              }
              handleUpdate(order, claimValue);
              setEditMode(false);
            }}
          >
            Save
          </SaveButton>
        )}
        {!editMode && (
          <EditIcon
            onClick={() => setEditMode(true)}
            iconName="black_pencil.png"
          />
        )}
        {!editMode && (
          <RemoveIcon onClick={() => remove(order)} iconName="red-trash.png" />
        )}
      </AmountGroup>
    </RowNoSpacing>
  );
};

export default observer(ClaimInput);

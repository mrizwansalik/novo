import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import styled from "styled-components";

export interface IInputRadioProps {
  disabled?: boolean;
  checked?: boolean;
  label?: string;
  value?: string | boolean;
  name?: string;
  innerRef?: any;
  onChange?: (e) => void;
}

const StyledRadio = styled(Input)`
  cursor: pointer;
  margin-right: 8px;
`;

const InputRadio = (props: IInputRadioProps) => {
  const { label, value } = props;

  return (
    <FormGroup>
      <Label>
        <StyledRadio {...props} type="radio" value={value} />
        {label}
      </Label>
    </FormGroup>
  );
};
export default InputRadio;

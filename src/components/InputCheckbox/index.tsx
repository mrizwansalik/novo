import React from "react";
import { Input, InputGroup } from "reactstrap";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

interface IInputCheckboxProps {
  label?: string;
  checked?: boolean;
  className?: string;
  onChange?: any;
  onClick?: (e) => void;
  disabled?: boolean;
}

const StyledInput = styled(Input)`
  width: 16px;
  height: 16px;
  margin-top: 3px;
  background-color: ${ThemeColor.TWILIGHT_BLUE};
  cursor: pointer;
  border-radius: 0.25em !important;
`;

const StyledLabel = styled.label`
  margin-left: 8px !important;
`;

const InputCheckbox = (props: IInputCheckboxProps) => {
  const { label = null, className, checked, onClick, ...rest } = props;

  return (
    <InputGroup className={className}>
      <StyledInput
        checked={checked}
        onClick={onClick}
        type="checkbox"
        aria-label={label}
        {...rest}
      />
      <StyledLabel>{label}</StyledLabel>
    </InputGroup>
  );
};
export default InputCheckbox;

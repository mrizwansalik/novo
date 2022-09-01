import React from "react";
import { MenuPlacement } from "react-select";
import CreatableSelectInput from "react-select/creatable";
import { Label } from "reactstrap";
import { ThemeColor } from "src/constants";
import styled from "styled-components";
import { IOption } from "../../types/form";

interface IFilterOption {
  label: string;
  value: string;
  data: any;
}
export interface ICreatableSelectProps {
  label?: string;
  placeholder?: string;
  className?: string;
  options?: IOption[];
  value?: IOption;
  defaultValue?: IOption;
  isSearchable?: boolean;
  valueColor?: string;
  error?: string;
  controlStyle?: Record<string, unknown>;
  placeholderStyle?: Record<string, unknown>;
  menuPlacement?: MenuPlacement;
  onChange?: (string) => void;
  filterOption?: (option: IFilterOption, rawInput: string) => boolean;
  menuPortalTarget?: HTMLElement;
}

const ErrorMessage = styled.div`
  color: ${ThemeColor.CARDINAL};
  font-size: 14px;
`;

const CreatableSelect = (props: ICreatableSelectProps) => {
  const {
    label,
    className,
    isSearchable = false,
    valueColor,
    controlStyle,
    placeholderStyle,
    menuPortalTarget,
    error,
    ...rest
  } = props;

  const reactSelectComponents = {
    IndicatorSeparator: null,
  };

  let controlAdditionalStyle = {
    ...controlStyle,
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    borderRadius: "0",
    boxShadow: "none",
    borderColor: `${ThemeColor.BORDER_COLOR} !important`,
  };

  const customStyle = {
    singleValue: (base) => ({
      ...base,
      color: valueColor ? valueColor : "inherit",
      cursor: "pointer",
    }),
    control: (base) => ({
      ...base,
      ...controlAdditionalStyle,
      cursor: "pointer",
    }),
    placeholder: (base) => ({
      fontWeight: 300,
      ...base,
      ...placeholderStyle,
    }),
  };

  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      <CreatableSelectInput
        {...rest}
        styles={customStyle}
        components={reactSelectComponents}
        isSearchable={isSearchable}
        menuPortalTarget={menuPortalTarget}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
};

export default CreatableSelect;

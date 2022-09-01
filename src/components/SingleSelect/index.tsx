import React from "react";
import Select, { MenuPlacement } from "react-select";
import { Label } from "reactstrap";
import { ThemeColor } from "src/constants";
import styled from "styled-components";
import { IOption } from "../../types/form";

interface IFilterOption {
  label: string;
  value: string;
  data: any;
}
export interface ISingleSelectProps {
  label?: string;
  placeholder?: string;

  className?: string;
  options?: IOption[];
  value?: IOption | any;
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
  isDisabled?: boolean;
  isMulti?: boolean;
  closeMenuOnSelect?: boolean;
}

const ErrorMessage = styled.div`
  color: ${ThemeColor.CARDINAL};
  font-size: 14px;
`;

const SingleSelect = (props: ISingleSelectProps) => {
  const {
    label,
    className,

    isSearchable = false,
    valueColor,
    controlStyle,
    placeholderStyle,
    menuPortalTarget,
    value,
    error,
    isDisabled,
    ...rest
  } = props;
  const reactSelectComponents = {
    IndicatorSeparator: null,
  };

  let controlAdditionalStyle = { ...controlStyle };

  if (isSearchable) {
    controlAdditionalStyle = {
      ...controlAdditionalStyle,
      borderTop: "none",
      borderRight: "none",
      borderLeft: "none",
      borderRadius: "0",
      boxShadow: "none",
      borderColor: `${ThemeColor.BORDER_COLOR} !important`,
    };
  }

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
      ...base,
      ...placeholderStyle,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 999999999,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 999999999,
    }),
  };

  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      <Select
        {...rest}
        styles={customStyle}
        value={value}
        components={reactSelectComponents}
        isSearchable={isSearchable}
        menuPortalTarget={menuPortalTarget}
        isDisabled={isDisabled}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
};

export default SingleSelect;

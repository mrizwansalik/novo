import React from "react";
import Select from "react-select";
import { IOption } from "../../interfaces/common";

export interface IMultipleSelectProps {
  placeholder?: string;
  className?: string;
  options?: IOption[];
  value?: IOption;
  defaultValue?: IOption;
  isSearchable?: boolean;
  onChange?: (string) => void;
}

const MultipleSelect = (props: IMultipleSelectProps) => {
  const { isSearchable = false, ...rest } = props;

  const reactSelectComponents = {
    IndicatorSeparator: null,
  };

  return (
    <Select
      {...rest}
      isMulti
      components={reactSelectComponents}
      isSearchable={isSearchable}
    />
  );
};

export default MultipleSelect;

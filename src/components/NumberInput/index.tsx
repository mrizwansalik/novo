import React from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";

export interface INumberInputProps extends NumberFormatProps {
  label?: string;
}

const NumberInput = (props: INumberInputProps) => {
  const { label, className, ...rest } = props;

  return (
    <div className={className}>
      <label>{label}</label>
      <NumberFormat {...rest} />
    </div>
  );
};

export default NumberInput;

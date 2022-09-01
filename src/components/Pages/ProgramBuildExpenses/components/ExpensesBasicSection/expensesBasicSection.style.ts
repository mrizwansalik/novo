import NumberInput from "src/components/NumberInput";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

interface IInputProps {
  hasMarginTop?: boolean;
  isShort?: boolean;
  isMedium?: boolean;
}

export const Container = styled(RowNoSpacing)`
  border-left: 1px solid ${ThemeColor.SILVER};
  padding-bottom: 30px;
`;

export const StyledNumberInput = styled(NumberInput)`
  padding: 0 15px;
  width: 30%;

  label {
    color: ${ThemeColor.RIVER_BED};
    padding: 20px 0;
  }

  input {
    height: 24px;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: ${ThemeColor.STEEL_GRAY};
    padding: 0 0 5px 0;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px solid #c8c8c8 !important;
    border-radius: 0;
    box-shadow: none !important;
    background-color: transparent !important;
    width: ${(props) =>
      props.isShort ? "120px" : props.isMedium ? "170px" : "100%"};
    display: block !important;

    :focus {
      outline: none;
    }

    :disabled {
      color: #a6a6a6 !important;
    }
  }
`;

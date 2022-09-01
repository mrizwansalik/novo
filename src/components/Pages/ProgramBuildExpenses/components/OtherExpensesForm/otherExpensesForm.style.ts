import Select from "react-select";
import Button from "src/components/Button";
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

export const InputGroupContainer = styled.div`
  display: flex;
`;

export const StyledNumberInput = styled(NumberInput)`
  padding: 0 15px;

  input {
    height: 30px;
    font-size: 16px;
    font-weight: 300;
    line-height: 30px;
    color: ${ThemeColor.STEEL_GRAY};
    padding: 0 0 15px 0;
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

export const StyledSelect = styled(Select)`
  margin-bottom: 25px;
  line-height: 35px;
`;

export const CommonTextarea = styled.textarea`
  border-color: transparent;
  border-radius: 0px;
  padding-right: 0px;
  padding-left: 0px;

  border-radius: 3px;
  width: 100%;
  background-color: #f7f7f7;
  min-height: 66px;

  border-bottom: 1px solid #ebebeb !important;
  border-right: 1px solid #ebebeb !important;
  border-left: 1px solid #ebebeb !important;
  border-top: 1px solid ${ThemeColor.MANATEE} !important;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: transparent;
  }
`;

export const PrimaryButton = styled(Button)`
  max-height: 100%;
  width: 100px;
  color: #0097f5;
  background-color: #def5fc;
  margin-right: 20px;

  :hover {
    background-color: #0078c2;
  }
`;

export const SecondaryButton = styled(Button)`
  max-height: 100%;
  width: 100px;
  background-color: #ffffff;
  color: #0097f5;

  :hover {
    color: #0097f5;
    background-color: ${ThemeColor.MERCURY};
  }
`;

export const CommonInput = styled.input`
  height: 24px;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid #c8c8c8 !important;
  border-radius: 0;
  padding: 25px 0px;
  width: 80%;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

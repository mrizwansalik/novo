import Select from "react-select";
import { Button } from "reactstrap";
import Icon from "src/components/Icon";
import InputCheckbox from "src/components/InputCheckbox";
import InputGroup from "src/components/InputGroup";
import NumberInput from "src/components/NumberInput";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

interface IInputProps {
  disabled?: boolean;
  hasMarginTop?: boolean;
  isShort?: boolean;
  isMedium?: boolean;
}

export const Container = styled.div`
  margin-bottom: 50px;
`;

export const ComponentContainer = styled.div`
  padding: 10px 30px;
`;

export const HeaderWrapper = styled.div`
  margin: 0;
  width: 100%;
  border: none;
  background-color: #f7f7f7;
  font-size: 24px;
  font-weight: 700;
  padding: 30px 50px 30px 20px;
  color: black;
  margin-bottom: 20px;
  margin-left: 1px;

  span {
    line-height: 30px;
    font-size: 24px;
    font-weight: 700;
    color: black;
  }

  p {
    margin-top: 10px;
    display: block;
    font-size: 18px;
    font-weight: normal;
    color: #4b565e;
    line-height: 20px;
  }
`;

export const Title = styled.div`
  display: flex;

  h1 {
    font-size: 18px;
    line-height: 27px;
    color: #212135;
    font-weight: 700;
    margin-bottom: 8px;
  }

  h2 {
    font-size: 18px;
    line-height: 27px;
    color: #212135;
    font-weight: 700;
    margin: 24px 0 20px;

    :nth-child(2) {
      font-weight: 300;
      color: ${ThemeColor.TOWER_GRAY};
    }
  }
`;

export const StyledInput = styled(InputGroup)<IInputProps>`
  margin-top: ${(props) => (props.hasMarginTop ? "25px" : "inherit")};
  margin-bottom: 25px;

  label {
    font-size: 16px;
    line-height: 24px;
    color: #212135;
    margin-bottom: 16px;
    font-weight: 500;
  }

  label:nth-of-type(2) {
    color: ${ThemeColor.RIVER_BED};
  }

  input {
    height: 36px;
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

export const StyledNumberInput = styled(NumberInput)`
  padding: 0 15px;

  label:nth-of-type(1) {
    display: none;
    visibility: hidden;
  }

  label:nth-of-type(2) {
    color: ${ThemeColor.RIVER_BED};
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

export const StyledCheckbox = styled(InputCheckbox)`
  display: flex;
  align-items: center;
  margin-bottom: 25px;

  label {
    font-size: 16px;
    font-weight: 300;
    line-height: 16px;
    margin-top: 3px;
  }

  input {
    width: 24px;
    height: 24px;
  }
`;

export const StyledCloseEditForm = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StyledCloseEditButton = styled(Icon)`
  margin: 20px;
  cursor: pointer;
`;

export const StyledButton = styled(Button)`
  width: auto;
  height: 38px;
  min-width: 166px;
  padding: 8px 18px;
  border-radius: 3px;
  background-color: #0097f5;
  border: 1px solid #0097f5;
  color: #ffffff;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 24px;

  :hover {
    background-color: #0078c2;
    border-color: #0078c2;
  }
`;

export const StyledOutlineButton = styled(StyledButton)`
  background-color: #ffffff;
  color: #0097f5;

  :hover {
    color: #0097f5;
    background-color: #e6e6e6;
  }
`;

export const StyledSelect = styled(Select)`
  margin-top: 16px;
  margin-bottom: 25px;
`;

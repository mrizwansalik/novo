import { FormGroup, Col } from "reactstrap";
import InputCheckbox from "src/components/InputCheckbox";
import InputGroup from "src/components/InputGroup";
import SingleSelect from "src/components/SingleSelect";
import { device, ThemeColor } from "src/constants";
import styled from "styled-components";

export const ComponentContainer = styled.div``;

export const Header = styled.div`
  margin: 0;
  width: 100%;
  border: none;
  background-color: #f7f7f7;
  font-size: 24px;
  font-weight: 700;
  padding: 30px 50px 30px 20px;
  color: black;
  margin-left: 1px;
`;

export const StopLossContainer = styled.div`
  display: flex;
  padding-left: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const StopLossItem = styled.button<{ isActive?: boolean }>`
  height: 36px;
  border-radius: 18px;
  cursor: pointer;
  border: 1px solid #c8c8c8;
  margin-right: 10px;
  margin-top: 5px;
  font-size: 14px;
  line-height: 19px;
  font-weight: 700;
  text-align: center;
  padding: 0px 16px !important;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;

  background-color: ${(props) => (props.isActive ? "#0097f5" : "#def5fc")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#0097f5")};
  border-color: #0097f5;

  img {
    margin-left: 10px;
    position: relative;
    z-index: 10;
  }
`;

export const StyledCol = styled(Col)`
  padding: 0 50px;
  position: relative;
`;

export const SectionTitle = styled.h2`
  font-weight: 700;
  color: #4b565e;
  font-size: 18px;
  line-height: 24px;
  margin: 24px 0;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  padding-left: 38px;
  margin-top: 60px;
  margin-bottom: 50px;
  flex-wrap: wrap;

  button {
    margin-right: 20px;
    background-color: #ffffff;
    color: #0097f5;
    height: 38px;
    min-width: 166px;
    padding: 8px 18px;
    border-radius: 3px;
    border: 1px solid #0097f5;
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button:hover {
    background-color: #e6e6e6;
  }

  @media only screen and (${device.mobile}) {
    margin-top: 30px;
    justify-content: left;

    button {
      width: 90%;
      margin: 0 0 10px;
    }
  }
`;

export const StyledSelect = styled(SingleSelect)`
  margin-bottom: 25px;

  label {
    margin-bottom: 16px !important;
  }
`;

export const StyledRadioGroup = styled(FormGroup)`
  margin-bottom: 25px;

  > div {
    display: flex;

    label {
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      color: ${ThemeColor.STEEL_GRAY};
      vertical-align: middle;
      margin-right: 18px;
    }
  }

  legend {
    font-size: 16px;
    line-height: 24px;
    color: ${ThemeColor.STEEL_GRAY};
    margin-bottom: 16px;
    font-weight: 500;
  }
`;

interface IInputProps {
  hasMarginTop?: boolean;
  isShort?: boolean;
  isMedium?: boolean;
}
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

export const StyledCheckbox = styled(InputCheckbox)`
  margin-top: 45px;

  input {
    height: 24px;
    width: 24px;
  }
  label {
    font-size: 16px;
    line-height: 24px;
    vertical-align: middle;
    margin-left: 8px;
    margin-top: 3px;
    font-weight: 300;
  }
`;

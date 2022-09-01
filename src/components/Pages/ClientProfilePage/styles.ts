/* eslint-disable max-lines */
import Select from "react-virtualized-select";
import { FormGroup } from "reactstrap";
import Button from "src/components/Button";
import InputGroup from "src/components/InputGroup";
import SingleSelect from "src/components/SingleSelect";
import { ThemeColor } from "src/constants";
import { device } from "src/constants";
import styled from "styled-components";

interface ISubmitButtonProps {
  disabled?: boolean;
}

export const selectControlStyle = {
  borderTop: "none",
  borderRight: "none",
  borderLeft: "none",
  borderRadius: "0",
  boxShadow: "none",
  borderColor: `${ThemeColor.BORDER_COLOR} !important`,
};

export const Container = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  font-family: "MuseoSans";
`;

export const ProfileContainer = styled.form`
  margin-top: 25px;
  margin-bottom: 50px;
  padding-left: 15px;
`;

export const TextInput = styled(InputGroup)`
  margin-bottom: 25px;

  label {
    margin-bottom: 16px;
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
    width: 100%;
    box-shadow: none !important;
  }
`;

export const RadioInputGroup = styled(FormGroup)`
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

export const DropdownInput = styled(SingleSelect)`
  margin-bottom: 25px;

  label {
    margin-bottom: 16px !important;
  }
`;

export const SubmitButton = styled(Button)<ISubmitButtonProps>`
  margin: 25px 0;
  height: 38px;
  min-width: 166px;
  padding: 8px 18px;
  border-radius: 3px;
  font-size: 14px;
  line-height: 21px;
  text-align: center;

  color: ${(props) => (props.disabled ? "#a6a6a6" : ThemeColor.WHITE_COLOR)};
  border: 1px solid;
  border-color: ${(props) =>
    props.disabled ? "#e3e9ec" : ThemeColor.AZURE_RADIANCE};
  background-color: ${(props) =>
    props.disabled ? ThemeColor.SILVER : ThemeColor.AZURE_RADIANCE};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")} !important;

  :hover {
    color: ${(props) => (props.disabled ? "#a6a6a6" : ThemeColor.WHITE_COLOR)};
    background-color: ${(props) =>
      props.disabled ? ThemeColor.SILVER : "#0078c2"};
    border-color: ${(props) => (props.disabled ? "#e3e9ec" : "#0078c2")};
  }
`;

export const MarginLabel = styled.label`
  display: block;
  margin-bottom: 16px;
`;

export const IndustryCodeSelect = styled(Select)`
  position: relative;
  .Select {
    background-color: red;
  }
  .Select-control {
    background-color: #fff;
    border-color: #d9d9d9 #ccc #b3b3b3;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #333;
    cursor: default;
    display: table;
    height: 36px;
    outline: none;
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  .Select-value {
    bottom: 0;
    color: #212529;
    left: 0;
    line-height: 34px;
    padding-left: 10px;
    padding-right: 10px;
    position: absolute;
    right: 0;
    top: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .Select-input {
    height: 34px;
    padding-left: 10px;
    padding-right: 10px;
    vertical-align: middle;
  }
  .Select-clear {
    display: inline-block;
    font-size: 18px;
    line-height: 1;
  }
  .Select-clear-zone {
    color: #999;
    cursor: pointer;
    display: table-cell;
    position: relative;
    text-align: center;
    vertical-align: middle;
    width: 17px;
  }
  .Select-arrow-zone {
    cursor: pointer;
    display: table-cell;
    position: relative;
    text-align: center;
    vertical-align: middle;
    width: 25px;
    padding-right: 5px;
  }
  .Select-arrow {
    border-color: #999 transparent transparent;
    border-style: solid;
    border-width: 5px 5px 2.5px;
    display: inline-block;
    height: 0;
    width: 0;
  }
  input {
    width: 100%;
    background: none transparent;
    border: 0 none;
    box-shadow: none;
    cursor: default;
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    height: 34px;
    margin: 0;
    outline: none;
    padding: 0;
  }
  .Select-placeholder {
    bottom: 0;
    color: #aaa;
    left: 0;
    line-height: 34px;
    padding-left: 10px;
    padding-right: 10px;
    position: absolute;
    right: 0;
    top: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .VirtualSelectGrid {
    z-index: 1;
  }

  .VirtualizedSelectOption {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    margin: 0px 5px;
  }
  .VirtualizedSelectFocusedOption {
    background-color: #deebff;
  }
  .VirtualizedSelectSelectedOption {
    font-weight: bold;
    color: white;
    background-color: #2684ff;
  }
`;

export const ShowOnDesktop = styled.div`
  @media only screen and (${device.mobile}) {
    display: none;
  }
`;

export const ShowOnMobile = styled.div`
  @media only screen and (${device.tablet}) {
    display: none;
  }
`;

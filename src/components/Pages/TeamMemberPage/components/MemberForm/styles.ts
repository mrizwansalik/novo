import { Col, Row } from "reactstrap";
import styled from "styled-components";
import { ThemeColor } from "../../../../../constants";
import InputGroup from "../../../../InputGroup";

export const Container = styled(Row)`
  margin-top: 30px;
  margin-left: 0px;
  margin-right: 0px;

  background-color: ${ThemeColor.WHITE_COLOR};
  border-radius: 3px;
  padding: 12px;
`;

export const FormLayout = styled(Col)``;

export const InputGroupWithStyle = styled(InputGroup)`
  label {
    color: ${ThemeColor.MANATEE};
    font-size: 14px;
    line-height: 16px;
  }

  div {
    padding-top: 8px;
    height: 24px;
    color: ${ThemeColor.CARDINAL};
    font-size: 12px;
    font-weight: 400;
  }

  input {
    outline: none;
    box-shadow: none;
    border-width: 0px;
    border-bottom-width: 1px;
    border-radius: 0;

    &:focus {
      outline: none;
      box-shadow: none;
      border-width: 0px;
      border-bottom-width: 1px;
    }
  }
`;

export const ButtonContainer = styled(Col)`
  display: flex;
  justify-content: center;
  padding-left: 0px;
  padding-right: 0px;
`;

export const BigPlus = styled.div<{ active: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 36px;
  padding-left: 0px;
  padding-right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props?.active ? ThemeColor.SHAMROCK : ThemeColor.SLATE_GRAY};
  color: ${ThemeColor.WHITE_COLOR};
  align-self: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props?.active ? ThemeColor.EUCALYPTUS : ThemeColor.SLATE_GRAY};
    color: ${ThemeColor.WHITE_COLOR};
  }
`;

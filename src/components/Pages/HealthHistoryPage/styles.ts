import { Col } from "reactstrap";
import Button from "src/components/Button";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const SubmitButton = styled(Button)`
  margin: 15px 0;
  height: 38px;
  min-width: 104px;
  padding: 8px 18px;
  border-radius: 3px;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  align-self: center;
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

export const Title = styled.div`
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 24px;
  font-weight: 500;
  line-height: 36px;
  text-align: center;
  margin-bottom: 8px;
`;

export const Description = styled.div`
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 18px;
  font-weight: 300;
  line-height: 27px;
  text-align: center;
  margin-bottom: 8px;
`;

export const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Border = styled.div`
  border-right: 1px solid ${ThemeColor.BORDER_COLOR};
  position: absolute;
  top: 20%;
  height: 60%;
  right: 0;
`;

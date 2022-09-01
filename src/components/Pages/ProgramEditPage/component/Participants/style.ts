import { Row, Col } from "reactstrap";
import styled from "styled-components";

export const StopLossItem = styled(Col)`
  border-right: 1px solid balck;
  box-sizing: border-box;
  border-right: 2px solid rgb(225, 233, 236);
  border-collapse: collapse;
  padding: 0px;
  margin: 0px;
`;
export const StopLossMenu = styled(Col)`
  border-bottom: 1px solid balck;
  box-sizing: border-box;
  border-left: 4px solid #e84c3d;
  padding: 6px;
  border-bottom: 1px solid rgb(225, 233, 236);
`;
export const StopLossMenuItem = styled(Col)`
  border-bottom: 1px solid balck;
  // box-sizing: border-box;
`;

export const StopLossContainer = styled(Row)`
  // width: 100%;
  // text-align: center;
  border: 1px solid #cbcbcb;
  box-sizing: border-box;
  padding: 0px;
`;
export const StopLossMenuHeading = styled(Row)`
  background-color: #f7fdff;
  padding: 2%;
  --bs-gutter-x: 0px;
  width: 100%;
`;
export const ParticipantItemHeading = styled(Row)`
  padding: 2%;
  --bs-gutter-x: 0px;
  width: 100%;
`;
export const StopLossMenuRow = styled(Row)`
  padding: 2%;
  --bs-gutter-x: 0px;
  width: 100%;
  // text-align: center;
`;
export const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: #9797a7;
  margin-bottom: 6px;
`;
export const StyledInput = styled.input`
  width: 100%;
  margin: 15px 0px;
  font-weight: 300;
  padding-bottom: 5px;
  border-top: none;
  border-left: none;
  border-right: none;
  // background-color: ;
  &:focus {
    outline: none;
  }
`;

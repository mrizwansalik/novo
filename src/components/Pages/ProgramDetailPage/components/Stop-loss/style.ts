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
  padding: 4%;
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
  // height: 25%;
  padding: 4%;
  --bs-gutter-x: 0px;
  width: 100%;
`;
export const StopLossMenuRow = styled(Row)`
  // background-color: #f7fdff;

  height: 40px;
  padding-left: 4%;
  --bs-gutter-x: 0px;
  width: 100%;
`;

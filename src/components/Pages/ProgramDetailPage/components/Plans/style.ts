import { Row, Col } from "reactstrap";
import ColNoSpacing from "src/components/ColNoSpacing";
import styled from "styled-components";

export const ArrowSection = styled(ColNoSpacing)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;
export const StopLossItem = styled(Col)`
  box-sizing: border-box;
  border-collapse: collapse;
  padding: 0px;
  margin: 0px;
`;
export const StopLossMenu = styled(Col)<{ isActive?: boolean }>`
  border-bottom: 1px solid balck;
  box-sizing: border-box;
  border-right: ${(props) => (props.isActive ? "2px solid orange;" : "")};
  padding: 4%;
  border-bottom: 1px solid rgb(225, 233, 236);
  cursor: pointer;
  border-collapse: collapse;
`;
export const StopLossMenuItem = styled(Col)`
  border-bottom: 1px solid balck;
  border-collapse: collapse;
`;

export const StopLossContainer = styled(Row)`
  border: 1px solid #cbcbcb;
  box-sizing: border-box;
  // padding: 0px;
  // border-collapse: collapse;
`;
export const StopLossMenuHeading = styled(Row)`
  background-color: #f7fdff;
  // height: 25%;
  padding: 2%;
  --bs-gutter-x: 0px;
  width: 100%;
`;
export const StopLossItemHeading = styled(Row)`
  --bs-gutter-x: 0px;
  width: 100%;
  border-collapse: collapse;
`;
export const StopLossMenuRow = styled(Row)`
  // height: 40px;
  padding: 2%;
  --bs-gutter-x: 0px;
  width: 100%;
  border: 1px solid #cbcbcb;
  box-sizing: border-box;
  border-collapse: collapse;
`;
export const StopLossItemRow = styled(Row)`
  height: 40px;
  padding: 2%;
  --bs-gutter-x: 0px;
  width: 100%;
  border-bottom: 1px solid #cbcbcb;
  border-collapse: collapse;
`;
export const StopLossHeaderItem = styled(Col)`
  border-bottom: 1px solid balck;
  // box-sizing: border-box;
`;
export const StopLossHeaderRow = styled(Row)`
  height: 40px;
  padding: 2%;
  --bs-gutter-x: 0px;
  width: 100%;
`;

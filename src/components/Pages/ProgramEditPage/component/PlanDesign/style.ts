import { Row, Col } from "reactstrap";
import ColNoSpacing from "src/components/ColNoSpacing";
import { ThemeColor } from "src/constants";
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
  border-right: ${(props) =>
    props.isActive ? "4px solid" + ThemeColor.AZURE_RADIANCE : ""};
  padding: 6%;
  border-bottom: 1px solid rgb(225, 233, 236);
  cursor: pointer;
  border-collapse: collapse;
`;
export const StopLossMenuItem = styled(Col)`
  // border-bottom: 1px solid balck;
  // border-collapse: collapse;
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
  padding: 2%;
  --bs-gutter-x: 0px;
  width: 100%;
  border: 1px solid #cbcbcb;
  box-sizing: border-box;

  align-items: baseline !important;
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

export const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: #9797a7;
  margin-bottom: 6px;
`;
export const StyledInput = styled.input`
  width: 100%;
  // margin: 15px 0px;
  font-weight: 300;
  padding-bottom: 5px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #c8c8c8;
  background-color: transparent !important;
  &:focus {
    outline: none;
  }
`;

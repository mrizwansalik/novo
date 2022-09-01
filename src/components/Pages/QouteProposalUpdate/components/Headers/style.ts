import { Col, Row } from "reactstrap";
import styled from "styled-components";

export const ActionSheetContainer = styled(Row)`
  --bs-gutter-x: 0px;
`;

export const ActionSheetLayout = styled(Col)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #fafafa;
  border-radius: 3px;
  padding: 16px 24px;
`;

export const Header = styled.div`
  margin-left: 7%;
  font-size: xx-large;
`;
export const BrokerageCount = styled(Col)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
`;

export const HeaderLabel = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  padding: 2px 12px;
  border-radius: 3px;
  width: Auto;
  height: 35px;
  margin-right: 10px;
`;

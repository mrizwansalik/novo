import { Row, Col } from "reactstrap";
import styled from "styled-components";

export const HeaderContainer = styled(Row)`
  margin-left: 24px;
  margin-right: 24px;
`;

export const HeaderLayout = styled(Col)`
  padding: 15px 0 25px;
  padding-left: 0px;
  padding-right: 0px;
`;

export const HeaderLabel = styled.div`
  width: fit-content;
  cursor: default;
  color: #0097f5;
  border-color: #0097f5;
  border-bottom: 4px solid #0097f5;
  padding-bottom: 15px;
`;

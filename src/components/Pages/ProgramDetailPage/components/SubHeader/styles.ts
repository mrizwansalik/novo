import { Row, Col } from "reactstrap";
import styled from "styled-components";

export const Container = styled(Row)`
  // width: 100%;
  // text-align: center;
  border: 1px solid #cbcbcb;
  box-sizing: border-box;
`;
export const ContainerItem = styled(Col)`
  width: 100%;
  text-align: center;
  border-right: 1px solid balck;
  box-sizing: border-box;
  padding: 1%;
`;
export const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: #9797a7;
  margin-bottom: 6px;
`;

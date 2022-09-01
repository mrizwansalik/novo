import { Row, Col } from "reactstrap";
import styled from "styled-components";

export const Container = styled(Row)`
  border: 1px solid #cbcbcb;
  box-sizing: border-box;
`;
export const ContainerItem = styled(Col)`
  border-right: 1px solid balck;
  box-sizing: border-box;
  padding: 2%;
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

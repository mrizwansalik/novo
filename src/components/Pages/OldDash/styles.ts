import { Container, Row } from "reactstrap";
import styled from "styled-components";

export const StyledContainer = styled(Container)``;

export const TabAction = styled(Row)`
  position: relative;
  margin-bottom: 35px;
`;

export const TabsContainer = styled.div`
  display: flex;
  padding-left: 22px;
  margin-bottom: 25px;
  justify-content: between;
  // border-bottom: 1px solid #cbcbcb;
`;

export const Search = styled.input`
  padding: 6px 12px;
  border-radius: 3px;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  margin-right: 6px;
  vertical-align: middle;
`;

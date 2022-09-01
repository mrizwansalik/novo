import { Row } from "reactstrap";
import styled from "styled-components";

export const Container = styled.div`
  padding-right: 15px;
  margin-bottom: 36px;
`;

export const StyledRow = styled(Row)`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  margin-top: 12px;

  label {
    display: flex;
    align-item: center;
  }
`;

import { Row as BtRow, Col as BtCol } from "reactstrap";
import styled from "styled-components";

export const Container = styled.div``;

export const Row = styled(BtRow)`
  background-color: #f7f7f7;
  margin-left: 0px;
  margin-right: 0px;
`;

export const ColNoSpacing = styled(BtCol)`
  padding-left: 0px;
  padding-right: 0px;
`;

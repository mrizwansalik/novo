import { Row, Col } from "reactstrap";
import styled from "styled-components";

export const Container = styled(Row)`
  margin-left: 0px;
  margin-bottom: 0px;
`;

export const ChartLayout = styled(Col)`
  padding-left: 0px;
  padding-right: 0px;
`;

export const NoteLayout = styled(Row)`
  margin-left: 0px;
  margin-bottom: 0px;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

import { Row, Col } from "reactstrap";
import styled from "styled-components";

export const Container = styled(Row)`
  border: 1px solid #e3e9ec;
  border-radius: 3px;
  background-color: white;
  padding: 16px;
  margin-left: 0px;
  margin-right: 0px;
  height: 100%;
`;

export const OverviewLayout = styled(Col)`
  padding-left: 0px;
  padding-right: 0px;
`;

export const SectionName = styled(Col)`
  font-size: 16px;
  line-height: 24px;
  color: #212135;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const OverviewContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

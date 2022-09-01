import { Col } from "reactstrap";
import styled from "styled-components";
import { ThemeColor } from "../../../../../../../constants";

export const Container = styled.div`
  background-color: white;
  margin-left: 0px;
  margin-right: 0px;
  padding: 16px;
  border: 1px solid ${ThemeColor.MYSTIC};
  border-radius: 3px;
  height: 100%;
`;

export const ChartLayout = styled(Col)`
  padding-left: 0px;
  padding-right: 0px;
`;

export const ChartName = styled(Col)`
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 700;
  margin-bottom: 8px;
`;

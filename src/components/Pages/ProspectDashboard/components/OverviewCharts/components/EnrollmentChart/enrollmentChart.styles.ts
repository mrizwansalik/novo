import { Col } from "reactstrap";
import DonutChart from "src/components/Charts/DonutChart";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  margin-left: 0px;
  margin-right: 0px;
  padding: 16px 16px 24px;
  border: 1px solid ${ThemeColor.MYSTIC};
  border-radius: 3px;
  height: 100%;
`;

export const NoDataText = styled.h3`
  color: #8d959c;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 24px;
  margin-top: 8px;
`;

export const ChartName = styled(Col)`
  font-size: 16px;
  line-height: 24px;
  color: #212135;
  font-weight: 700;
`;

export const DonutChartWrapper = styled(DonutChart)``;

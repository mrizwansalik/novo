import { Col, Row } from "reactstrap";
import emptyGraphImage from "src/assets/images/graph_empty.jpg";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const ColNoSpacing = styled(Col)`
  padding-left: 0px;
  padding-right: 0px;
`;

export const RowNoSpacing = styled(Row)`
  margin-left: 0px;
  margin-right: 0px;
`;

export const ChartSpacing = styled(Col)`
  ${breakpoints("padding-left", [
    {
      xl: "24px",
    },
    {
      lg: "24px",
    },
    {
      md: "12px",
    },
    {
      sm: "12px",
    },
    {
      xs: "12px",
    },
  ])}

  ${breakpoints("padding-right", [
    {
      xl: "24px",
    },
    {
      lg: "24px",
    },
    {
      md: "12px",
    },
    {
      sm: "12px",
    },
    {
      xs: "12px",
    },
  ])}
`;

export const OverviewSpacing = styled(ColNoSpacing)`
  ${breakpoints("padding-left", [
    {
      xl: "24px",
    },
    {
      lg: "24px",
    },
    {
      md: "12px",
    },
    {
      sm: "12px",
    },
    {
      xs: "12px",
    },
  ])}

  ${breakpoints("padding-right", [
    {
      xl: "24px",
    },
    {
      lg: "24px",
    },
    {
      md: "12px",
    },
    {
      sm: "12px",
    },
    {
      xs: "12px",
    },
  ])}
  padding-top: 8px;
`;

export const EmptyGraphContainer = styled(Row)`
  padding: 40px 0px;
  align-items: center;
  justify-content: center;
`;

export const EmptyGraph = styled(Col)`
  background-image: url(${emptyGraphImage});
  background-size: 195px 93px;
  background-repeat: no-repeat;
  height: 93px;
  width: 195px;
`;

export const OverviewLabel = styled.div`
  font-weight: 300;
  margin-bottom: 6px;
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.MANATEE};
  text-align: center;
`;

export const OverviewValue = styled.div`
  font-size: 18px;
  line-height: 27px;
  margin-bottom: 8px;
  color: ${ThemeColor.STEEL_GRAY};
  text-align: center;
`;

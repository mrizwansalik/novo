import { Row, Col } from "reactstrap";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(Row)`
  margin: 0;
  align-items: center;
  position: relative;
`;

export const TitleLayout = styled(Col)`
  padding-left: 0px;
  padding-right: 0px;

  ${breakpoints("padding-top", [
    {
      xs: "8px",
    },
  ])}
`;

export const ChartLayout = styled(Col)`
  padding-left: 0px;
  padding-right: 0px;
`;

export const ChartOverlay = styled.div`
  position: absolute;
  transform: translateX(-50%) translateY(-50%);

  ${breakpoints("top", [
    {
      xs: "30% !important",
    },
    {
      sm: "50%",
    },
    {
      md: "50%",
    },
    {
      lg: "50%",
    },
    {
      xl: "50%",
    },
  ])}

  ${breakpoints("left", [
    {
      xs: "50% !important",
    },
    {
      sm: "75%",
    },
    {
      md: "75%",
    },
    {
      lg: "75%",
    },
    {
      xl: "75%",
    },
  ])}
`;

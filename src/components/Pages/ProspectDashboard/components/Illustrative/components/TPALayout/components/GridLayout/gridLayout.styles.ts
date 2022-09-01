import { Row, Col } from "reactstrap";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(Row)`
  padding-top: 16px;
`;

export const ColNoSpacing = styled(Col)`
  padding-bottom: 25px;

  &:not(:nth-child(3n + 3)) {
    ${breakpoints("padding-left", [
      {
        xl: "12px",
      },
    ])}
    ${breakpoints("padding-right", [
      {
        xl: "12px",
      },
    ])}
  }

  &:not(:nth-child(2n + 2)) {
    ${breakpoints("padding-left", [
      {
        xl: "12px",
      },
    ])}
    ${breakpoints("padding-right", [
      {
        lg: "12px",
      },
    ])}
  }
`;

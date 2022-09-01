import Button from "src/components/Button";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  margin-top: 50px;
  padding-bottom: 50px;
  position: relative;
`;

export const CardLayout = styled(ColNoSpacing)`
  margin-bottom: 32px;
`;

export const NextButton = styled(Button)`
  height: 38px;
  background-color: #0078c2 !important;
  border-color: #0078c2;
  border-radius: 3px;
  color: #fff;
  font-size: 14px;
  line-height: 21px;

  &:focus {
    background-color: #0078c2 !important;
  }

  ${breakpoints("max-width", [
    {
      xl: "166px",
    },
    {
      lg: "166px",
    },
    {
      md: "166px",
    },
    {
      sm: "100%",
    },
    {
      xs: "100%",
    },
  ])}
`;

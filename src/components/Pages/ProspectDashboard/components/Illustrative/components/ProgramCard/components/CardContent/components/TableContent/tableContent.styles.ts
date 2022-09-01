import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const TableContainer = styled(RowNoSpacing)`
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

export const TableRow = styled(ColNoSpacing)`
  &:not(:last-child) {
    margin-bottom: 16px;
  }

  &:last-child {
    margin-bottom: 8px;
  }
`;

export const Divider = styled.hr`
  color: ${ThemeColor.SLATE_GRAY};
`;

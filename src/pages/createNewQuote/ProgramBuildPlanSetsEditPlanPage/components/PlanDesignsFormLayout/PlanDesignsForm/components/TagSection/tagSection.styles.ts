import Button from "src/components/Button";
import ColNoSpacing from "src/components/ColNoSpacing";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const TitleSection = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 48px;
`;

export const TableLabel = styled.div`
  display: flex;

  ${breakpoints("flex-direction", [
    {
      xl: "row",
    },
    {
      lg: "row",
    },
    {
      md: "column",
    },
    {
      sm: "column",
    },
    {
      xs: "column",
    },
  ])}

  & > div:not(:last-child) {
    margin-right: 10px;
  }
`;

export const RemoveButton = styled(Button)`
  height: 38px;
  padding: 8px 18px;
  font-size: 14px;
  line-height: 21px;
  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  background-color: ${ThemeColor.WHITE_COLOR} !important;
  color: ${ThemeColor.AZURE_RADIANCE} !important;

  &:hover {
    background-color: ${ThemeColor.MERCURY} !important;
    color: ${ThemeColor.AZURE_RADIANCE} !important;
    border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  }
`;

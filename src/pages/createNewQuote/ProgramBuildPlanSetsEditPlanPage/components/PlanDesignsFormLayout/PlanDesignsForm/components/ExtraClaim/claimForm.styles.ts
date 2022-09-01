import Button from "src/components/Button";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const OutlineButton = styled(Button)`
  height: 38px;
  padding: 8px 18px;
  font-size: 14px;
  line-height: 21px;
  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  background-color: ${ThemeColor.WHITE_COLOR} !important;
  color: ${ThemeColor.AZURE_RADIANCE} !important;
  margin-bottom: 8px;

  ${breakpoints("width", [
    {
      xl: "fit-content",
    },
    {
      lg: "fit-content",
    },
    {
      md: "fit-content",
    },
    {
      sm: "100%",
    },
    {
      xs: "100%",
    },
  ])}

  &:hover {
    background-color: ${ThemeColor.MERCURY} !important;
    color: ${ThemeColor.AZURE_RADIANCE} !important;
    border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  }
`;

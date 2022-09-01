import Button from "src/components/Button";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const HeaderMenu = styled(RowNoSpacing)`
  margin-bottom: 40px;
`;

export const TitleSection = styled(ColNoSpacing)`
  font-size: 24px;
  line-height: 27px;
  font-weight: 700;

  ${breakpoints("margin-bottom", [
    {
      xl: "0px",
    },
    {
      lg: "0px",
    },
    {
      md: "0px",
    },
    {
      sm: "16px",
    },
    {
      xs: "16px",
    },
  ])}
`;

export const ButtonSection = styled(ColNoSpacing)`
  display: flex;

  ${breakpoints("justify-content", [
    {
      xl: "flex-end",
    },
    {
      lg: "flex-end",
    },
    {
      md: "flex-end",
    },
    {
      sm: "flex-start",
    },
    {
      xs: "flex-start",
    },
  ])}
`;

export const OutlineButton = styled(Button)`
  background-color: ${ThemeColor.WHITE_COLOR} !important;
  border-color: ${ThemeColor.AZURE_RADIANCE};
  border-radius: 3px;
  color: ${ThemeColor.AZURE_RADIANCE};
  font-size: 14px;
  line-height: 21px;
  min-height: 38px;

  &:focus {
    color: ${ThemeColor.AZURE_RADIANCE};
    background-color: ${ThemeColor.SILVER} !important;
    border-color: ${ThemeColor.AZURE_RADIANCE};
  }

  &:hover {
    color: ${ThemeColor.AZURE_RADIANCE};
    background-color: ${ThemeColor.SILVER} !important;
    border-color: ${ThemeColor.AZURE_RADIANCE};
  }
`;

export const WorkerInformation = styled(ColNoSpacing)``;

export const WorkerName = styled.h2`
  font-size: 18px;
  line-height: 27px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${ThemeColor.STEEL_GRAY};
`;

export const WorkerEmail = styled.a`
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: ${ThemeColor.AZURE_RADIANCE};
  text-decoration: none;

  &:hover {
    color: ${ThemeColor.AZURE_RADIANCE};
    text-decoration: underline;
  }
`;

export const WorkerPhone = styled.a`
  font-size: 16px;
  line-height: 22px;
  text-decoration: none;

  font-weight: 500;
  color: ${ThemeColor.RIVER_BED};
  margin-left: 8px;

  &:hover {
    color: ${ThemeColor.RIVER_BED};
  }
`;

export const CommonModalTitle = styled.div`
  font-weight: 300;
`;

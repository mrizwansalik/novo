import Button from "src/components/Button";
import Icon from "src/components/Icon";
import { ColNoSpacing } from "src/components/Pages/ProspectDashboard/prospectDashboard.styles";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  padding: 16px 32px;
  border-bottom: 1px solid ${ThemeColor.SILVER};
`;

export const Title = styled(ColNoSpacing)`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 700;
  margin-bottom: 8px;
`;

export const SubNavigationSection = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${breakpoints("justify-content", [
    {
      xl: "flex-end",
    },
    {
      lg: "flex-end",
    },
    {
      md: "flex-start",
    },
    {
      sm: "flex-start",
    },
    {
      xs: "flex-start",
    },
  ])}
`;

export const LeftArrow = styled(Icon)`
  cursor: pointer;
  margin-right: 12px;
  img {
    width: 18px;
    height: 18px;
    transform: scaleX(-1);
  }
`;

export const RightArrow = styled(Icon)`
  cursor: pointer;
  margin-right: 16px;
  img {
    width: 18px;
    height: 18px;
  }
`;

export const CommonButton = styled(Button)<{ active: boolean }>`
  border-radius: 3px;
  font-size: 14px;
  line-height: 21px;
  color: ${ThemeColor.SILVER_CHALICE} !important;
  border: 1px solid #e3e9ec !important;
  background-color: ${ThemeColor.SILVER} !important;
  cursor: not-allowed !important;

  &:hover {
    background-color: ${(props) =>
      !props?.active
        ? ThemeColor.SILVER
        : ThemeColor.AZURE_RADIANCE} !important;
  }
`;

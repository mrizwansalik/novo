import { DropdownToggle } from "reactstrap";
import Button from "src/components/Button";
import ColNoSpacing from "src/components/ColNoSpacing";
import Icon from "src/components/Icon";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  width: calc(100% - 26px);
`;

export const LeftSide = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
`;

export const RightSide = styled(ColNoSpacing)`
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

  ${breakpoints("margin-top", [
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

export const IconButton = styled(Icon)`
  margin-left: 12px;
  margin-right: 12px;

  img {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
`;

export const CommonButton = styled(Button)`
  height: 38px;
  background-color: ${ThemeColor.FOAM} !important;
  border-color: ${ThemeColor.FOAM} !important;
  color: ${ThemeColor.AZURE_RADIANCE} !important;
  border-radius: 3px;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${ThemeColor.AZURE_RADIANCE};
    background-color: ${ThemeColor.SAIL} !important;
    border-color: ${ThemeColor.SAIL} !important;
  }
`;

export const MediumSpacing = styled.div`
  margin-left: 12px;
`;

export const CommonDropdown = styled(DropdownToggle)`
  height: 38px;
  background-color: ${ThemeColor.FOAM} !important;
  border-color: ${ThemeColor.FOAM} !important;
  color: ${ThemeColor.AZURE_RADIANCE} !important;
  border-radius: 3px;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${ThemeColor.AZURE_RADIANCE};
    background-color: ${ThemeColor.SAIL} !important;
    border-color: ${ThemeColor.SAIL} !important;
  }
`;

export const CommonModalTitle = styled.div`
  font-weight: 300;
`;

export const CommonModalSubTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
`;

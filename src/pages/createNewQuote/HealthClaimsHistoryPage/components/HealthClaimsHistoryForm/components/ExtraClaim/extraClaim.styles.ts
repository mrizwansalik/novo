import { Input } from "reactstrap";
import Button from "src/components/Button";
import ColNoSpacing from "src/components/ColNoSpacing";
import Icon from "src/components/Icon";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)``;

export const ClaimLabel = styled(ColNoSpacing)`
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 700;
  margin-bottom: 24px;
`;

export const ClaimLimit = styled(ColNoSpacing)`
  color: ${ThemeColor.RIVER_BED};
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const Label = styled(ColNoSpacing)<{ noSpacing: boolean }>`
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  margin-bottom: ${(props) => (props.noSpacing ? "0px" : "16px")};
  font-weight: 500;
`;

export const Divider = styled.hr`
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const InputGroup = styled(ColNoSpacing)`
  display: flex;
  margin-bottom: 24px;

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
`;

export const CommonInput = styled(Input)<{ mediumSpacing: boolean }>`
  border-color: transparent;
  border-bottom: 1px solid ${ThemeColor.SILVER} !important;

  border-radius: 0px;
  padding-right: 0px;
  padding-left: 0px;
  margin-bottom: ${(props) => (props?.mediumSpacing ? "16px" : "0px")};

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: transparent;
  }
`;

export const AddButton = styled(Button)`
  min-width: 104px;
  background-color: ${(props) =>
    props.disabled ? ThemeColor.SILVER : ThemeColor.FOAM} !important;
  border-color: ${(props) =>
    props.disabled ? ThemeColor.SILVER : ThemeColor.FOAM} !important;
  color: ${(props) =>
    props.disabled
      ? ThemeColor.SILVER_CHALICE
      : ThemeColor.AZURE_RADIANCE} !important;
  font-size: 14px;
  line-height: 21px;

  &:hover {
    background-color: ${ThemeColor.FOAM} !important;
    color: ${ThemeColor.AZURE_RADIANCE} !important;
    border-color: ${ThemeColor.FOAM};
  }

  ${breakpoints("margin-left", [
    {
      xl: "16px",
    },
    {
      lg: "16px",
    },
    {
      md: "0px",
    },
    {
      sm: "0px",
    },
    {
      xs: "0px",
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
      md: "16px",
    },
    {
      sm: "16px",
    },
    {
      xs: "16px",
    },
  ])}
`;

export const CancelButton = styled(Button)`
  min-width: 104px;
  background-color: ${ThemeColor.WHITE_COLOR} !important;
  border-color: ${ThemeColor.AZURE_RADIANCE};
  color: ${ThemeColor.AZURE_RADIANCE} !important;
  font-size: 14px;
  line-height: 21px;

  &:hover {
    background-color: ${ThemeColor.WHITE_COLOR} !important;
    color: ${ThemeColor.AZURE_RADIANCE} !important;
    border-color: ${ThemeColor.AZURE_RADIANCE};
  }

  ${breakpoints("margin-left", [
    {
      xl: "16px",
    },
    {
      lg: "16px",
    },
    {
      md: "0px",
    },
    {
      sm: "0px",
    },
    {
      xs: "0px",
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
      md: "16px",
    },
    {
      sm: "16px",
    },
    {
      xs: "16px",
    },
  ])}
`;

export const AmountGroup = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: ${ThemeColor.STEEL_GRAY};
  font-size: 16px;
  line-height: 24px;
  margin-top: 16px;
`;

export const RemoveIcon = styled(Icon)`
  img {
    margin-left: 12px;
    width: 24px;
    height: 24px;
  }
`;

export const EditIcon = styled(Icon)`
  img {
    margin-left: 12px;
    width: 24px;
    height: 24px;
  }
`;

export const SaveButton = styled(Button)`
  background-color: ${ThemeColor.LOCH_MARA} !important;
  border-color: ${ThemeColor.LOCH_MARA};
  font-size: 14px;
  line-height: 21px;

  padding-left: 16px;
  padding-right: 16px;

  &:hover {
    border-color: transparent;
    background-color: ${ThemeColor.LOCH_MARA} !important;
  }

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
`;

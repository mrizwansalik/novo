import { Row, Col, Button, Input } from "reactstrap";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";
import { ThemeColor } from "../../../../../../../constants";

export const Container = styled(Row)`
  margin-left: 0px;
  margin-right: 0px;
  align-items: center;
`;

export const Title = styled(Col)`
  padding-left: 10px;
  padding-right: 0px;
  font-size: 18px;
  line-height: 27px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 700;
  margin: 0;

  ${breakpoints("margin-bottom", [
    {
      md: "8px",
    },
  ])}
`;

export const FilterWrapper = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;

  ${breakpoints("padding-left", [
    {
      md: "12px",
    },
  ])}

  ${breakpoints("margin-bottom", [
    {
      md: "8px",
    },
  ])}
`;

export const Filter = styled(RowNoSpacing)`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const FilterBlock = styled(ColNoSpacing)`
  display: flex;
  justify-content: flex-end;
`;

export const Proposals = styled.div`
  color: ${ThemeColor.AZURE_RADIANCE};
  height: 24px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;

  ${breakpoints("width", [
    {
      md: "100%",
    },
  ])}

  ${breakpoints("margin-bottom", [
    {
      md: "8px",
    },
  ])}

  ${breakpoints("margin-right", [
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
`;

export const DownloadButton = styled(Button)`
  width: 100%;
  min-height: 38px;
  min-width: 140px;

  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  color: ${ThemeColor.AZURE_RADIANCE} !important;
  font-weight: lighter;
  font-size: 14px;
  line-height: 21px;

  ${breakpoints("width", [
    {
      md: "100%",
    },
  ])}

  ${breakpoints("margin-bottom", [
    {
      md: "8px",
    },
  ])}

  ${breakpoints("margin-right", [
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

  &:hover {
    background-color: ${ThemeColor.SILVER} !important;
  }
`;

export const SearchGroup = styled.div`
  position: relative;

  ${breakpoints("width", [
    {
      md: "100%",
    },
  ])}

  ${breakpoints("margin-bottom", [
    {
      md: "8px",
    },
  ])}

  ${breakpoints("margin-right", [
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

  div {
    right: 2px;
    top: 4px;
    position: absolute;
  }
`;

export const SearchInput = styled(Input)`
  padding-right: 36px;
  font-weight: lighter;

  ${breakpoints("width", [
    {
      md: "100%",
    },
  ])}

  &:focus {
    outline: 0 none;
    border-color: none;
    box-shadow: none;
    border-color: ${ThemeColor.SILVER};
  }

  &::placeholder {
    font-weight: lighter;
  }
`;

export const UnderwritingButton = styled(Button)`
  min-width: 140px;
  min-height: 38px;
  width: 100%;
  font-size: 14px;
  line-height: 21px;
  font-weight: lighter;
  background-color: ${ThemeColor.AZURE_RADIANCE};
  border-color: ${ThemeColor.AZURE_RADIANCE};

  :disabled {
    color: ${ThemeColor.STEEL_GRAY};
  }

  ${breakpoints("width", [
    {
      md: "100%",
    },
  ])}
`;

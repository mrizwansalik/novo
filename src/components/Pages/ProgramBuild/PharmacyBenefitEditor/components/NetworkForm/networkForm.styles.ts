import { Input } from "reactstrap";
import { ColNoSpacing } from "src/components/Pages/ProspectDashboard/prospectDashboard.styles";
import RowNoSpacing from "src/components/RowNoSpacing";
import SingleSelect from "src/components/SingleSelect";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  ${breakpoints("padding-left", [
    {
      xl: "15px",
    },
    {
      lg: "15px",
    },
    {
      md: "15px",
    },
    {
      sm: "0px",
    },
    {
      xs: "0px",
    },
  ])}

  ${breakpoints("padding-right", [
    {
      xl: "15px",
    },
    {
      lg: "15px",
    },
    {
      md: "15px",
    },
    {
      sm: "0px",
    },
    {
      xs: "0px",
    },
  ])}
`;

export const CommonTitle = styled.div`
  margin-bottom: 16px;
`;

export const CommonInput = styled(Input)<{ underline: boolean }>`
  border-color: transparent;
  border-radius: 0px;
  padding-right: 0px;
  padding-left: 0px;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  border-bottom: ${(props) =>
    props?.underline ? `1px solid ${ThemeColor.SILVER} !important` : "none"};
  &:focus {
    outline: none;
    box-shadow: none;
    border-color: transparent;
  }
`;

export const CommonSelect = styled(SingleSelect)``;

export const NameInput = styled(ColNoSpacing)`
  margin-top: 8px;
  margin-bottom: 25px;
`;

export const LargeSpacing = styled.div`
  margin-bottom: 25px;
`;

export const InputWithSuffix = styled.div`
  border-bottom: 1px solid ${ThemeColor.SILVER} !important;
  padding-right: 16px;
`;

export const RelativeBlock = styled.div`
  position: relative;
`;

export const PercentageSymbol = styled.span`
  position: absolute;
  left: 4px;
  top: 8px;
  color: ${ThemeColor.SLATE_GRAY};
`;

export const InputWithPrefix = styled.div`
  border-bottom: 1px solid ${ThemeColor.SILVER} !important;
  padding-left: 18px;
`;

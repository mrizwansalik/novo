import { Input } from "reactstrap";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const LabelLight = styled.div`
  line-height: 24px;
  font-weight: 300;
  color: ${ThemeColor.TOWER_GRAY};
  font-size: 16px;
  margin-bottom: 8px;
`;

export const PrefixSymbol = styled.span`
  position: absolute;
  left: 4px;
  top: 8px;
  color: ${ThemeColor.SLATE_GRAY};
`;

export const RelativeBlock = styled.div`
  position: relative;
`;

export const InputWithPrefix = styled.div`
  border-bottom: 1px solid ${ThemeColor.SILVER} !important;
  padding-left: 16px;
`;

export const Label = styled.div<{ smallSpacing?: boolean }>`
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 500;
  margin-bottom: ${(props) => (props?.smallSpacing ? "8px" : "16px")};
`;

export const RowSpacing = styled(RowNoSpacing)`
  margin-bottom: 24px;
`;

export const CommonInput = styled(Input)<{ mediumSpacing: boolean }>`
  border-color: transparent;
  border-radius: 0px;
  padding-right: 0px;
  padding-left: 0px;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  margin-bottom: ${(props) => (props?.mediumSpacing ? "16px" : "0px")};

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: transparent;
  }
`;

export const MobileSpacing = styled.div`
  ${breakpoints("margin-bottom", [
    {
      xl: "0px",
    },
    {
      lg: "0px",
    },
    {
      md: "24px",
    },
    {
      sm: "24px",
    },
    {
      xs: "24px",
    },
  ])}
`;

export const PercentageSymbol = styled.span`
  position: absolute;
  right: 4px;
  top: 8px;
  color: ${ThemeColor.SLATE_GRAY};
`;

export const InputWithSuffix = styled.div`
  border-bottom: 1px solid ${ThemeColor.SILVER} !important;
  padding-right: 16px;
`;

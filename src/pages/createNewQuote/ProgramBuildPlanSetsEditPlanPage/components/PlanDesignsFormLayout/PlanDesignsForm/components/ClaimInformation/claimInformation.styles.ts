import { Input } from "reactstrap";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const FormTitle = styled(ColNoSpacing)`
  font-weight: 700;
  color: ${ThemeColor.RIVER_BED};
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 24px;
`;

export const Label = styled.div<{ smallSpacing?: boolean }>`
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 500;
  margin-bottom: ${(props) => (props?.smallSpacing ? "8px" : "16px")};
`;

export const LabelLight = styled.div`
  line-height: 24px;
  font-weight: 300;
  color: ${ThemeColor.TOWER_GRAY};
  font-size: 16px;
  margin-bottom: 8px;
`;

export const RowSpacing = styled(RowNoSpacing)`
  margin-bottom: 24px;
`;

export const Divider = styled.hr`
  margin-top: 36px;
  margin-bottom: 30px;
`;

export const PickerGroup = styled(ColNoSpacing)``;

export const CheckboxGroup = styled.div`
  span {
    font-size: 14px;
    line-height: 16px;
    margin-left: 8px;
    color: ${ThemeColor.STEEL_GRAY};
    font-weight: 300;
  }
`;

export const CommonInput = styled(Input)<{ mediumSpacing: boolean }>`
  border-color: transparent;
  border-bottom: 1px solid ${ThemeColor.SILVER} !important;

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

export const PickerSection = styled(ColNoSpacing)`
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

  & > div {
    ${breakpoints("min-width", [
      {
        xl: "100px",
      },
      {
        lg: "100px",
      },
      {
        md: "100%",
      },
      {
        sm: "100%",
      },
      {
        xs: "100%",
      },
    ])}

    &:not(:last-child) {
      ${breakpoints("margin-right", [
        {
          xl: "24px",
        },
        {
          lg: "24px",
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

      ${breakpoints("margin-bottom", [
        {
          xl: "0px",
        },
        {
          lg: "0px",
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
    }
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

export const AssumedDiscount = styled.div`
  background-color: #e9ecef;
  position: relative;
`;

export const PercentageSymbol = styled.span`
  position: absolute;
  right: 4px;
  top: 8px;
  color: ${ThemeColor.SLATE_GRAY};
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
  margin-left: 16px;
`;

export const InputWithSuffix = styled.div`
  padding-right: 16px;
`;

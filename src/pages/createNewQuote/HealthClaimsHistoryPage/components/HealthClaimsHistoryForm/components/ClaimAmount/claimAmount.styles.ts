import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

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

export const Divider = styled.hr`
  margin-top: 36px;
  margin-bottom: 30px;
`;

export const PickerGroup = styled(ColNoSpacing)``;

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

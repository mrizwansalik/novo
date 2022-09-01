import ColNoSpacing from "src/components/ColNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";
import { breakpoints } from "../../../../../styles/layout";

export const ComponentContainer = styled.div`
  width: 100%;
  min-height: 138px;
  background-color: #f5f5f5;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: left;

  padding-top: 22px;
  padding-bottom: 22px;

  ${breakpoints("padding-left", [
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

  ${breakpoints("padding-right", [
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

  ${breakpoints("justify-content", [
    {
      xl: "center",
    },
    {
      lg: "center",
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

  > div {
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 80%;

    > div {
      justify-content: space-between;
    }

    div {
      align-items: center;
    }
  }
`;

export const Layout = styled(ColNoSpacing)`
  max-width: 1150px;
`;

export const Title = styled.h1`
  font-size: 24px;
  line-height: 36px;
  margin-bottom: 8px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 700;
`;

export const Description = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 500;
  margin-bottom: 8px;

  span {
    font-weight: bold;
  }
`;

export const SwitchPlanButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 4px;
  margin-right: 4px;

  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  cursor: pointer;

  img {
    margin-left: 8px;
    width: 20px;
    height: 20px;
  }
`;

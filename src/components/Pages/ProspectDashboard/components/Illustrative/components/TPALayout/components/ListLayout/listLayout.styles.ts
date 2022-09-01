import { Row, Col } from "reactstrap";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(Row)`
  margin-left: 0px;
  margin-right: 0px;
  padding-top: 16px;
  width: 100%;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px ${ThemeColor.SLATE_GRAY};
    background-color: ${ThemeColor.TWILIGHT_BLUE};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${ThemeColor.AZURE_RADIANCE};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${ThemeColor.AZURE_RADIANCE};
  }
`;

export const ScrollWrapper = styled.div`
  display: flex;
  padding-left: 0px;
  padding-right: 0px;
`;

export const ColNoSpacing = styled(Col)`
  padding-left: 0px;
  padding-bottom: 25px;

  &:not(:last-child) {
    ${breakpoints("margin-right", [
      {
        xl: "24px",
      },
      {
        lg: "24px",
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
  }
`;

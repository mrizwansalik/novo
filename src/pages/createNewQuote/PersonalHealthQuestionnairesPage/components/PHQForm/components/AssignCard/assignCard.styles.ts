import Button from "src/components/Button";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(ColNoSpacing)``;

export const CardLayout = styled(RowNoSpacing)`
  padding: 24px;
  border: 1px solid ${ThemeColor.SILVER};
`;

export const Title = styled(ColNoSpacing)`
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 700;
  margin-bottom: 16px;
`;

export const CommonButton = styled(Button)`
  font-size: 14px;
  line-height: 21px;
  background-color: ${ThemeColor.WHITE_COLOR} !important;
  color: ${ThemeColor.AZURE_RADIANCE} !important;
  border-color: ${ThemeColor.AZURE_RADIANCE};

  &:hover {
    border-color: ${ThemeColor.AZURE_RADIANCE};
    background-color: ${ThemeColor.SILVER} !important;
    color: ${ThemeColor.AZURE_RADIANCE};
  }

  ${breakpoints("max-width", [
    {
      xl: "160px",
    },
    {
      lg: "160px",
    },
    {
      md: "160px",
    },
    {
      sm: "100%",
    },
    {
      xs: "100%",
    },
  ])}
`;

export const DescriptionSection = styled(ColNoSpacing)`
  a:not(:last-child) {
    margin-right: 4px;
  }
`;

export const RefLinkTitle = styled.div`
  div {
    font-size: 16px;
    line-height: 24px;
    color: ${ThemeColor.RIVER_BED};
    font-weight: 500;
    margin-bottom: 16px;
  }
`;

export const DeleteModalTitle = styled.div`
  span {
    font-weight: bold;
  }
`;

export const LabelWithIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${breakpoints("width", [
    {
      xl: "40%",
    },
    {
      lg: "40%",
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

  div {
    margin-bottom: 0px;
    img {
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }
`;

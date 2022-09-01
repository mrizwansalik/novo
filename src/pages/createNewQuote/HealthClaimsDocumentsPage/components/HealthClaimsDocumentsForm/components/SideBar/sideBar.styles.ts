import { Progress } from "reactstrap";
import Button from "src/components/Button";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import { breakpoints } from "src/styles/layout";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  ${breakpoints("margin-top", [
    {
      xl: "45px",
    },
    {
      lg: "45px",
    },
    {
      md: "20px",
    },
    {
      sm: "20px",
    },
    {
      xs: "20px",
    },
  ])}
`;

export const NextButton = styled(ColNoSpacing)`
  button {
    background-color: ${ThemeColor.AZURE_RADIANCE} !important;
    border: 1px solid ${ThemeColor.AZURE_RADIANCE};
    border-radius: 3px;
    color: ${ThemeColor.WHITE_COLOR};
    font-size: 14px;
    line-height: 21px;
    font-weight: 300;

    &:hover {
      background-color: ${ThemeColor.DENIM} !important;
      border-color: transparent;
    }

    &:focus {
      outline: none;
      box-shadow: none;
      border-color: transparent;
    }

    ${breakpoints("min-width", [
      {
        xl: "166px",
      },
      {
        lg: "166px",
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
  }
`;

export const UploadButton = styled(ColNoSpacing)``;

export const ProgressSection = styled(ColNoSpacing)``;

export const ProcessBar = styled(Progress)`
  height: 8px;
`;

export const ProgressInformation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
`;

export const ProgressButton = styled(Button)`
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${ThemeColor.TOWER_GRAY} !important;
  font-weight: 500;
  background-color: ${ThemeColor.BLACK_SQUEEZE} !important;
  border-width: 0px;

  &:hover {
    color: ${ThemeColor.TOWER_GRAY} !important;
    box-shadow: none;
  }

  &:focus {
    outline: none;
    box-shadow: none !important;
  }
`;

export const ChecklistButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 22px;
    height: 22px;
  }

  span {
    color: ${ThemeColor.TOWER_GRAY};
    font-size: 16px;
    line-height: 24px;
  }
`;

export const DocumentChecklist = styled(ColNoSpacing)`
  margin-top: 24px;
  margin-bottom: 24px;

  font-weight: 700;
  color: ${ThemeColor.RIVER_BED};
  font-size: 18px;
  line-height: 24px;
`;

export const ButtonWithIcon = styled(ColNoSpacing)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  font-weight: 700;

  padding: 8px;
  padding-left: 0px;
  margin-top: 25px;
  border-radius: 3px;
  background-color: ${ThemeColor.WHITE_COLOR};
  color: ${ThemeColor.AZURE_RADIANCE};
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

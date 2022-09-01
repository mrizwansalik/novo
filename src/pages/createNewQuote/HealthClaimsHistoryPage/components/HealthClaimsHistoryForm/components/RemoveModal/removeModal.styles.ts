import Button from "src/components/Button";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  padding: 24px;
`;

export const Header = styled(ColNoSpacing)`
  display: flex;
  justify-content: flex-end;

  img {
    cursor: pointer;
    margin-bottom: 16px;
    width: 24px;
    height: 24px;
  }
`;

export const Content = styled(ColNoSpacing)`
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const Footer = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AcceptButton = styled(Button)`
  color: ${ThemeColor.WHITE_COLOR};
  font-size: 14px;
  line-height: 21px;
  width: 48%;

  cursor: pointer;
  background-color: ${ThemeColor.AZURE_RADIANCE} !important;
  border: 1px solid ${ThemeColor.AZURE_RADIANCE};

  &:hover {
    color: ${ThemeColor.WHITE_COLOR} !important;
    background-color: ${ThemeColor.AZURE_RADIANCE} !important;
    border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  }
`;

export const CancelButton = styled(Button)`
  font-size: 14px;
  line-height: 21px;
  width: 48%;
  font-weight: 500;

  border: 1px solid ${ThemeColor.MERCURY};
  background-color: ${ThemeColor.WHITE_COLOR} !important;
  color: ${ThemeColor.SLATE_GRAY} !important;

  &:hover {
    background-color: ${ThemeColor.MERCURY} !important;
    color: ${ThemeColor.SLATE_GRAY} !important;
    border: 1px solid ${ThemeColor.MERCURY};
  }
`;

import Button from "src/components/Button";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
`;

export const ButtonWrapper = styled(ColNoSpacing)`
  display: flex;
  justify-content: flex-end;
`;

export const TextButton = styled(Button)`
  color: ${ThemeColor.AZURE_RADIANCE};
  background-color: transparent;
  border-width: 0;
  font-size: 16px;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
    background-color: transparent;
    color: ${ThemeColor.AZURE_RADIANCE};
  }
`;

export const CommonButton = styled(Button)`
  margin-left: 8px;
  font-size: 14px;
  line-height: 21px;
  padding: 8px 18px;

  opacity: 1 !important;
  pointer-events: all;

  background-color: ${(props) =>
    props.disabled ? ThemeColor.SILVER : ThemeColor.AZURE_RADIANCE} !important;
  border-color: ${(props) =>
    props.disabled ? ThemeColor.SILVER : ThemeColor.AZURE_RADIANCE} !important;
  color: ${(props) =>
    props?.disabled
      ? ThemeColor.SILVER_CHALICE
      : ThemeColor.WHITE_COLOR} !important;

  &:hover {
    background-color: ${ThemeColor.AZURE_RADIANCE} !important;
    color: ${(props) =>
      props?.disabled
        ? ThemeColor.SILVER_CHALICE
        : ThemeColor.WHITE_COLOR} !important;
    border-color: ${ThemeColor.AZURE_RADIANCE};
    cursor: ${(props) => (props?.disabled ? "not-allowed" : "pointer")};
  }
`;

import { Button, Input } from "reactstrap";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  padding-left: 20px;
  padding-right: 20px;
`;

export const AmountGroup = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: ${ThemeColor.STEEL_GRAY};
  font-size: 16px;
  line-height: 24px;
`;

export const CommonInput = styled(Input)<{ mediumSpacing: boolean }>`
  border-color: transparent;
  border-bottom: 1px solid ${ThemeColor.SILVER} !important;

  border-radius: 0px;
  padding-right: 0px;
  padding-left: 0px;
  margin-bottom: ${(props) => (props?.mediumSpacing ? "16px" : "0px")};

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: transparent;
  }
`;

export const SaveButton = styled(Button)`
  margin-left: 8px;
  min-width: 166px;
  font-size: 14px;
  line-height: 21px;

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

export const CommonLabel = styled.div`
  font-weight: 700;
  color: #4b565e;
  font-size: 18px;
  line-height: 24px;
  padding-left: 0px;
  padding-right: 0px;
  margin-top: 44px;
  margin-bottom: 25px;
`;

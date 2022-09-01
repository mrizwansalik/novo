import { Button, Input } from "reactstrap";
import ColNoSpacing from "src/components/ColNoSpacing";
import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Label = styled(ColNoSpacing)<{ noSpacing: boolean }>`
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  margin-bottom: ${(props) => (props.noSpacing ? "0px" : "16px")};
  font-weight: 500;
`;

export const Divider = styled.hr`
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const AmountGroup = styled(ColNoSpacing)`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: ${ThemeColor.STEEL_GRAY};
  font-size: 16px;
  line-height: 24px;
  margin-top: 16px;
`;

export const RemoveIcon = styled(Icon)`
  img {
    cursor: pointer;
    margin-left: 12px;
    width: 24px;
    height: 24px;
  }
`;

export const EditIcon = styled(Icon)`
  img {
    cursor: pointer;
    margin-left: 12px;
    width: 24px;
    height: 24px;
  }
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
  min-width: 104px;
  background-color: ${(props) =>
    props.disabled ? ThemeColor.SILVER : ThemeColor.FOAM} !important;
  border-color: ${(props) =>
    props.disabled ? ThemeColor.SILVER : ThemeColor.FOAM} !important;
  color: ${(props) =>
    props.disabled
      ? ThemeColor.SILVER_CHALICE
      : ThemeColor.AZURE_RADIANCE} !important;
  font-size: 14px;
  line-height: 21px;

  &:hover {
    background-color: ${ThemeColor.FOAM} !important;
    color: ${ThemeColor.AZURE_RADIANCE} !important;
    border-color: ${ThemeColor.FOAM};
  }
`;

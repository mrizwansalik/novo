import Button from "src/components/Button";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  border: 1px solid #e3e9ec;
  border-bottom: 3px solid ${ThemeColor.AZURE_RADIANCE};
  background-color: #f7f7f7;
  padding: 20px;

  justify-content: center;
  text-align: center;
`;

export const Label = styled(ColNoSpacing)`
  padding-bottom: 18px;

  font-size: 18px;
  line-height: 27px;
  color: #212135;
  font-weight: 700;
`;

export const Description = styled(ColNoSpacing)`
  padding-bottom: 20px;

  font-weight: 300;
  color: #4b565e;
  font-size: 18px;
  line-height: 24px;
`;

export const OutlineButton = styled(Button)`
  height: 38px;
  padding: 8px 18px;
  font-size: 14px;
  line-height: 21px;

  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  background-color: ${ThemeColor.WHITE_COLOR} !important;
  color: ${ThemeColor.AZURE_RADIANCE} !important;

  width: min-content;
  min-width: 166px;

  &:hover {
    background-color: ${ThemeColor.MERCURY} !important;
    color: ${ThemeColor.AZURE_RADIANCE} !important;
    border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  }
`;

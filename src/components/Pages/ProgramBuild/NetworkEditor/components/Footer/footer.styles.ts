import { Button } from "reactstrap";
import ColNoSpacing from "src/components/ColNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(ColNoSpacing)`
  display: flex;
  justify-content: flex-end;
  padding-left: 15px;
  padding-right: 15px;
`;

export const OutlineButton = styled(Button)`
  height: 38px;
  padding: 8px 18px;
  font-size: 14px;
  line-height: 21px;
  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  background-color: ${ThemeColor.WHITE_COLOR} !important;
  color: ${ThemeColor.AZURE_RADIANCE} !important;

  &:hover {
    background-color: ${ThemeColor.MERCURY} !important;
    color: ${ThemeColor.AZURE_RADIANCE} !important;
    border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  }
`;

export const SubmitButton = styled(Button)<{ disabled: boolean }>`
  height: 38px;
  padding: 8px 18px;
  font-size: 14px;
  line-height: 21px;
  border: 0px solid ${ThemeColor.WHITE_COLOR};
  background-color: ${(props) =>
    props?.disabled ? ThemeColor.SILVER : ThemeColor.AZURE_RADIANCE} !important;
  color: ${ThemeColor.WHITE_COLOR} !important;

  &:hover {
    background-color: ${ThemeColor.LOCH_MARA} !important;
    color: ${ThemeColor.WHITE_COLOR} !important;
    border: 0px solid ${ThemeColor.WHITE_COLOR};
  }
`;

export const CancelButtonWrapper = styled.div`
  margin-right: 24px;

  button {
    min-width: 104px;
  }
`;

export const SaveButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    min-width: 104px;
  }
`;

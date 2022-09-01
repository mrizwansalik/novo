import { Button } from "reactstrap";
import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  text-align: center;
  justify-content: space-around;
`;

export const Description = styled(ColNoSpacing)`
  font-size: 18px;
  line-height: 27px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 300;
  margin-bottom: 8px;
`;

export const ButtonLayout = styled.div`
  margin-top: 16px;
`;

export const SelectButton = styled(Button)`
  width: fit-content;
  padding: 8px 18px;
  border-radius: 3px;
  background-color: ${ThemeColor.AZURE_RADIANCE} !important;
  border: 1px solid ${ThemeColor.AZURE_RADIANCE};
  color: ${ThemeColor.WHITE_COLOR};
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  cursor: pointer;
`;

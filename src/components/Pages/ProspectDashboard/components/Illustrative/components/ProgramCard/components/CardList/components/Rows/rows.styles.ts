import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  padding-left: 0px;
  padding-right: 0px;
`;

export const Label = styled(ColNoSpacing)`
  margin-top: 16px;
  margin-bottom: 16px;
  color: ${ThemeColor.STEEL_GRAY};
  font-size: 16px;
  line-height: 24px;
  font-weight: 300;
`;

export const Divider = styled.div`
  padding-left: 0px;
  padding-right: 0px;

  hr {
    margin-top: 0px;
    margin-bottom: 0px;
    color: ${ThemeColor.SLATE_GRAY};
  }
`;

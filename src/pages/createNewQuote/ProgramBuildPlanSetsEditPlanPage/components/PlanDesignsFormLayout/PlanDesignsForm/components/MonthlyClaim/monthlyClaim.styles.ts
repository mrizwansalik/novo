import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  margin-bottom: 24px;
`;

export const ClaimLabel = styled(ColNoSpacing)`
  font-size: 16px;
  line-height: 24px;
  color: ${ThemeColor.STEEL_GRAY};
  font-weight: 700;
  margin-bottom: 24px;
`;

export const Divider = styled.hr`
  margin-top: 30px;
  margin-bottom: 0px;
`;

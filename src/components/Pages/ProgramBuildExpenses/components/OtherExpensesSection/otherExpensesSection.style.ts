import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  border-left: 1px solid ${ThemeColor.SILVER};
  padding-bottom: 30px;
`;

import ColNoSpacing from "src/components/ColNoSpacing";
import RowNoSpacing from "src/components/RowNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(RowNoSpacing)`
  padding: 0 14px;
`;

export const Layout = styled(ColNoSpacing)`
  padding-left: 4px;
  padding-right: 4px;
`;

export const ArrowSection = styled(ColNoSpacing)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 12px;
  padding-right: 12px;
`;

export const DividerNoSpacing = styled.div`
  hr {
    margin-top: 8px;
    margin-bottom: 8px;
    color: ${ThemeColor.MANATEE};
    width: 100%;
  }
`;

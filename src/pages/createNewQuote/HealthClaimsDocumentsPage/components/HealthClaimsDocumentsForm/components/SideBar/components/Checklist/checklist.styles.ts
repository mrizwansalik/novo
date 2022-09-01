import ColNoSpacing from "src/components/ColNoSpacing";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled(ColNoSpacing)`
  margin-bottom: 24px;
`;

export const ChecklistLabel = styled.div`
  font-weight: 700;
  color: ${ThemeColor.RIVER_BED};
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 16px;
`;

export const ChecklistContent = styled.div``;

export const Content = styled.div<{ isActive?: boolean }>`
  color: ${(props) =>
    props.isActive ? ThemeColor.BLACK_COLOR : ThemeColor.TOWER_GRAY};
  font-size: 16px;
  font-weight: 500;

  display: flex;
  flex-direction: row;

  img {
    width: 16px;
    height: 16px;
    margin-left: 8px;
  }
`;

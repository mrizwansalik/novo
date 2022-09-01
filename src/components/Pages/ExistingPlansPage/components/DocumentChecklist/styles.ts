import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

interface IChecklistName {
  active?: boolean;
}
export const Container = styled.div`
  margin-top: 24px;
`;

export const ChecklistContainer = styled.div``;

export const ChecklistTitle = styled.div`
  color: ${ThemeColor.RIVER_BED};
  font-size: 18px;
  font-weight: 700px;
  line-height: 24px;
`;

export const ChecklistType = styled.div`
  color: #61707a;
  margin: 24px 0px 15px 0px;
  font-weight: 700;
`;

export const ChecklistItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ChecklistName = styled.div<IChecklistName>`
  margin-bottom: 8px;
  color: ${(props) => (props.active ? "#000000" : "#AEB8C0")};
  font-weight: 500;
  line-height: 18px;
`;

export const CheckIcon = styled(Icon)``;

import { Col, Row } from "reactstrap";
import styled from "styled-components";
import { ThemeColor } from "../../../../../constants/index";
import Icon from "../../../../Icon";

export const ActionSheetContainer = styled(Row)`
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const ActionSheetLayout = styled(Col)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${ThemeColor.MYSTIC};
  border-radius: 3px;
  padding: 15px;
`;

export const AddButton = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  border: 1px solid ${ThemeColor.MYSTIC};
  align-items: center;
  padding: 2px 12px;
  background-color: ${ThemeColor.WHITE_COLOR};
  border-radius: 3px;
  width: fit-content;
  margin-left: 10px;

  &:hover {
    background-color: ${ThemeColor.MYSTIC};
    border: 1px solid ${ThemeColor.WHITE_COLOR};
  }
`;

export const AddLabel = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: ${ThemeColor.SLATE_GRAY};
`;

export const AddIcon = styled(Icon)`
  width: fit-content;
  margin-right: 6px;

  img {
    width: 12px;
    height: 12px;
  }
`;

export const CarrierCount = styled(Col)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
`;

export const CarrierSearch = styled(Col)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
  margin-left: 5px;
`;

export const TpaFilter = styled(Col)`
  font-size: 12px;
  line-height: 15px;
  font-weight: 200;
  width: 80%;
`;

export const InputSearch = styled.input`
  // font-size: 14px;
  // line-height: 22px;
  // font-weight: 300;
  // width: 80%;

  background-color: hsl(0, 0%, 100%);
  border-color: hsl(0, 0%, 80%);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  font-size: 14px;
  line-height: 31px;
  font-weight: 300;
  width: 80%;
  margin-left: -14px;
  border-radius: 4px;
  padding: 4px;
`;

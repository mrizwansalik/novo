import { Row, Col } from "reactstrap";
import styled from "styled-components";
import Icon from "../../../../../components/Icon";
import { ThemeColor } from "../../../../../constants";

export const RowLayout = styled(Row)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 15px;
  padding-bottom: 15px;

  &:not(:last-child) {
    border-bottom: 1px solid ${ThemeColor.ALTO};
  }
`;

export const UserInformation = styled(Col)`
  padding-left: 0px;
  padding-right: 0px;
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 20px;
  font-weight: 300;
  color: ${ThemeColor.STEEL_GRAY};
`;

export const IconSection = styled(Col)`
  padding-left: 0px;
  padding-right: 0px;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const CloseIcon = styled(Icon)`
  width: fit-content;
  cursor: pointer;
  margin-left: 8px;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const InviteButton = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  border: 1px solid ${ThemeColor.MYSTIC};
  align-items: center;
  padding: 2px 12px;
  background-color: ${ThemeColor.WHITE_COLOR};
  border-radius: 3px;

  &:hover {
    background-color: ${ThemeColor.MYSTIC};
    border: 1px solid ${ThemeColor.WHITE_COLOR};
  }
`;

export const InviteLabel = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: ${ThemeColor.SLATE_GRAY};
`;

export const InviteIcon = styled(Icon)`
  width: fit-content;
  margin-right: 6px;

  img {
    width: 16px;
    height: 16px;
  }
`;

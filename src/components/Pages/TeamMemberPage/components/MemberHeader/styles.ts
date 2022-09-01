import { Col, Row } from "reactstrap";
import styled from "styled-components";
import { ThemeColor } from "../../../../../constants";
import Icon from "../../../../Icon";

export const Container = styled.div`
  margin-top: 60px;
`;

export const HeaderLayout = styled.div`
  padding-left: 12px;
  padding-right: 12px;
`;

export const HeaderLabel = styled.div`
  font-size: 44px;
  line-height: 48px;
  font-weight: 300;
`;

export const InviteContainer = styled(Row)`
  padding-right: 24px;
  padding-left: 24px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const InviteLayout = styled(Col)`
  display: flex;
  justify-content: flex-end;
  background-color: ${ThemeColor.MYSTIC};
  border-radius: 3px;
  padding: 6px;
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
  width: fit-content;

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

import { Button } from "reactstrap";
import styled from "styled-components";
import { ThemeColor } from "../../constants";

export const Container = styled.div`
  padding: 70px 60px;
`;

export const Title = styled.div`
  font-size: 24px;
  line-height: 32px;
  color: ${ThemeColor.SLATE_GRAY};
  margin-bottom: 15px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const Footer = styled.div``;

export const AcceptButton = styled(Button)`
  color: ${ThemeColor.SLATE_GRAY};
  background-color: ${ThemeColor.WHITE_COLOR};
  border: 1px solid ${ThemeColor.MYSTIC};
  margin-right: 16px;

  &:hover {
    color: ${ThemeColor.SLATE_GRAY};
    background-color: ${ThemeColor.MYSTIC};
    border: 1px solid ${ThemeColor.MYSTIC};
  }
`;

export const RejectButton = styled(Button)`
  color: ${ThemeColor.SLATE_GRAY};
  background-color: ${ThemeColor.WHITE_COLOR};
  border: 1px solid ${ThemeColor.MYSTIC};

  &:hover {
    color: ${ThemeColor.SLATE_GRAY};
    background-color: ${ThemeColor.MYSTIC};
    border: 1px solid ${ThemeColor.MYSTIC};
  }
`;

import { Col } from "reactstrap";
import styled from "styled-components";
import { ThemeColor } from "../../../../../constants/index";

export const Container = styled(Col)``;

export const MainContent = styled.div`
  padding: 16px;
  box-sizing: border-box;
  outline-color: #212135;
  box-shadow: #0000004d 0px 1px 3px 0px;
  border-radius: 5px;
  background-color: ${ThemeColor.WHITE_COLOR};
  display: flex;
  min-height: 76px;
  margin-bottom: 15px;
`;

export const BrokerageThumbnail = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background-color: ${ThemeColor.BRIGHT_TURQUOISE};
  font-size: 48px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  line-height: 78px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-right: 12px;
`;

export const BrokerageDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const BrokerageName = styled.div`
  color: #212135;
  font-size: 16px;
  line-height: 18px;
  font-weight: 500;
`;

export const BrokerageLinkContainer = styled.ul`
  padding: 0;
  margin: 0;
  color: #9797a7;
  font-size: 12px;
  font-weight: 300;
  line-height: 16px;
`;

export const BrokerageLink = styled.li`
  display: inline;
  margin-right: 5px;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

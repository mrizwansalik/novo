import { Collapse } from "reactstrap";
import Icon from "src/components/Icon";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Container = styled.div<{ active: boolean }>`
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${ThemeColor.SILVER};
  background-color: ${(props) =>
    props?.active ? ThemeColor.TWILIGHT_BLUE : ThemeColor.WHITE_COLOR};
  border-right: ${(props) =>
    props.active ? `4px solid ${ThemeColor.AZURE_RADIANCE}` : "none"};
`;

export const LabelSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 20px;
  width: 100%;
`;

export const TitleText = styled.div`
  width: 100%;
  font-size: 17px;
  color: ${ThemeColor.SLATE_GRAY};
  font-weight: bold;
  margin-left: 11px;
  cursor: pointer;
`;

export const IconSection = styled.div`
  width: 60px;
  min-width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ArrowIcon = styled(Icon)`
  img {
    cursor: pointer;
    width: 15px;
    height: 15px;
  }
`;

export const CollapseSection = styled(Collapse)`
  margin-left: 50px;
`;

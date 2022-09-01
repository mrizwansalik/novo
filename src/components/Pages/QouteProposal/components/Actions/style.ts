import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import styled from "styled-components";
import { ThemeColor } from "../../../../../constants/index";
import Icon from "../../../../Icon";

export const ActionSheetContainer = styled(Row)`
  --bs-gutter-x: 0px;
`;

export const ActionSheetLayout = styled(Col)`
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  padding: 24px;
  // margin-bottom: 50px;
`;
export const Header = styled.div`
  margin-left: 7%;
  font-size: x-large;
  // padding: 16px 0px;
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

export const BrokerageCount = styled(Col)`
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
`;
export const HeaderContainer = styled(Row)`
  margin-left: 24px;
  margin-right: 24px;
`;

export const HeaderLayout = styled(Col)`
  padding: 15px 0 25px;
  padding-left: 0px;
  padding-right: 0px;
  display: flex;
  flex-wrap: wrap;
`;

export const HeaderLabel = styled.div`
  width: fit-content;
  cursor: default;
  color: #0097f5;
  border-color: #0097f5;
  border-bottom: 4px solid #0097f5;
  padding-bottom: 15px;
`;

export const TabItem = styled(Link)<{ isActive?: boolean }>`
  width: auto;
  padding: 15px 0 11px 0;
  margin-right: 24px;
  border-bottom: 4px solid;
  border-color: ${(props) =>
    props.isActive ? ThemeColor.AZURE_RADIANCE : "transparent"};
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: ${(props) =>
    props.isActive ? ThemeColor.AZURE_RADIANCE : ThemeColor.SLATE_GRAY};
  cursor: pointer;
  text-decoration: none;

  :hover {
    color: ${(props) =>
      props.isActive ? ThemeColor.AZURE_RADIANCE : ThemeColor.SLATE_GRAY};
  }
`;

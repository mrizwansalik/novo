import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

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

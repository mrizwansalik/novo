import { Link } from "react-router-dom";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Title = styled.div`
  display: flex;
  align-items: center;
  min-height: 69px;
  margin-bottom: 0;
  padding: 22px;
  background-color: ${ThemeColor.WILD_SAND};

  h1 {
    font-size: 24px;
    line-height: 27px;
    color: #212135;
    font-weight: 700;
    margin: 0;
  }

  a {
    margin: 0;
    margin-left: 12px;
    color: #212135;
    cursor: pointer;
    font-weight: 300;
    font-size: 14px;

    :hover {
      text-decoration: underline !important;
    }
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  padding-left: 22px;
  margin-bottom: 25px;
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

export const ContentContainer = styled.div`
  padding: 22px;
`;

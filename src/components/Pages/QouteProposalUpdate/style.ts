import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const TabItem = styled.div<{ isActive?: boolean }>`
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
  text-align: center;
  box-sizing: border-box;

  :hover {
    color: ${(props) =>
      props.isActive ? ThemeColor.AZURE_RADIANCE : ThemeColor.SLATE_GRAY};
  }
`;
export const TabsContainer = styled.div`
  display: flex;
  margin-left: 8%;
`;

export const MainContainer = styled.div`
  border-bottom: 1px solid #cbcbcb;
  display: flex;
  justify-content: space-between;
`;

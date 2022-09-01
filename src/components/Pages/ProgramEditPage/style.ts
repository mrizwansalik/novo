import { Container, Row, Col } from "reactstrap";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const Header = styled.h5`
  margin: 0px -14px;
  padding: 16px 0px;
`;

export const StyledInput = styled.input`
  width: 100%;
  margin: 15px 0px;
`;

export const SubHeaderContainer = styled.div`
  // width: 100%;
`;
export const MainContainer = styled(Container)`
  // width: 100%;
`;

export const ProgramDetailContainer = styled.div`
  padding-bottom: 25px;
  // padding-right: 25px;
`;
export const TabItem = styled(Col)<{ isActive?: boolean }>`
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

  width: 100%;
  text-align: center;
  box-sizing: border-box;

  :hover {
    color: ${(props) =>
      props.isActive ? ThemeColor.AZURE_RADIANCE : ThemeColor.SLATE_GRAY};
  }
`;
export const TabsContainer = styled.div`
  display: flex;
  padding-left: 22px;
  margin-bottom: 25px;
  border-bottom: 1px solid #cbcbcb;
`;
export const Containers = styled(Row)`
  // width: 100%;
  // text-align: center;
  border: 1px solid #cbcbcb;
  box-sizing: border-box;
`;
export const ContainerItem = styled(Col)`
  width: 100%;
  text-align: center;
  border-right: 1px solid balck;
  box-sizing: border-box;
`;

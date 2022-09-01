import { Row, Col } from "reactstrap";
import styled from "styled-components";

export const Container = styled(Row)`
  margin-left: 0px;
  margin-right: 0px;
  background-color: white;
`;

export const Layout = styled(Col)`
  padding: 24px;
  padding-left: 0px;
  padding-right: 0px;
  margin: auto;
  max-width: 1357px;
`;

export const NoProgramWrapper = styled.div`
  padding: 0 10px;

  h3 {
    color: #8d959c;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 24px;
    margin-top: 8px;
  }

  img {
    width: 222px;
    height: 245px;
  }
`;

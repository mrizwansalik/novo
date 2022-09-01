import { Row } from "reactstrap";
import { Container } from "reactstrap";
import styled from "styled-components";

export const Containers = styled(Container)`
  padding-left: 24px;
  padding-right: 24px;
  background-color: white;
`;
export const MainContainer = styled(Container)`
  padding-left: 24px;
  padding-right: 24px;
`;

export const Title = styled.h3`
  padding-left: 1rem;
  padding-top: 2rem;
`;
export const SubTitle = styled(Row)`
  padding-left: 2rem;
  h4: {
    padding-left: 1rem;
  }
`;

import { Container } from "reactstrap";
import Button from "src/components/Button";
import styled from "styled-components";

export const Header = styled.h1`
  margin: 40px 0px 15px 0px;
  font-size: 44px;
  line-height: 54px;
  font-weight: 300;
`;

export const StyledInput = styled.input`
  width: 100%;
  margin: 15px 0px;
`;

export const WiderButton = styled(Button)`
  width: 100%;
  padding: 0 15px;
  text-align: center;
`;

export const CarrierContainer = styled(Container)`
  padding: 25px;
`;

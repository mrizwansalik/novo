import { Container } from "reactstrap";
import styled from "styled-components";

export const CarrierBox = styled.div`
  padding: 5px 15px 10px 15px;
  position: relative;
  background: white;
  border: 1px solid #d6d6d6;
  margin-bottom: 25px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  cursor: pointer;

  .carrier-select {
    position: absolute;
    top: 15px;
    right: 15px;
  }
  .carrier-logo {
    display: block;
    width: 64px;
    height: 64px;
    margin: 0 auto;
  }
  .carrier-logo-128 {
    display: block;
    width: 128px;
    height: 128px;
    margin: 0 auto;
  }
`;

export const CarrierContainer = styled(Container)`
  width: 100%;
  height: 100%;
`;

export const CarrierText = styled.div`
  text-align: center;
`;

export const Dotted = styled.hr`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const CarrierLogoNo = styled.div`
  display: block;
  width: 64px;
  height: 64px;
  margin: 0 auto;
  background: transparent
    url(${process.env.PUBLIC_URL}/assets/images/A-blue.png) no-repeat center
    center;
  background-size: 64px;
  opacity: 0.2;
`;

export const CarrierLogo = styled.img`
  display: block;
  width: 64px;
  height: 64px;
  margin: 0 auto;
`;

export const CarrierLogo128 = styled.img`
  display: block;
  width: 128px;
  height: 128px;
  margin: 0 auto;
`;

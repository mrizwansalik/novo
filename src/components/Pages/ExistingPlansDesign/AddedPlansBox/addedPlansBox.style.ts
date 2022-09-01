import Button from "src/components/Button";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const ComponentContainer = styled.div`
  width: 100%;
  min-height: 420px;
  border: 1px solid #c8c8c8;
  border-radius: 3px;
  background-color: #ffffff;
`;

export const PlansHeader = styled.div`
  padding: 16px;
  background-color: #f7f7f7;
  width: 100%;

  h2 {
    font-size: 18px;
    line-height: 27px;
    color: #212135;
    font-weight: 700;
    margin: 0 0 8px 0 !important;
  }
`;

export const PlansBody = styled.div`
  width: 100%;
`;

export const PlanItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px 8px 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;

  h3 {
    font-size: 16px;
    line-height: 24px;
    color: #212135;
    font-weight: 700;
    margin-bottom: 8px;
  }

  div {
    display: flex;

    img {
      margin-left: 8px;
      cursor: pointer;
    }
  }
`;

export const NoPlan = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #212135;
  font-weight: 300;
  margin-bottom: 8px;
  padding: 8px 16px 8px 16px;
`;

export const PrimaryButton = styled(Button)`
  max-height: 100%;
  width: 100%;
  background-color: ${ThemeColor.AZURE_RADIANCE};

  :hover {
    background-color: #0078c2;
  }
`;

export const SecondaryButton = styled(Button)`
  max-height: 100%;
  width: 100%;
  background-color: #ffffff;
  color: ${ThemeColor.STEEL_GRAY} !important;

  :hover {
    color: ${ThemeColor.STEEL_GRAY} !important;
    background-color: ${ThemeColor.MERCURY};
  }
`;

export const ModalBody = styled.div`
  padding: 20px;

  h5 {
    color: #212135;
    font-size: 16px;
    line-height: 22px;
    margin: 0px;
    margin-bottom: 17px;
    font-weight: 500;
  }

  > div {
    display: flex;
    justify-content: space-between;
  }

  button {
    max-width: 48%;
    font-weight: 300;
  }
`;

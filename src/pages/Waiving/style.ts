import { Row, Button } from "reactstrap";
import { ThemeColor } from "src/constants";
import styled from "styled-components";

export const LogoSection = styled.img`
  // margin-top: 1rem;

  width: 5rem;
  height: 3rem;
}
`;

export const Container = styled.div`
  padding-top: 40px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 15%;
  background-color: #f5f9fc;
  overflow-y: hidden;
  height: 100vh;
  width: auto;
`;

export const InputCard = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  margin-bottom: 15px;

  height: max-content;
  color: #2e2e41;
  background-color: white;
  border: 1px solid #b1b1bd;

  border-radius: 5px;

  @media only screen and (min-width: 728px) {
    width: 80%;
  }
`;

export const MainHeading = styled.p`
  font-size: 18px;
  // margin-left: 2rem;
  // padding: 30px;
`;

export const ActionButtonsContainer = styled(Row)`
  display: inline-block;
  margin-top: 2rem;
  // padding-right: 10px;
  // padding-left: 10px;
`;
export const BackButton = styled(Button)`
  text-align: center;
  margin-right: 10px;
  cursor: pointer;
  float: left;
  margin-top: 10px;
  color: black;
  background-color: white;
  border: none;

  &:hover {
    background-color: white;
    color: black;
    text-decoration: underline;
  }
`;

export const NextButton = styled(Button)`
  text-align: center;

  cursor: pointer;
  margin-top: 10px;

  float: left;

  border: 1px solid ${ThemeColor.MYSTIC};

  background-color: #23cdfc;
`;

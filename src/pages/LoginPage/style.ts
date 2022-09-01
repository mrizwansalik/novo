import styled from "styled-components";
import bgLoginImage from "../../assets/images/bg-login.png";
import InputGroup from "../../components/InputGroup";

export const LoginContainer = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-image: url(${bgLoginImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const LoginFormWrapper = styled.div`
  width: 480px;
  height: max-content;
  padding: 40px;
  margin: 75px auto 0 auto;
  background-color: white;
  box-sizing: border-box;
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 35%);
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 24px;
    margin-left: 16px;
    margin-right: 16px;
  }
`;

export const LoginForm = styled.form`
  margin-top: 45px;
`;

export const FormInput = styled(InputGroup)`
  margin-bottom: 30px !important;

  label {
    font-size: 14px;
    line-height: 18px;
    font-weight: 700;
    color: #9797a7;
    text-transform: uppercase;
    font-family: "MuseoSans";
  }

  input {
    font-family: "MuseoSans";
  }

  label.Mui-focused {
    margin-bottom: 6px;
    color: #9797a7;
  }
`;

export const LoginButtons = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button {
    color: white;
    background-color: #2ecc71;
    text-transform: none;
    padding: 8px 16px;
    font-size: 18px;
    line-height: 22px;
    font-family: "MuseoSans";
    font-weight: 100 !important;
  }

  button:hover {
    background-color: #26a25a;
  }

  a {
    margin-left: 16px;
    color: #9797a7;
    text-decoration: none;
    font-size: 14px;
    line-height: 16px;
    font-family: "MuseoSans";
    font-weight: 100 !important;
  }

  a:hover {
    text-decoration: underline;
  }
`;

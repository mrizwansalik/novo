import styled from "styled-components";
import bgLoginImage from "../../assets/images/bg-login.png";
import InputGroup from "../../components/InputGroup";

export const ForgetPasswordContainer = styled.div`
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

export const ForgetPasswordFormWrapper = styled.div`
  width: 480px;
  height: max-content;
  padding: 40px;
  margin: 75px auto 0 auto;
  background-color: white;
  box-sizing: border-box;
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 35%);
  border-radius: 5px;
`;

export const ForgetPasswordForm = styled.form`
  margin-top: 60px;
`;

export const FormTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  line-height: 32px;
  color: #212135;
  font-family: "MuseoSans";
  font-weight: 100 !important;
  padding-bottom: 5px;
`;

export const FormDescription = styled.h2`
  margin: 0 0 50px;
  color: #9797a7;
  font-size: 16px;
  font-weight: 100;
  line-height: 24px;
  font-family: "MuseoSans";
`;

export const ErrorTextContainer = styled.div`
  border-radius: 5px;
  background-color: rgba(232, 76, 61, 0.3);
  color: #e84c3d;
  border-color: #e84c3d;
  padding: 5px;
  margin: 2px 0;
  font-size: 12px;
  line-height: 14px;
  font-weight: 100;
  border-width: 1px;
  border-style: solid;
  text-align: center;
  font-family: "MuseoSans";
`;
export const SuccessContainer = styled.div`
  a {
    text-decoration: none;
  }

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
`;

export const SuccessText = styled.label`
  margin-bottom: 6px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: #9797a7;
  font-family: "MuseoSans";
  display: block;
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
    font-size: 18px !important;
    color: #9797a7;
  }
`;

export const ForgetPasswordButtons = styled.div`
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

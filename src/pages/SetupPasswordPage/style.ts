import styled from "styled-components";
import Button from "../../components/Button";
import InputGroup from "../../components/InputGroup";

export const SetupPasswordContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background: transparent;
`;

export const SetupPasswordFormWrapper = styled.div`
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

export const SetupPasswordForm = styled.form`
  margin-top: 60px;
`;

export const FormTitle = styled.p`
  font-size: 14px;
  font-weight: 300;
  line-height: 22px;
  color: #212135;
  margin-bottom: 50px;
`;
export const OrganizationName = styled.label`
  font-weight: 700;
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
    font-size: 14px;
    line-height: 18px;
  }

  label.Mui-focused {
    margin-bottom: 6px;
    color: #9797a7;
  }
`;

export const SuggessPasswordText = styled.div`
  font-size: 11px;
  line-height: 14px;
  font-weight: 300;
  color: #9797a7;
`;

export const SubmitButton = styled(Button)`
  color: white;
  background-color: #2ecc71;
  text-transform: none;
  padding: 8px 16px;
  font-size: 18px;
  line-height: 22px;
  font-family: "MuseoSans";
  font-weight: 100 !important;
  border: none;
  margin-top: 40px;
  :hover {
    background-color: #26a25a;
  }
`;

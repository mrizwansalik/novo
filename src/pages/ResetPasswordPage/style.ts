import styled from "styled-components";
import Button from "../../components/Button";
import InputGroup from "../../components/InputGroup";

export const ResetPasswordContainer = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background: transparent;
`;

export const ResetPasswordFormWrapper = styled.div`
  width: 700px;
  height: max-content;
  background-color: white;
  box-sizing: border-box;
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 35%);
  border-radius: 5px;
  position: relative;
  padding: 24px;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 25px;

  @media (min-width: 768px) {
    padding: 40px 120px;
    margin: 50px auto 0 auto;
  }
`;

export const BookmarkIcon = styled.img`
  width: 32px;
  height: 50px;
  position: absolute;
  top: -8px;
`;
export const ResetPasswordForm = styled.form`
  margin-top: 40px;
`;

export const FormTitle = styled.h1`
  font-weight: 300;
  color: #212135;
`;

export const FormInstruction = styled.p`
  font-size: 14px;
  font-weight: 300;
  line-height: 22px;
  color: #728490;
`;

export const FormSuccessfulText = styled.div`
  text-align: center;
  color: #728490;
  font-size: 22px;
  font-weight: 300;
  line-height: 32px;
`;

export const OrganizationName = styled.label`
  font-weight: 700;
`;

export const FormInput = styled(InputGroup)`
  margin-bottom: 15px !important;

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

export const SuggestPasswordText = styled.div`
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
  margin-top: 30px;
  :hover {
    background-color: #26a25a;
  }
`;

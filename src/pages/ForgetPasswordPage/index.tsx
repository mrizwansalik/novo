import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { get } from "lodash";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { forgetPassword as forgetPasswordAPI } from "../../api/forgetPassword";
import logoImage from "../../assets/images/logo-wordmark.png";
import Button from "../../components/Button";
import routes from "../../routes";
import {
  ForgetPasswordContainer,
  ForgetPasswordFormWrapper,
  ForgetPasswordForm,
  FormTitle,
  FormDescription,
  ErrorTextContainer,
  SuccessContainer,
  SuccessText,
  FormInput,
  ForgetPasswordButtons,
} from "./style";
import { IFormData, validationSchema } from "./utils";
const ForgetPasswordPage = () => {
  const [isFormSuccessful, setFormSuccessful] = useState(false);
  const [isFormError, setFormError] = useState(false);

  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;
  async function handleSubmitButton(data: IFormData) {
    const response = await forgetPasswordAPI(data);
    if (response.status === 200) {
      setFormSuccessful(true);
      setFormError(false);
    } else {
      setFormError(true);
    }
  }
  return (
    <ForgetPasswordContainer>
      <ForgetPasswordFormWrapper>
        <div>
          <img src={logoImage} alt="logo" width={106} height={36} />
        </div>
        <ForgetPasswordForm onSubmit={handleSubmit(handleSubmitButton)}>
          <FormTitle>Reset your password</FormTitle>
          <FormDescription>
            {`Enter your email address below and we'll send instructions to reset
            your password.`}
          </FormDescription>
          {isFormError && (
            <ErrorTextContainer>
              {`There was an error and we weren't able to reset your password.`}
            </ErrorTextContainer>
          )}
          {isFormSuccessful && (
            <SuccessContainer>
              <SuccessText>
                AN EMAIL HAS BEEN SENT TO YOU WITH A LINK TO RESET YOUR
                PASSWORD.
              </SuccessText>
              <Link to={routes.login.value}>
                <Button label="Back to Sign in" />
              </Link>
            </SuccessContainer>
          )}
          {!isFormSuccessful && (
            <FormInput
              label="EMAIL ADDRESS"
              variant="standard"
              placeholder="you@yourcompany.com"
              fullWidth
              type="text"
              {...register("email")}
              error={get(errors, "email.message", "")}
              helperText={get(errors, "email.message")}
            />
          )}
          {!isFormSuccessful && (
            <ForgetPasswordButtons>
              <Button label="Reset" type="submit" />
              <Link to={routes.login.value}>Nevermind</Link>
            </ForgetPasswordButtons>
          )}
        </ForgetPasswordForm>
      </ForgetPasswordFormWrapper>
    </ForgetPasswordContainer>
  );
};
export default ForgetPasswordPage;

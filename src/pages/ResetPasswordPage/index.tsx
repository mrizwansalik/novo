import React, { Fragment, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { get } from "lodash";
import { inject, observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { resetPassword as resetPasswordApi } from "../../api/resetPassword";
import bookmarkIcon from "../../assets/images/bookmark64px100px.png";
import Header from "../../components/Header";
import {
  ResetPasswordContainer,
  ResetPasswordFormWrapper,
  ResetPasswordForm,
  FormInput,
  SubmitButton,
  SuggestPasswordText,
  FormTitle,
  BookmarkIcon,
  FormInstruction,
  FormSuccessfulText,
} from "./style";
import { IFormData, validationSchema } from "./util";
const ResetPasswordPage = () => {
  const [isFormSuccessful, setFormSuccess] = useState(false);
  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;

  async function handleSubmitButton(data: IFormData) {
    const response = await resetPasswordApi(data);
    if (response.status === 200) {
      setFormSuccess(true);
    } else {
      alert("Reset password failed. Please try again");
    }
  }
  return (
    <Fragment>
      <Header />
      <ResetPasswordContainer>
        <ResetPasswordFormWrapper>
          <BookmarkIcon src={bookmarkIcon} alt="icon" />
          <ResetPasswordForm onSubmit={handleSubmit(handleSubmitButton)}>
            <FormTitle>Set a password for your account</FormTitle>
            <FormInstruction>
              This will be used to sign in to your account
            </FormInstruction>
            {isFormSuccessful ? (
              <FormSuccessfulText>
                Your password was updated.
              </FormSuccessfulText>
            ) : (
              <Fragment>
                <FormInput
                  label="Enter a new password"
                  variant="standard"
                  placeholder="New password"
                  fullWidth
                  type="password"
                  {...register("password")}
                  error={get(errors, "password.password", "")}
                  helperText={get(errors, "password.message")}
                />
                <SuggestPasswordText>
                  Your password must be at least 8 characters long.
                </SuggestPasswordText>
                <SubmitButton label="Reset password" type="submit" />
              </Fragment>
            )}
          </ResetPasswordForm>
        </ResetPasswordFormWrapper>
      </ResetPasswordContainer>
    </Fragment>
  );
};

export default inject("workerStore")(observer(ResetPasswordPage));

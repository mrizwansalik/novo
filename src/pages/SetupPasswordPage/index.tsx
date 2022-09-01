import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { get } from "lodash";
import { inject, observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { resetPassword as resetPasswordApi } from "../../api/resetPassword";
import logoImage from "../../assets/images/logo-wordmark.png";
import routes from "../../routes";
import {
  SetupPasswordContainer,
  SetupPasswordFormWrapper,
  SetupPasswordForm,
  FormInput,
  SubmitButton,
  SuggessPasswordText,
  FormTitle,
  OrganizationName,
} from "./style";
import { IFormData, validationSchema } from "./util";
const SetupPasswordPage = (props) => {
  const { workerStore } = props;
  const { currentWorker, isLoading } = workerStore;
  const history = useHistory();
  const isPasswordSet = get(currentWorker, "password_set", false);

  if (isPasswordSet) {
    history.push(routes.dashboard.value);
  }

  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;
  async function handleSubmitButton(data: IFormData) {
    const response = await resetPasswordApi(data);
    if (response.status === 200) {
      alert("Setup password successfully. You will be redirected to dashboard");
      history.push(routes.dashboard.value);
    } else {
      alert("Setup password failed. Please try again");
    }
  }
  return (
    !isLoading && (
      <SetupPasswordContainer>
        <SetupPasswordFormWrapper>
          <div>
            <img src={logoImage} alt="logo" width={106} height={36} />
          </div>
          <SetupPasswordForm onSubmit={handleSubmit(handleSubmitButton)}>
            <FormTitle>
              <OrganizationName>{`${localStorage.getItem(
                "orgName"
              )}`}</OrganizationName>
              {` has invited you to use Novo Connection with them.`}
              <br />
              Set a password to complete your account.
            </FormTitle>
            <FormInput
              label="EMAIL ADDRESS"
              variant="standard"
              placeholder={`${localStorage.getItem("workerEmail")}`}
              fullWidth
              type="text"
              disabled
            />
            <FormInput
              label="PASSWORD"
              variant="standard"
              placeholder="New password"
              fullWidth
              type="password"
              {...register("password")}
              error={get(errors, "password.password", "")}
              helperText={get(errors, "password.message")}
            />
            <SuggessPasswordText>
              Your password must be at least 8 characters long.
            </SuggessPasswordText>
            <SubmitButton label="Create account" type="submit" />
          </SetupPasswordForm>
        </SetupPasswordFormWrapper>
      </SetupPasswordContainer>
    )
  );
};

export default inject("workerStore")(observer(SetupPasswordPage));

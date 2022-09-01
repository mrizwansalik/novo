import { yupResolver } from "@hookform/resolvers/yup";
import { get } from "lodash";
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { fetchCurrentWorker } from "src/api/fetchWorker";
import { login } from "src/utils/authentication";
import logoImage from "../../assets/images/logo-wordmark.png";
import Button from "../../components/Button";
import routes from "../../routes";
import {
  LoginContainer,
  LoginFormWrapper,
  LoginForm,
  FormInput,
  LoginButtons,
} from "./style";
import { IFormData, validationSchema } from "./util";

const LoginPage = () => {
  const history = useHistory();
  const location = useLocation();

  const { formState, setError, register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;

  const isLoggedIn = localStorage.getItem("authToken");

  async function handleLogin(data: IFormData) {
    const loginResponse = await login(data);
    if (loginResponse) {
      setError("email", {
        type: "400",
        message: "Unable to log in with provided credentials.",
      });
      setError("password", {
        type: "400",
        message: "Unable to log in with provided credentials.",
      });
    } else {
      fetchCurrentWorker()
        .then((response) => {
          localStorage.setItem("worker", response.id);
          if (!response?.is_broker_at_current) {
            if (!response?.password_set) {
              history.replace(routes.setpassword.value);
            } else {
              history.replace(routes.contactinfo.value);
            }
          } else {
            history.push(routes.dashboard.god.brokerages.list.value);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <LoginContainer>
      <Helmet>
        <title>Login | Novo Connection</title>
      </Helmet>
      <LoginFormWrapper>
        <div>
          <img src={logoImage} alt="logo" width={106} height={36} />
        </div>
        <LoginForm onSubmit={handleSubmit(handleLogin)}>
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
          <FormInput
            label="PASSWORD"
            variant="standard"
            placeholder="••••••••"
            fullWidth
            type="password"
            {...register("password")}
            error={get(errors, "password.password", "")}
            helperText={get(errors, "password.message")}
          />
          <LoginButtons>
            <Button label="Sign in" type="submit" />
            <Link to={routes.login.forgetPassword.value}>
              I forgot my password
            </Link>
          </LoginButtons>
        </LoginForm>
      </LoginFormWrapper>
    </LoginContainer>
  );
};
export default LoginPage;

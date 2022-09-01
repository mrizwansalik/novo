import { Container } from "./errorMessage.styles";

interface IErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage = (props: IErrorMessageProps) => {
  const { children } = props;
  return <Container>{children}</Container>;
};

export default ErrorMessage;

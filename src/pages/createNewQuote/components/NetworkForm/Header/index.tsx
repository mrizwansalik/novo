import { ReactNode } from "react";
import { Container, Title, Description } from "./header.styles";

interface IHeaderProps {
  title: string;
  description: ReactNode;
}

const Header = (props: IHeaderProps) => {
  const { title, description } = props;
  return (
    <Container xl="12" lg="12" md="12" sm="12" xs="12">
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
};

export default Header;

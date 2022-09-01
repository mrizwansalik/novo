import React from "react";
import routes from "../../../../routes";
import { Container, Title } from "./styles";

interface IOptionCardProps {
  title?: string;
  hint?: string;
  iconName?: string;
  routingUrl?: string;
}

const OptionCard = (props: IOptionCardProps) => {
  const { title, routingUrl } = props;
  const isActive: boolean =
    routingUrl !== routes.value
      ? window?.location?.pathname?.includes(routingUrl)
      : window?.location?.pathname === routes.value;

  return (
    <Container active={isActive} to={routingUrl}>
      <Title active={isActive}>{title}</Title>
    </Container>
  );
};

export default OptionCard;

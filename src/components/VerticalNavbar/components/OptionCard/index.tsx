import React, { useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getOrCreateOrgRecipe } from "src/utils/quote";
import routes from "../../../../routes";
import { IHistory, IParamTypes } from "../../../../types";
import {
  Container,
  IconSection,
  MenuIcon,
  WarningIcon,
  Title,
  HintContainer,
} from "./styles";

interface IOptionCardProps {
  title?: string;
  hint?: string;
  iconName?: string;
  routingUrl?: string;
}

const OptionCard = (props: IOptionCardProps) => {
  const { title, hint, iconName, routingUrl } = props;
  const { brokerageId, prospectId } = useParams<IParamTypes>();
  const history = useHistory<IHistory>();
  const hintRef = useRef(null);
  const isActive: boolean =
    routingUrl !== routes.value
      ? window?.location?.pathname?.includes(routingUrl)
      : window?.location?.pathname === routes.value;

  async function handleRedirect() {
    if (title === "Build Programs") {
      const orgRecipe = await getOrCreateOrgRecipe(prospectId);
      history.push(
        routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.network.getValue(
          brokerageId,
          prospectId,
          orgRecipe.id
        )
      );
    } else {
      history.push(routingUrl);
    }
  }

  return (
    <Container active={isActive} onClick={handleRedirect}>
      <IconSection>
        <MenuIcon
          iconName={`${iconName}-${isActive ? "blue" : "grey"}.png`}
          size={24}
        />
        {!!hint && (
          <div ref={hintRef}>
            <WarningIcon iconName="warning-red.png" size={24} />
          </div>
        )}
      </IconSection>
      <Title active={isActive}>{title}</Title>
      <HintContainer placement="right" target={hintRef}>
        {hint}
      </HintContainer>
    </Container>
  );
};

export default OptionCard;

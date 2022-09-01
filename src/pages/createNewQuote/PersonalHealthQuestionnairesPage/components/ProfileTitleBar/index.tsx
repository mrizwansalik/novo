import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import ColNoSpacing from "src/components/ColNoSpacing";
import Icon from "src/components/Icon";
import RowNoSpacing from "src/components/RowNoSpacing";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import {
  Title,
  Description,
  ComponentContainer,
  BackButton,
  ArrowLabel,
  ButtonLabel,
} from "./profileTitleBar.style";

const ProfileTitleBar = () => {
  const history = useHistory();
  const { prospectId } = useParams<IParamTypes>();

  return (
    <ComponentContainer>
      <RowNoSpacing>
        <ColNoSpacing
          xl={{ size: 12 }}
          lg={{ size: 12 }}
          md={{ size: 12 }}
          sm={{ size: 12 }}
          xs={{ size: 12 }}
        >
          <Title>Personal Health Questionnaires</Title>
          <Description>
            <span>
              Make sure to assign the PHQs you need completed before inviting
              employees. PHQs are required for underwriting when there is
              insufficient claims history.
            </span>
            <BackButton
              onClick={() =>
                history.push(
                  routes.dashboard.brokerage.prospects.onBoarding.census.choice.getValue(
                    prospectId
                  )
                )
              }
            >
              <Icon iconName="blue-arrow-right.png" />
              <ArrowLabel>Back to</ArrowLabel>
              <ButtonLabel>Census</ButtonLabel>
            </BackButton>
          </Description>
        </ColNoSpacing>
      </RowNoSpacing>
    </ComponentContainer>
  );
};

export default ProfileTitleBar;

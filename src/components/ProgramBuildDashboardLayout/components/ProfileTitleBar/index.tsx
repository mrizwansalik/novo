import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import routes from "src/routes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import {
  Container,
  Title,
  SubNavigationSection,
  LeftArrow,
  RightArrow,
  CommonButton,
} from "./profileTitleBar.style";
import { getNextRoute, getPreviousRoute } from "./utils";

interface IProfileTitleBarProps {
  step: number;
}

const ProfileTitleBar = (props: IProfileTitleBarProps) => {
  const { step } = props;

  const history = useHistory();
  const { brokerageId, prospectId, recipeId } = useParams<IParamTypes>();

  const { programBuildStore } = useStore();
  const {
    orgRecipe,
    generatingPrograms,
    numberOfPrograms,
    generateBuildProgram,
  } = programBuildStore;
  const [override, setOverride] = useState(false);

  const cannotGenerate =
    isEmpty(orgRecipe) || generatingPrograms || numberOfPrograms === 0;

  function handleGoNext() {
    const nextUrl = getNextRoute(step, brokerageId, prospectId, recipeId);
    history.push(nextUrl);
  }
  function handleGoPrevious() {
    const previousUrl = getPreviousRoute(
      step,
      brokerageId,
      prospectId,
      recipeId
    );
    history.push(previousUrl);
  }

  useEffect(() => {
    programBuildStore.calculateNumberOfPrograms();
  }, [orgRecipe]);

  useEffect(() => {
    setOverride(true);
  }, [cannotGenerate]);

  useEffect(() => {
    programBuildStore.fetchOrgRecipe(prospectId, recipeId);
  }, [prospectId, recipeId]);

  const handleSubmit = () => {
    const data = { override };
    const result = generateBuildProgram(prospectId, recipeId, data);
    if (result) {
      history.push(
        routes.dashboard.brokerage.brokerageId.prospects.prospectId.dashboard.getValue(
          brokerageId,
          prospectId
        )
      );
    }
  };

  return (
    <Container>
      <Title xl="6" lg="6" md="12">
        Build Programs
      </Title>
      <SubNavigationSection xl="6" lg="6" md="12">
        {step === 1 ? (
          <LeftArrow iconName="rightArrow32px-lgt.png" />
        ) : (
          <LeftArrow
            onClick={handleGoPrevious}
            iconName="blue-arrow-right.png"
          />
        )}
        {step === 7 ? (
          <RightArrow iconName="rightArrow32px-lgt.png" />
        ) : (
          <RightArrow onClick={handleGoNext} iconName="blue-arrow-right.png" />
        )}
        <CommonButton
          disabled={cannotGenerate}
          label={`Generate Programs (${numberOfPrograms})`}
          onClick={() => handleSubmit()}
        />
      </SubNavigationSection>
    </Container>
  );
};

export default observer(ProfileTitleBar);

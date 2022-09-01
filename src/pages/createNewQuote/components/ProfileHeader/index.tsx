import { useEffect } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import Icon from "src/components/Icon";
import useOnboardingSteps from "src/hooks/OnboardingSteps";
import routes from "src/routes";
import useStore from "src/utils/useStore";
import HeaderItem from "../HeaderItem";
import { createNewQuoteStages } from "./constants";
import {
  ComponentContainer,
  ReturnItem,
  SelectButton,
  ButtonWrapper,
} from "./profileHeader.style";

interface IProfileHeaderProps {
  skipCallback?: any;
}

const ProfileHeader = (props: IProfileHeaderProps) => {
  const { skipCallback } = props;
  const { orgStore, onboardingQuoteStore } = useStore();
  const { currentStage, currentStep } = onboardingQuoteStore;
  const { orgDetail } = orgStore;

  const location = useLocation();
  const history = useHistory();
  const onboardingStep = useOnboardingSteps();
  const dynamicStepCount = get(onboardingStep, "steps");

  useEffect(() => {
    const { pathname } = location;
    onboardingQuoteStore.setCurrentStage(pathname);
    onboardingQuoteStore.setCurrentStep(pathname, onboardingStep);
  }, [location, onboardingStep]);
  return (
    <ComponentContainer>
      <ReturnItem>
        <div
          onClick={() =>
            history.push(routes.dashboard.brokerage.prospects.list.value)
          }
        >
          <Icon iconName="blue-arrow-right.png" size={18} />
          <h3>{get(orgDetail, "name", "")}</h3>
        </div>
      </ReturnItem>
      {createNewQuoteStages.map((stage) => {
        const { stageId, stepCount, label } = stage;
        return (
          <HeaderItem
            key={label}
            label={label}
            isActive={currentStage === stageId}
            isCompleted={currentStage > stageId}
            isShownOnMobile={
              currentStage === stageId - 1 || currentStage === stageId
            }
            stepCount={currentStage === 4 ? dynamicStepCount : stepCount}
            currentStep={currentStep}
          />
        );
      })}
      <ButtonWrapper>
        <SelectButton
          onClick={skipCallback}
          disabled={dynamicStepCount === 1 ? true : false}
        >
          Skip to Dashboard
        </SelectButton>
      </ButtonWrapper>
    </ComponentContainer>
  );
};
export default observer(ProfileHeader);

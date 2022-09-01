import {
  ComponentWrapper,
  StepContainer,
  StepCount,
  StepNumber,
  CardWrapper,
} from "./headerItem.style";

interface IHeaderItemProps {
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  isShownOnMobile: boolean;
  stepCount: number;
  currentStep?: number;
}

const renderSteps = (
  stepCount: number,
  currentStep: number = 0,
  isActive: boolean,
  isCompleted: boolean
) => {
  if (isCompleted) {
    return <span>Complete</span>;
  }

  if (!isActive) {
    return <StepCount>{stepCount} Steps</StepCount>;
  }

  let steps = [];
  const stepIndex = currentStep < 0 ? 1 : currentStep + 1;
  for (let i = 1; i <= stepCount; i++) {
    steps.push(
      <StepNumber key={i} isActive={i === stepIndex} isComplete={i < stepIndex}>
        {i}
      </StepNumber>
    );
  }
  return steps;
};

const HeaderItem = (props: IHeaderItemProps) => {
  const {
    label,
    isActive,
    isCompleted,
    isShownOnMobile,
    stepCount,
    currentStep,
  } = props;
  return (
    <ComponentWrapper
      isActive={isActive}
      isCompleted={isCompleted}
      isShownOnMobile={isShownOnMobile}
    >
      <CardWrapper>
        <h3>{label}</h3>
        <StepContainer>
          {renderSteps(stepCount, currentStep, isActive, isCompleted)}
        </StepContainer>
      </CardWrapper>
    </ComponentWrapper>
  );
};
export default HeaderItem;

import { Fragment, RefObject, useRef, useEffect } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router";
import { IPlan } from "src/interfaces/benefit";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { getPlanDetailPageRoute } from "../../../../uitls";
import {
  TooltipContainer,
  TooltipContent,
  OptionContainer,
  OptionTextWrapper,
  OptionLabel,
  OptionValue,
  OptionIcon,
} from "./tooltipOptions.styles";

interface ITooltipOptionsProps {
  existingPlans: IPlan[];
  parentRef: RefObject<HTMLDivElement>;
  setIsOpenTooltip: (isOpenTooltip: boolean) => void;
}

const TooltipOptions = (props: ITooltipOptionsProps) => {
  const history = useHistory();
  const {
    brokerageId,
    prospectId,
    recipeId,
    planSetId,
  } = useParams<IParamTypes>();
  const contentRef: RefObject<HTMLDivElement> = useRef();
  const { existingPlans, parentRef, setIsOpenTooltip } = props;
  const { programStore } = useStore();
  const { isDashboardPage } = programStore;

  function getPlanDetail(plan: IPlan) {
    const deductibleIn = get(plan, "carrier_plan.deductible_in", 0);
    const coinsuranceIn = get(plan, "carrier_plan.coinsurance_in", 0);
    const outOfPocketMaxIn = get(plan, "carrier_plan.out_of_pocket_max_in", 0);
    return `${deductibleIn}/ ${coinsuranceIn * 100}%/ $${outOfPocketMaxIn}`;
  }

  function handleGoToEditPlanPage(existingPlan: IPlan) {
    const route = getPlanDetailPageRoute(
      isDashboardPage,
      brokerageId,
      prospectId,
      recipeId,
      planSetId,
      ""
    );
    const historyObject = {
      pathname: route,
      search: `?planId=${existingPlan.id}`,
    };
    history.push(historyObject);
  }

  function handleClickOutside(event): void {
    if (contentRef.current && !contentRef.current.contains(event?.target)) {
      setIsOpenTooltip(false);
    }
  }

  useEffect(() => {
    document?.addEventListener("mousedown", handleClickOutside);
    return () => document?.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Fragment>
      {parentRef?.current && (
        <TooltipContainer
          fade={false}
          placement="bottom"
          isOpen={true}
          target={parentRef}
        >
          <TooltipContent ref={contentRef}>
            {Array.isArray(existingPlans) &&
              existingPlans.map((plan) => {
                return (
                  <OptionContainer key={plan.id}>
                    <OptionTextWrapper>
                      <OptionLabel>{plan.name}</OptionLabel>
                      <OptionValue>{getPlanDetail(plan)}</OptionValue>
                    </OptionTextWrapper>
                    <OptionIcon
                      iconName="plusCircleBlue.png"
                      onClick={() => handleGoToEditPlanPage(plan)}
                    />
                  </OptionContainer>
                );
              })}
          </TooltipContent>
        </TooltipContainer>
      )}
    </Fragment>
  );
};

export default observer(TooltipOptions);

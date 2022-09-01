import React from "react";
import { cloneDeep } from "lodash";
import { observer } from "mobx-react";
import { useFormContext } from "react-hook-form";
import { CoverageType } from "src/constants/enum/plan";
import useStore from "src/utils/useStore";
import { participationMappings } from "../constants";
import { CensusButton } from "../existingPlansParticipationPage.style";

const FillCensusButton = () => {
  const { censusDetailsStore } = useStore();
  const { censusHumans } = censusDetailsStore;

  const { watch, reset } = useFormContext();
  const formData = watch();

  function applyParticipationFromCensus(e) {
    e.preventDefault();
    if (Array.isArray(censusHumans) && censusHumans.length > 0) {
      const planParticipation = cloneDeep(formData);

      const censusCount = {
        participation_estimation_employee: 0,
        participation_estimation_employee_spouse: 0,
        participation_estimation_employee_child: 0,
        participation_estimation_employee_family: 0,
      };
      censusHumans.forEach((human) => {
        const { coverage_type } = human;
        if (coverage_type === CoverageType.EMPLOYEE) {
          censusCount.participation_estimation_employee++;
        }
        if (coverage_type === CoverageType.EMPLOYEE_SPOUSE) {
          censusCount.participation_estimation_employee_spouse++;
        }
        if (coverage_type === CoverageType.EMPLOYEE_CHILDREN) {
          censusCount.participation_estimation_employee_child++;
        }
        if (coverage_type === CoverageType.EMPLOYEE_FAMILY) {
          censusCount.participation_estimation_employee_family++;
        }
      });

      participationMappings.forEach((mapping) => {
        planParticipation[mapping.key] = censusCount[mapping.key];
      });
      reset(planParticipation);
    }
  }

  return (
    <CensusButton onClick={(e) => applyParticipationFromCensus(e)}>
      Fill Values from Census
    </CensusButton>
  );
};

export default observer(FillCensusButton);

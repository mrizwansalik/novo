import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ParticipationForm from "src/components/Pages/ExistingPlansParticipation/ParticipationForm";
import useStore from "src/utils/useStore";
import {
  NoPlanText,
  PrimaryButton,
} from "./existingPlansParticipationPage.style";

const ExistingPlansParticipation = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const params = useParams();
  const prospectId = get(params, "prospectId");

  const { existingPlansStore } = useStore();
  const { existingPlans } = existingPlansStore;

  const hasFormData = Array.isArray(existingPlans) && existingPlans.length;

  async function saveParticipationAndPricing() {
    toast.info("Saving pricing and participation...");
    setIsFormSubmitted(true);
  }

  useEffect(() => {
    if (prospectId) {
      existingPlansStore.getExistingPlans(prospectId);
    }
  }, [prospectId]);

  return (
    <>
      {hasFormData ? (
        <>
          {existingPlans.map((plan) => (
            <ParticipationForm
              key={plan.id}
              plan={plan}
              isFormSubmitted={isFormSubmitted}
              setIsFormSubmitted={setIsFormSubmitted}
            />
          ))}
          <PrimaryButton onClick={saveParticipationAndPricing}>
            Next
          </PrimaryButton>
        </>
      ) : (
        <NoPlanText>No plans added yet.</NoPlanText>
      )}
    </>
  );
};

export default observer(ExistingPlansParticipation);

import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { observer } from "mobx-react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateMedicalPlanInPlanSet } from "src/api/planSet";
import { IMedicalPlan } from "src/interfaces/orgRecipes";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { isParticipationValid } from "../utils";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ParticipationForm from "./components/ParticipationForm";
import { Container } from "./planCard.styles";

interface IPlanCardProps {
  plan: IMedicalPlan;
}

const PlanCard = (props: IPlanCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { plan } = props;
  const {
    brokerageId,
    prospectId,
    recipeId,
    planSetId,
  } = useParams<IParamTypes>();
  const { censusDetailsStore } = useStore();
  const { censusHumans } = censusDetailsStore;

  const methods = useForm();
  const { handleSubmit } = methods;

  async function updateParticipation(data) {
    const updatedPlan = {
      ...plan,
      ...data,
    };
    if (isParticipationValid(updatedPlan, censusHumans)) {
      try {
        await updateMedicalPlanInPlanSet(
          prospectId,
          planSetId,
          plan.id,
          updatedPlan
        );
        setIsEditing(false);
        toast.success("Participation saved");
      } catch (e) {
        toast.error("There was an error saving the participation.");
      }
    } else {
      toast.error(
        "Participation is not valid. Participation cannot exceed the census numbers"
      );
    }
  }

  useEffect(() => {
    if (!isEmpty(plan)) {
      setIsEditing(!isParticipationValid(plan, censusHumans));
    }
  }, [plan, censusHumans]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(updateParticipation)}>
        <Container>
          <Header plan={plan} />
          <ParticipationForm
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            plan={plan}
          />
          {isEditing && <Footer setIsEditing={setIsEditing} />}
        </Container>
      </form>
    </FormProvider>
  );
};

export default observer(PlanCard);

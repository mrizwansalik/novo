import React, { useEffect } from "react";
import { get } from "lodash";
import { FormProvider } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import { IPlan } from "src/interfaces/benefit";
import { saveOrgPlan, saveOrgPlanCompositeTiers } from "src/utils/benefit";
import useStore from "src/utils/useStore";
import CensusBox from "../CensusBox";
import CurrentExpected from "../CurrentExpected";
import CurrentMaxClaims from "../CurrentMaxClaims";
import {
  FormBorder,
  StyledForm,
  Title,
} from "../existingPlansParticipationPage.style";
import FillCensusButton from "../FillCensusButton";
import useParticipationForm from "../hook";
import Participation from "../Participation";
import RenewalExpected from "../RenewalExpected";
import RenewalMaxClaims from "../RenewalMaxClaims";
import RenewalSwitch from "../RenewalSwitch";

interface IParticipationFormProps {
  plan: IPlan;
  isFormSubmitted: boolean;
  setIsFormSubmitted: (boolean) => void;
}

const ParticipationForm = (props: IParticipationFormProps) => {
  const history = useHistory();

  const params = useParams();
  const prospectId = get(params, "prospectId");
  const location = useLocation();
  const { pathname } = location;

  const { plan, isFormSubmitted, setIsFormSubmitted } = props;
  const { existingPlansStore } = useStore();

  const { formControl, watchHasRenewalRates } = useParticipationForm({ plan });
  const { handleSubmit } = formControl;

  async function handleSubmitForm(data: IPlan) {
    try {
      await saveOrgPlanCompositeTiers(prospectId, data);
      const newPlans = await saveOrgPlan(prospectId, data);
      existingPlansStore.updateExistingPlans(newPlans);
      toast.success("Plan pricing saved.");
    } catch (e) {
      toast.error("There was an error saving the plan pricing.");
    } finally {
      if (isFormSubmitted) {
        setIsFormSubmitted(false);
        const newRoute = pathname.replace("participation", "documents");
        history.push(newRoute);
      }
    }
  }

  useEffect(() => {
    if (isFormSubmitted) {
      handleSubmit((data) => {
        handleSubmitForm(data);
      })();
    }
  }, [isFormSubmitted]);

  // TODO: Logic for fullyFunded=true later
  return (
    <FormProvider {...formControl}>
      <StyledForm onSubmit={handleSubmit(handleSubmitForm)}>
        <Row>
          <Col lg={10} md={10}>
            <FormBorder>
              <Row>
                <Col lg={12} md={12}>
                  <Title>
                    <h2>{get(plan, "name")}</h2>
                  </Title>
                </Col>
              </Row>
              <CurrentMaxClaims />
              <CurrentExpected />
              <RenewalSwitch />
              {watchHasRenewalRates && (
                <>
                  <RenewalMaxClaims />
                  <RenewalExpected />
                </>
              )}
              <Participation />
              <FillCensusButton />
            </FormBorder>
          </Col>
          <Col lg={2} md={2}>
            <CensusBox />
          </Col>
        </Row>
      </StyledForm>
    </FormProvider>
  );
};
export default ParticipationForm;

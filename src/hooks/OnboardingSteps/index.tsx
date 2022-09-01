import { useEffect, useState } from "react";
import { get } from "lodash";
import { useLocation, useParams } from "react-router-dom";
import { getProspectProgress } from "src/api/broker";
import { IOnboardingStep, IProspectProgress } from "src/interfaces/onboarding";
import { configOnboardingState } from "./utils";

const useOnboardingSteps = () => {
  const [progress, setProgress] = useState<IProspectProgress>();
  const [step, setStep] = useState<IOnboardingStep>();

  const params = useParams();
  const orgId: string = get(params, "orgId", "");

  const location = useLocation();

  async function handleCurrentProgress(orgId: string) {
    const prospectProgress = await getProspectProgress(orgId);
    setProgress(prospectProgress);
  }

  useEffect(() => {
    if (orgId) {
      handleCurrentProgress(orgId);
    }
  }, [location]);

  useEffect(() => {
    const { pathname } = location;
    const prospectStep = configOnboardingState(pathname, progress);
    setStep(prospectStep);
  }, [location, progress]);

  return step;
};

export default useOnboardingSteps;

import { getProspectProgress } from "src/api/broker";
import { PROSPECT_TYPE } from "src/constants";
import { ITableHeader } from "src/interfaces/common";
import { IOnboardingStep, IProspectProgress } from "src/interfaces/onboarding";
import { IOrg } from "src/interfaces/org";
import routes from "src/routes";
import { IOption } from "src/types";
import { onboardingHeaderSteps } from "src/utils/onboarding";

export const TABLE_LIMIT_PAGE = 16;

export function getHeaderList(isGodOrg: boolean): ITableHeader[] {
  const headerList = [
    {
      Header: "Name",
      accessor: "name",
      width: 200,
    },
    {
      Header: "Added",
      accessor: "added",
    },
    {
      Header: "Effective",
      accessor: "effectiveDate",
    },
    {
      Header: "Primary Advisor",
      accessor: "primaryBrokerName",
    },
  ];

  if (isGodOrg) {
    headerList.push({
      Header: "",
      accessor: "additionalStatus",
    });
    headerList.push({
      Header: "",
      accessor: "status",
    });
  }

  headerList.push({
    Header: "",
    accessor: "modelsCount",
  });

  return headerList;
}

export function getProspectTypeOption(isGodOrg: boolean): IOption[] {
  let options = [
    {
      value: PROSPECT_TYPE.ACTIVE,
      label: "Active",
    },
  ];
  if (isGodOrg) {
    options.push({
      value: PROSPECT_TYPE.WON,
      label: "Won",
    });
    options.push({
      value: PROSPECT_TYPE.LOST,
      label: "Lost",
    });
  } else {
    options.push({
      value: PROSPECT_TYPE.INACTIVE,
      label: "Inactive",
    });
  }

  return options;
}

// TODO: Handle redirect logic here
export async function getOnboardingRoute(org: IOrg, isGodOrg: boolean) {
  /*Step 1: Was was org created through new onboarding flow?*/
  const prospectProgress: IProspectProgress = await getProspectProgress(org.id);

  //if created through new onboarding flow will be onboarding v1
  if (prospectProgress.onboarding_version === "1" && isGodOrg) {
    /*Step 2: Get all incomplete Onboarding steps*/
    const steps: IOnboardingStep[] = onboardingHeaderSteps(prospectProgress);
    const incompleteSteps = steps.filter((step) => {
      return !step.skipped && step.stepIndex !== step.steps;
    });

    /*Step 3: a) if all onboarding steps are complete, send them to new dashboard route*/
    if (incompleteSteps.length < 1) {
      // go to new dashboard
      return routes.dashboard.god.brokerages.prospects.dashboard.value(
        "TODO",
        org.id
      );
    }
    /*Step 3: b) else calculate how far they have progressed in onboarding flow */
    //Iterate over incompleteSteps in reverse, find furthest completed substep
    const copiedSteps = incompleteSteps.slice();
    const reversedIncompleteSteps = copiedSteps.reverse();
    const furthestCompletedStep = reversedIncompleteSteps.find((step) => {
      return step.stepIndex > -1;
    });
    if (furthestCompletedStep === undefined) {
      //if no partially completed step found, use first incomplete step
      const firstIncompleteRoute = incompleteSteps[0];
      getFirstIncompleteParentRoute(firstIncompleteRoute, org);
    } else {
      // else use furthest step that has a completed substep
      const incompleteRoute = furthestCompletedStep;
      getFirstIncompleteParentRoute(incompleteRoute, org);
    }
  }
}

export function getFirstIncompleteParentRoute(
  firstIncompleteRoute: IOnboardingStep,
  org: IOrg
) {
  if (firstIncompleteRoute.route === ".client.program-build") {
    // firstIncompleteRouteIsProgramBuild(firstIncompleteRoute, org);
  } else {
    // getFirstIncompleteSubRoute(firstIncompleteRoute, org);
  }
}

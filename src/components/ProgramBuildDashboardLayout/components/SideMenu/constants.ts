import { ISideMenu } from "./interfaces";

export enum ProgramBuildSideMenuRouteID {
  PROVIDER_ACCESS = "provider-access",
  PHARMACY_BENEFIT_MANAGER = "pharmacy-benefit-manager",
  SOLUTION_PARTNERS = "solution-partners",
  THIRD_PARTY_ADMINISTRATORS = "third-party-administrators",
  PLAN_DESIGNS = "plan-designs",
  EXPENSES = "expenses",
  STOP_LOSS = "stop-loss",
}

export const sideMenuList: ISideMenu[] = [
  {
    routeId: ProgramBuildSideMenuRouteID.STOP_LOSS,
    title: "Stop Loss (0)",
    checked: false,
    routeUrl: "#",
    children: [
      {
        title: "AMPS (RBP)",
      },
      {
        title: "AMPS (RBP) + Physicians Wrap",
      },
      {
        title: "ClearHealth (RBP)",
      },
      {
        title: "6 Degrees Health (RBP)",
      },
      {
        title: "ClaimDOC (RBP)",
      },
      {
        title: "6 Degrees Health (RBP) + PHCS Physicians",
      },
    ],
  },
];

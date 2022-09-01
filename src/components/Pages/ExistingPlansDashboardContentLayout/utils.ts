import routes from "src/routes";

export function getTabs(
  isSelfFunded: boolean,
  brokerageId: string,
  prospectId: string,
  planId?: string
) {
  if (isSelfFunded) {
    return [
      {
        label: "Documents",
        route: routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans.selfFunded.documents.getValue(
          brokerageId,
          prospectId
        ),
        keyword: "documents",
      },
      {
        label: "Stop Loss",
        route: routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans.selfFunded.stopLoss.getValue(
          brokerageId,
          prospectId
        ),
        keyword: "stop-loss",
      },
      {
        label: "Plan Design",
        route: routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans.selfFunded.design.getValue(
          brokerageId,
          prospectId,
          planId
        ),
        keyword: "design",
      },
      {
        label: "Rates & Participants",
        route: routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans.selfFunded.participation.getValue(
          brokerageId,
          prospectId
        ),
        keyword: "participation",
      },
    ];
  }

  return [
    {
      label: "Documents",
      route: routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans.fullyInsured.documents.getValue(
        brokerageId,
        prospectId
      ),
      keyword: "documents",
    },
    {
      label: "Plan Design",
      route: routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans.fullyInsured.design.getValue(
        brokerageId,
        prospectId,
        planId
      ),
      keyword: "design",
    },
    {
      label: "Rates & Participants",
      route: routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans.fullyInsured.participation.getValue(
        brokerageId,
        prospectId
      ),
      keyword: "participation",
    },
  ];
}

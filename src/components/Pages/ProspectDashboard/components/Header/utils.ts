import routes from "src/routes";

export function getTabs(
  isGod: boolean,
  brokerageId: string,
  prospectId: string
) {
  if (isGod) {
    return [
      {
        label: "Dashboard",
        route: routes.dashboard.brokerage.brokerageId.prospects.prospectId.dashboard.getValue(
          brokerageId,
          prospectId
        ),
        keyword: "dashboard",
      },
      {
        label: "RFPs",
        route: routes.dashboard.brokerage.brokerageId.prospects.prospectId.rfps.rfpList.getValue(
          brokerageId,
          prospectId
        ),
        keyword: "rfps",
      },
      // {
      //   label: "Gap Reviews",
      //   route: routes.dashboard.brokerage.brokerageId.prospects.prospectId.dashboard.getValue(
      //     brokerageId,
      //     prospectId
      //   ),
      //   keyword: "gap-reviews",
      // },
      {
        label: "Old Dash",
        route: routes.dashboard.god.brokerages.prospects.oldDashboard.getValue(
          prospectId
        ),
        keyword: "old",
      },
    ];
  }
}

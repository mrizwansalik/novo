import routes from "src/routes";

export function generateTabRoutes(prospectId: string) {
  return [
    {
      title: "Documents",
      slug: "documents",
      route: routes.dashboard.brokerage.prospects.prospectId.claims.documents.getValue(
        prospectId
      ),
    },
    {
      title: "Monthly",
      slug: "monthly-claims",
      route: routes.dashboard.brokerage.prospects.prospectId.claims.monthlyClaims.getValue(
        prospectId
      ),
    },
    {
      title: "Large",
      slug: "large-claims",
      route: routes.dashboard.brokerage.prospects.prospectId.claims.largeClaims.getValue(
        prospectId
      ),
    },
  ];
}

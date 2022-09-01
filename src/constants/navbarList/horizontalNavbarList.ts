import { INavbar } from "src/interfaces/common";
import routes from "../../routes";

export const horizontalAdminNavbarList: INavbar[] = [
  {
    title: "Brokerages",
    routingUrl: routes.dashboard.god.brokerages.list.value,
  },
  {
    title: "RFPs",
    routingUrl: routes.dashboard.god.rfps.value,
  },
  {
    title: "Quotes",
    routingUrl: routes.dashboard.brokerage.prospects.list.value,
  },
  // {
  //   title: "Saved Programs",
  //   routingUrl: routes.dashboard.brokerage.templatePrograms.value,
  // },
];

export const horizontalNavbarList: INavbar[] = [
  {
    title: "Quotes",
    routingUrl: routes.dashboard.brokerage.prospects.list.value,
  },
  // {
  //   title: "Saved Programs",
  //   routingUrl: routes.dashboard.brokerage.templatePrograms.value,
  // },
];

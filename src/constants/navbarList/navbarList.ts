import { INavbar } from "../../interfaces/common";
import routes from "../../routes";

export const navbarList: INavbar[] = [
  {
    title: "Dashboard",
    iconName: "dash-dashboard",
    routingUrl: routes.value,
  },
  {
    title: "Client Profile",
    iconName: "dash-profile",
    routingUrl: routes.profile.value,
    // routingUrl: routes.dashboard.brokerage.prospects.prospectId.profile.value(prospectId),
  },
  {
    title: "Census",
    hint: "Existing plan documents are required for underwriting",
    iconName: "dash-census",
    routingUrl: routes.census.value,
  },
  {
    title: "Existing Plans",
    hint: "Existing plan documents are required for underwriting",
    iconName: "dash-plans",
    // routingUrl: routes.census.value,
  },
  {
    title: "Health History",
    hint: "Choosing a health option is required for underwriting",
    iconName: "dash-health",
    routingUrl: routes.health.value,
  },
  {
    title: "Build Programs",
    iconName: "dash-program",
    routingUrl: routes.recipe.value,
  },
];

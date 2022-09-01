import { INavbar } from "../../interfaces/common";
import routes from "../../routes";

export const userProfileNavbarList: INavbar[] = [
  {
    title: "Team members",
    routingUrl: routes.dashboard.brokerage.teamMembers.value,
  },
  {
    title: "Reset Password",
    routingUrl: routes.dashboard.changePassword.value,
  },
  {
    title: "Security",
    routingUrl: routes.dashboard.brokerage.security.value,
  },
  {
    title: "Signout",
    routingUrl: "",
  },
];

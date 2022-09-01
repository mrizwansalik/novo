import { ProgramBuildSideMenuRouteID } from "./constants";

export interface ISideMenuChildren {
  id?: string;
  title: string;
}

export interface ISideMenu {
  routeId: ProgramBuildSideMenuRouteID;
  title: string;
  checked: boolean;
  routeUrl: string;
  children: ISideMenuChildren[];
}

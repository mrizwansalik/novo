export interface ISideMenuChildren {
  id?: string;
  title: string;
}

export interface ISideMenu {
  title: string;
  checked: boolean;
  children: ISideMenuChildren[];
}

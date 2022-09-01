export interface INavbar {
  title?: string;
  hint?: string;
  iconName?: string;
  routingUrl?: string;
}

export interface IOption {
  label: string;
  value: string | number;
}

export interface ITableHeader {
  Header: string;
  accessor: string;
  width?: number | string;
}

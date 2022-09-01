import React from "react";
import { Story, Meta } from "@storybook/react";
import TableComponent, { ITableProps } from "./";

export default {
  title: "Component/Table",
  component: TableComponent,
} as Meta;

export const TableStory: Story<ITableProps> = (args: ITableProps) => {
  return <TableComponent {...args} />;
};

TableStory.args = {
  headerList: [
    { Header: "Name", accessor: "name" },
    { Header: "Added", accessor: "createdAt" },
    { Header: "Effective", accessor: "expiredAt" },
  ],
  data: [
    {
      name: "Axe Capital",
      createdAt: "Aug 14, 2018",
      expiredAt: "Jul 1, 2021",
    },
    {
      name: "Axe Capital",
      createdAt: "Aug 14, 2018",
      expiredAt: "Jul 1, 2021",
    },
    {
      name: "Axe Capital",
      createdAt: "Aug 14, 2018",
      expiredAt: "Jul 1, 2021",
    },
    {
      name: "Axe Capital",
      createdAt: "Aug 14, 2018",
      expiredAt: "Jul 1, 2021",
    },
    {
      name: "Axe Capital",
      createdAt: "Aug 14, 2018",
      expiredAt: "Jul 1, 2021",
    },
  ],
  pagination: {
    includePagination: true,
    pageCount: 1,
    pageIndex: 1,
  },
};

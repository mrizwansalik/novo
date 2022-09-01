import React from "react";
import { Story, Meta } from "@storybook/react";
import TableWithSelectComponent, { ITableWithSelectProps } from "./";

export default {
  title: "Component/Table",
  component: TableWithSelectComponent,
} as Meta;

export const TableWithSelectStory: Story<ITableWithSelectProps> = (
  args: ITableWithSelectProps
) => {
  return <TableWithSelectComponent {...args} />;
};

TableWithSelectStory.args = {
  headerList: [
    { Header: "First Name", accessor: "first_name" },
    { Header: "Last Name", accessor: "last_name" },
    { Header: "Zip Code", accessor: "postal" },
    { Header: "Date of Birth", accessor: "birthday" },
    { Header: "Gender", accessor: "gender" },
    { Header: "Coverage", accessor: "coverage_type" },
    { Header: "Plan Name", accessor: "plan_name" },
  ],
  data: [
    {
      additional_data: {
        gender: "Male",
        postal: "29485",
        birthday: "9/1/48",
        row_number: 2,
        coverage_type: "EE",
      },
      birthday: "1948-09-01",
      coverage_type: "employee",
      dependents: [],
      employee: null,
      first_name: "",
      gender: "Male",
      id: "76757b5c-5b28-4b48-bc6f-94520ec43f73",
      last_name: "",
      plan_name: "",
      postal: "29485",
      relationship: "",
    },
    {
      additional_data: {
        gender: "Male",
        postal: "29485",
        birthday: "9/1/48",
        row_number: 2,
        coverage_type: "EE",
      },
      birthday: "1948-09-01",
      coverage_type: "employee",
      dependents: [],
      employee: null,
      first_name: "Peter",
      gender: "Male",
      id: "76757b5c-5b28-4b48-bc6f-94520ec43f73",
      last_name: "Parker",
      plan_name: "",
      postal: "29485",
      relationship: "",
    },
    {
      additional_data: {
        gender: "Male",
        postal: "29485",
        birthday: "9/1/48",
        row_number: 2,
        coverage_type: "EE",
      },
      birthday: "1948-09-01",
      coverage_type: "employee",
      dependents: [],
      employee: null,
      first_name: "",
      gender: "Male",
      id: "76757b5c-5b28-4b48-bc6f-94520ec43f73",
      last_name: "",
      plan_name: "",
      postal: "29485",
      relationship: "",
    },
    {
      additional_data: {
        gender: "Male",
        postal: "29485",
        birthday: "9/1/48",
        row_number: 2,
        coverage_type: "EE",
      },
      birthday: "1948-09-01",
      coverage_type: "employee",
      dependents: [],
      employee: null,
      first_name: "Peter",
      gender: "Male",
      id: "76757b5c-5b28-4b48-bc6f-94520ec43f73",
      last_name: "Parker",
      plan_name: "",
      postal: "29485",
      relationship: "",
    },
    {
      additional_data: {
        gender: "Male",
        postal: "29485",
        birthday: "9/1/48",
        row_number: 2,
        coverage_type: "EE",
      },
      birthday: "1948-09-01",
      coverage_type: "employee",
      dependents: [],
      employee: null,
      first_name: "",
      gender: "Male",
      id: "76757b5c-5b28-4b48-bc6f-94520ec43f73",
      last_name: "",
      plan_name: "",
      postal: "29485",
      relationship: "",
    },
    {
      additional_data: {
        gender: "Male",
        postal: "29485",
        birthday: "9/1/48",
        row_number: 2,
        coverage_type: "EE",
      },
      birthday: "1948-09-01",
      coverage_type: "employee",
      dependents: [],
      employee: null,
      first_name: "Peter",
      gender: "Male",
      id: "76757b5c-5b28-4b48-bc6f-94520ec43f73",
      last_name: "Parker",
      plan_name: "",
      postal: "29485",
      relationship: "",
    },
  ],
  pagination: {
    includePagination: true,
    pageCount: 1,
    pageIndex: 1,
  },
};

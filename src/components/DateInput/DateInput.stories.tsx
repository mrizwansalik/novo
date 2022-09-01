import React from "react";
import { Story, Meta } from "@storybook/react";
import DateInput, { IDateInputProps } from ".";
import "react-datepicker/dist/react-datepicker.css";

export default {
  title: "Component/DateInput",
  component: DateInput,
} as Meta;

export const DatePickerStory: Story<IDateInputProps> = (
  args: IDateInputProps
) => <DateInput {...args} />;

DatePickerStory.args = {
  startDate: new Date(),
};

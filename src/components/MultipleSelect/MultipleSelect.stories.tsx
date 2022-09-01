import React from "react";
import { Story, Meta } from "@storybook/react";
import MultipleSelect, { IMultipleSelectProps } from ".";

export default {
  title: "Component/MultipleSelect",
  component: MultipleSelect,
} as Meta;

export const MultipleSelectStory: Story<IMultipleSelectProps> = (
  args: IMultipleSelectProps
) => {
  return <MultipleSelect {...args} />;
};

MultipleSelectStory.args = {
  onChange: () => null,
  options: [
    {
      label: "one",
      value: 1,
    },
    {
      label: "two",
      value: 2,
    },
    {
      label: "three",
      value: 3,
    },
  ],
};

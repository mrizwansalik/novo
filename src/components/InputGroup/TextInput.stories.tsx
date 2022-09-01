import React from "react";
import { Story, Meta } from "@storybook/react";
import InputGroup, { IInputGroupProps } from ".";

export default {
  title: "Component/InputGroup",
  component: InputGroup,
} as Meta;

export const InputGroupStory: Story<IInputGroupProps> = (
  args: IInputGroupProps
) => <InputGroup {...args} />;

InputGroupStory.args = {
  label: "Enter your name",
};

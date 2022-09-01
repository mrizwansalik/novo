import React from "react";
import { Story, Meta } from "@storybook/react";
import InputRadio, { IInputRadioProps } from ".";

export default {
  title: "Component/InputRadio",
  component: InputRadio,
} as Meta;

export const InputRadioStory: Story<IInputRadioProps> = (
  args: IInputRadioProps
) => <InputRadio {...args} />;

InputRadioStory.args = {
  label: "Enter your name",
};

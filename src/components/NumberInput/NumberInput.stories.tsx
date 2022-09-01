import React from "react";
import { Story, Meta } from "@storybook/react";
import NumberInput, { INumberInputProps } from ".";

export default {
  title: "Component/NumberInput",
  component: NumberInput,
} as Meta;

export const NumberInputStory: Story<INumberInputProps> = (
  args: INumberInputProps
) => <NumberInput {...args} />;

NumberInputStory.args = {
  format: "#####",
  mask: "_",
  allowEmptyFormatting: true,
};

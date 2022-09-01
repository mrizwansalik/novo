import React from "react";
import { Story, Meta } from "@storybook/react";
import ButtonWithPriority, { IStyledButtonProps } from ".";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Component/ButtonWithPriority",
  component: ButtonWithPriority,
} as Meta;

export const ButtonStory: Story<IStyledButtonProps> = (args) => (
  <ButtonWithPriority>Button With Priority</ButtonWithPriority>
);

ButtonStory.args = {
  isPrimary: true,
};

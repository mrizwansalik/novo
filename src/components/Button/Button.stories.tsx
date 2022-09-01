import React from "react";
import { Story, Meta } from "@storybook/react";
import Button, { IButtonProps } from ".";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Component/Button",
  component: Button,
} as Meta;

export const ButtonStory: Story<IButtonProps> = (args) => <Button {...args} />;

ButtonStory.args = {
  label: "Contained Button",
  color: "primary",
  outline: false,
  active: true,
  block: true,
  size: "lg",
  close: false,
};

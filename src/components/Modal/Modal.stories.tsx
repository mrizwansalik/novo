import React from "react";
import { Story, Meta } from "@storybook/react";
import Modal, { IModalProps } from ".";

export default {
  title: "Component/Modal",
  component: Modal,
} as Meta;

export const ModalStory: Story<IModalProps> = (args: IModalProps) => (
  <Modal {...args} />
);

ModalStory.args = {
  isOpen: false,
  header: "Modal title",
  body: "This is modal content as text",
  footer: "This is modal content as text",
};

import React from "react";
import { Story, Meta } from "@storybook/react";
import FileUploader, { IFileUploaderProps } from ".";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

export default {
  title: "Component/FileUploader",
  component: FileUploader,
} as Meta;

export const FileUploaderStory: Story<IFileUploaderProps> = (
  args: IFileUploaderProps
) => <FileUploader {...args} />;

FileUploaderStory.args = {
  isOpen: true,
};

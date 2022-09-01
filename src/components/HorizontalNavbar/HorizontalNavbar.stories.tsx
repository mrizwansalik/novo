import React from "react";
import { Story, Meta } from "@storybook/react";
import { horizontalAdminNavbarList } from "src/constants";
import HorizontalNavbar, { IHorizontalNavbarProps } from ".";

export default {
  title: "Component/HorizontalNavbar",
  component: HorizontalNavbar,
} as Meta;

export const HorizontalNavbarStory: Story<IHorizontalNavbarProps> = (
  args: IHorizontalNavbarProps
) => {
  return <HorizontalNavbar {...args} />;
};

HorizontalNavbarStory.args = {
  navbarList: horizontalAdminNavbarList,
};

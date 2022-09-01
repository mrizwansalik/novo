import React from "react";
import { Story, Meta } from "@storybook/react";
import { navbarList } from "../../constants";
import VerticalNavbar, { IVerticalNavbarProps } from ".";

export default {
  title: "Component/VerticalNavbar",
  component: VerticalNavbar,
} as Meta;

export const VerticalNavbarStory: Story<IVerticalNavbarProps> = (
  args: IVerticalNavbarProps
) => {
  return <VerticalNavbar {...args} />;
};

VerticalNavbarStory.args = {
  navbarList: navbarList,
};

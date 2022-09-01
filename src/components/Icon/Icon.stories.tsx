import { Story, Meta } from "@storybook/react";
import Icon, { IIconProps } from ".";

export default {
  title: "Component/Icon",
  component: Icon,
} as Meta;

export const IconStory: Story<IIconProps> = (args: IIconProps) => (
  <Icon {...args} />
);

IconStory.args = {
  iconName: "gold_star.png",
  height: 40,
  width: 40,
};

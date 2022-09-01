import { Story, Meta } from "@storybook/react";
import Tabs, { ICommonTabsProps } from ".";

export default {
  title: "Component/Tabs",
  component: Tabs,
} as Meta;

export const TabsStory: Story<ICommonTabsProps> = (args: ICommonTabsProps) => (
  <Tabs {...args} />
);

TabsStory.args = {
  headers: ["Tab1", "More Tabs"],
  contents: ["body of tab 1", "body of tab 2"],
};

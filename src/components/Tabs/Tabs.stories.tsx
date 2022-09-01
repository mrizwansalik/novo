import { Story, Meta } from "@storybook/react";
import Tabs, { ITabsProps } from ".";

export default {
  title: "Component/Tabs",
  component: Tabs,
} as Meta;

export const TabsStory: Story<ITabsProps> = (args: ITabsProps) => (
  <Tabs {...args} />
);

TabsStory.args = {
  headers: ["Tab1", "More Tabs"],
  contents: ["body of tab 1", "body of tab 2"],
};

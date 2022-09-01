import { Story, Meta } from "@storybook/react";
import Header from ".";

export default {
  title: "Component/Header",
  component: Header,
} as Meta;

export const HeaderStory: Story = () => {
  return <Header />;
};

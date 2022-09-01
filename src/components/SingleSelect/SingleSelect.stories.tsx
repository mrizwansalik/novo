import { Story, Meta } from "@storybook/react";
import SingleSelectComponent, { ISingleSelectProps } from ".";

export default {
  title: "Component/SingleSelect",
  component: SingleSelectComponent,
} as Meta;

export const SingleSelectStory: Story<ISingleSelectProps> = (
  args: ISingleSelectProps
) => {
  return <SingleSelectComponent {...args} />;
};

SingleSelectStory.args = {
  onChange: () => null,
  options: [
    {
      label: "one",
      value: 1,
    },
    {
      label: "two",
      value: 2,
    },
    {
      label: "three",
      value: 3,
    },
  ],
};

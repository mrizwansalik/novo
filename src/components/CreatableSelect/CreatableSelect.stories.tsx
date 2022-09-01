import { Story, Meta } from "@storybook/react";
import CreatableSelectComponent, { ICreatableSelectProps } from ".";

export default {
  title: "Component/CreatableSelect",
  component: CreatableSelectComponent,
} as Meta;

export const CreatableSelectStory: Story<ICreatableSelectProps> = (
  args: ICreatableSelectProps
) => {
  return <CreatableSelectComponent {...args} />;
};

CreatableSelectStory.args = {
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

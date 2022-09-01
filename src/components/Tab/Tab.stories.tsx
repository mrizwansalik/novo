import DeleteIcon from "@material-ui/icons/Delete";
import { Story, Meta } from "@storybook/react";

import TabComponent, { ITabProps } from ".";

export default {
  title: "Component/Tab",
  component: TabComponent,
} as Meta;

const Tab: Story<ITabProps> = (args) => <TabComponent {...args} />;

export const NormalTab = Tab.bind({});
NormalTab.args = {
  label: "Normal Tab",
};

export const WrappedTab = Tab.bind({});
WrappedTab.args = {
  label: "Wrapped Tab with very long label",
  wrapped: true,
};

export const DisabledTab = Tab.bind({});
DisabledTab.args = {
  label: "Disabled Tab",
  disabled: true,
};

export const TabWithIconAbove = Tab.bind({});
TabWithIconAbove.args = {
  label: "Tab with icon above",
  icon: <DeleteIcon />,
};

export const TabWithOnlyIcon = Tab.bind({});
TabWithOnlyIcon.args = {
  icon: <DeleteIcon />,
};

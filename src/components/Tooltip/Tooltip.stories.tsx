import { Story, Meta } from "@storybook/react";
import Tooltip, { ITooltipProps } from ".";

export default {
  title: "Component/ToolTip",
  component: Tooltip,
} as Meta;

export const ToolTip: Story<ITooltipProps> = (args) => <Tooltip {...args} />;

ToolTip.args = {
  id: "tooltip-id",
  content: "Tooltip content",
  placement: "bottom-end",
};

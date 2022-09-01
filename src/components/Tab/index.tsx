import React from "react";
import MaterialUITab from "@material-ui/core/Tab";

export interface ITabProps {
  label?: string;
  onClick?: () => void;
  icon?: React.ReactElement;
  disabled?: boolean;
  wrapped?: boolean;
}

const Tab = (props: ITabProps) => {
  const { label, disabled, wrapped, ...rest } = props;

  return (
    <MaterialUITab
      {...rest}
      label={label}
      disabled={disabled}
      wrapped={wrapped}
    />
  );
};

export default Tab;

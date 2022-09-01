import { Button as ReactStrapButton, ButtonProps } from "reactstrap";

export interface IButtonProps extends ButtonProps {
  label: string;
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "danger";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
}

const Button = (props: IButtonProps) => {
  const { label, color, ...rest } = props;

  return (
    <ReactStrapButton color={color} {...rest}>
      {label}
    </ReactStrapButton>
  );
};

export default Button;

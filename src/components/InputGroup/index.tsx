import { Input as ReactStrapInput, Label, InputProps } from "reactstrap";
import { ErrorMessage } from "./styles";

export interface IInputGroupProps extends InputProps {
  name?: string;
  label?: string;
  labelComponent?: React.ReactElement;
  subLabel?: string;
  error?: string;
  hasNoLabel?: boolean;
  isControlled?: boolean;
  register?: any;
  onChange?: (e) => void;
}

const InputGroup = (props: IInputGroupProps) => {
  const {
    name,
    label,
    labelComponent,
    subLabel,
    error,
    hasNoLabel,
    isControlled = false,
    className,
    register,
    ...rest
  } = props;

  return (
    <div className={className}>
      {labelComponent}
      {!hasNoLabel && label && <Label>{label}</Label>}
      {!hasNoLabel && subLabel && (
        <>
          {!labelComponent && <br />}
          <Label>{subLabel}</Label>
        </>
      )}
      {isControlled ? (
        <input name={name} {...rest} {...register} />
      ) : (
        <ReactStrapInput name={name} {...rest} />
      )}
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
};

export default InputGroup;

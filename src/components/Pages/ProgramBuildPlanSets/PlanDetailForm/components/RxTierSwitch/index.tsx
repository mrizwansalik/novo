import { Switch, Container, Label } from "./rxTierSwitchs.style";

const RxTierSwitch = (props) => {
  const { label, ...restProps } = props;

  return (
    <Container>
      <Switch>
        <input type="checkbox" {...restProps} />
        <span />
      </Switch>
      {label && <Label>{label}</Label>}
    </Container>
  );
};

export default RxTierSwitch;

import { Container, Label, Value } from "./overviewTab.styles";

interface IOverviewTabProps {
  label: string;
  value: string;
}

const OverviewTab = (props: IOverviewTabProps) => {
  const { label, value } = props;

  return (
    <Container>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Container>
  );
};

export default OverviewTab;

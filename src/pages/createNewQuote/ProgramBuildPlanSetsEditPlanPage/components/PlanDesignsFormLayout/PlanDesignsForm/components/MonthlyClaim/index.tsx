import ColNoSpacing from "src/components/ColNoSpacing";
import { getMonthName } from "src/constants/time/time";
import InputWithCheckbox from "./components/InputWithCheckbox";
import { Container, ClaimLabel, Divider } from "./monthlyClaim.styles";

const MonthlyClaim = () => {
  const months: number[] = Array.from({ length: 12 }).map(
    (_, order: number) => order
  );

  return (
    <Container>
      <ClaimLabel md={12}>Monthly Claims</ClaimLabel>
      {Array.isArray(months) &&
        months.map((month: number, order: number) => {
          return (
            <ColNoSpacing xl={3} lg={3} md={3} sm={12} xs={12} key={order}>
              <InputWithCheckbox order={order} label={getMonthName(month)} />
            </ColNoSpacing>
          );
        })}
      <Divider />
    </Container>
  );
};

export default MonthlyClaim;

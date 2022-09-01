import { ICarrierPlan } from "src/interfaces/benefit";
import { observer } from "mobx-react";
import ProgramCard from "../../../ProgramCard";
import { Container, ColNoSpacing } from "./gridLayout.styles";

interface IGridLayoutProps {
  programs: ICarrierPlan[];
}

const GridLayout = ({ programs }: IGridLayoutProps) => {
  return (
    <Container>
      {Array.isArray(programs) &&
        programs.map((program) => {
          return (
            <ColNoSpacing key={program.id} xl="4" lg="6" md="6" sm="12" xs="12">
              <ProgramCard program={program} />
            </ColNoSpacing>
          );
        })}
    </Container>
  );
};

export default observer(GridLayout);

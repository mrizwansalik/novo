import { observer } from "mobx-react";
import { ICarrierPlan } from "src/interfaces/benefit";
import useStore from "src/utils/useStore";
import { shouldShowProgram } from "../../../../utils";
import ProgramCard from "../../../ProgramCard";
import { Container, ColNoSpacing, ScrollWrapper } from "./listLayout.styles";

interface IListLayoutProps {
  programs: ICarrierPlan[];
}

const ListLayout = ({ programs }: IListLayoutProps) => {
  const { prospectProgramsStore } = useStore();
  const { filterText } = prospectProgramsStore;

  return (
    <Container>
      <ScrollWrapper>
        {Array.isArray(programs) &&
          programs.map((program) => {
            if (shouldShowProgram(program, filterText)) {
              return (
                <ColNoSpacing
                  key={program.id}
                  xl="4"
                  lg="6"
                  md="6"
                  sm="12"
                  xs="12"
                >
                  <ProgramCard program={program} />
                </ColNoSpacing>
              );
            }
            return <></>;
          })}
      </ScrollWrapper>
    </Container>
  );
};

export default observer(ListLayout);

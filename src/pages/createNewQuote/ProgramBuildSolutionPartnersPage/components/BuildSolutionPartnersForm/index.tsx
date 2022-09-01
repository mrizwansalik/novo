import ColNoSpacing from "src/components/ColNoSpacing";
import ProgramSection from "../../../../../components/Pages/ProgramBuild/SolutionPartnersProgramSection";
import SideMenu from "../../../components/NetworkForm/SideMenu";
import { Container } from "./buildSolutionPartnersForm.styles";

interface IBuildSolutionPartnersFormProps {
  onCreate: () => void;
}

const BuildSolutionPartnersForm = (props: IBuildSolutionPartnersFormProps) => {
  const { onCreate } = props;
  return (
    <Container>
      <ColNoSpacing lg="3">
        <SideMenu />
      </ColNoSpacing>
      <ColNoSpacing lg="9">
        <ProgramSection onCreate={onCreate} />
      </ColNoSpacing>
    </Container>
  );
};

export default BuildSolutionPartnersForm;

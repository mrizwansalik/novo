import ColNoSpacing from "src/components/ColNoSpacing";
import ProgramSection from "../../../../../components/Pages/ProgramBuild/TPAProgramSection";
import SideMenu from "../../../components/NetworkForm/SideMenu";
import { Container } from "./buildNetworkForm.styles";

interface IBuildNetworkFormProps {
  onCreate: () => void;
}

const BuildNetworkForm = (props: IBuildNetworkFormProps) => {
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

export default BuildNetworkForm;

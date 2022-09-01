import ColNoSpacing from "src/components/ColNoSpacing";
import { ITpa } from "src/interfaces/benefit";
import OptionSection from "../OptionSection";
import PreviewSection from "../PreviewSection";
import ProgramSection from "../ProgramSelect";
import { Container } from "./contents.styles";

interface IContentsProps {
  tpa: ITpa;
  tpaOrder: number;
}

const Contents = (props: IContentsProps) => {
  const { tpa, tpaOrder } = props;

  return (
    <Container>
      <ColNoSpacing xl="2" lg="12" md="12" sm="12" xs="12">
        <ProgramSection tpaOrder={tpaOrder} tpa={tpa} />
      </ColNoSpacing>
      <ColNoSpacing xl="2" lg="12" md="12" sm="12" xs="12">
        <OptionSection tpaOrder={tpaOrder} tpa={tpa} />
      </ColNoSpacing>
      <ColNoSpacing xl="8" lg="12" md="12" sm="12" xs="12">
        <PreviewSection tpaOrder={tpaOrder} tpa={tpa} />
      </ColNoSpacing>
    </Container>
  );
};

export default Contents;

import { useEffect, useState } from "react";
import { groupBy } from "lodash";
import ColNoSpacing from "src/components/ColNoSpacing";
import { networkIngredientTypes } from "src/constants/tpa";
import { ITpa } from "src/interfaces/benefit";
import OptionSection from "../OptionSection";
import PreviewSection from "../PreviewSection";
import ProgramSection from "../ProgramSelect";
import { Container } from "./contents.styles";

interface IContentsProps {
  tpa: ITpa;
}

const Contents = (props: IContentsProps) => {
  const { tpa } = props;
  const [activeTab, setActiveTab] = useState("");

  const ingredientTypes = groupBy(networkIngredientTypes, "short_name");

  useEffect(() => {
    if (!activeTab) {
      setActiveTab(Object.keys(ingredientTypes)[0]);
    }
  }, []);

  return (
    <Container>
      <ColNoSpacing xl="2" lg="12" md="12" sm="12" xs="12">
        <ProgramSection
          tpa={tpa}
          ingredientTypes={ingredientTypes}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ColNoSpacing>
      <ColNoSpacing xl="2" lg="12" md="12" sm="12" xs="12">
        <OptionSection tpa={tpa} activeTab={activeTab} />
      </ColNoSpacing>
      <ColNoSpacing xl="8" lg="12" md="12" sm="12" xs="12">
        <PreviewSection tpa={tpa} />
      </ColNoSpacing>
    </Container>
  );
};

export default Contents;

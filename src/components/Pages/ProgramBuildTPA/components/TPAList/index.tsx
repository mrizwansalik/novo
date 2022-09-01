import React from "react";
import { observer } from "mobx-react";
import ColNoSpacing from "src/components/ColNoSpacing";
import { ITpa } from "src/interfaces/benefit";
import useStore from "src/utils/useStore";
import CollapseHeader from "../CollapseHeader";
import TpaCard from "../TpaCard";
import { CardWrapper, Container } from "./TPAList.styles";

export const TpaList = () => {
  const { programBuildTpaStore } = useStore();
  const { filteredTpas } = programBuildTpaStore;

  return (
    <Container>
      <ColNoSpacing xl="12" lg="12" md="12" sm="12" xs="12">
        <CollapseHeader />
      </ColNoSpacing>
      {Array.isArray(filteredTpas) &&
        filteredTpas.map((tpa: ITpa, index: number) => {
          return (
            <CardWrapper key={index} xl="12" lg="12" md="12" sm="12" xs="12">
              <TpaCard tpa={tpa} />
            </CardWrapper>
          );
        })}
    </Container>
  );
};

export default observer(TpaList);

import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import useStore from "src/utils/useStore";
import EditForm from "./components/EditForm";
import { Containers, Title, MainContainer, SubTitle } from "./style";

interface IParamsType {
  programId: any;
}
const EditSavedProgramPage = () => {
  const { savedProgramStore } = useStore();
  const { getDetailOfProgram } = savedProgramStore;
  const { programId } = useParams<IParamsType>();

  useEffect(() => {
    getDetailOfProgram(localStorage.getItem("orgId"), programId);
  }, []);

  return (
    <MainContainer>
      <Title>EDIT CUSTOM PROGRAM</Title>
      <SubTitle>STOP-LOSS VARIABLES</SubTitle>
      <Containers>
        <EditForm />
      </Containers>
    </MainContainer>
  );
};

export default observer(EditSavedProgramPage);

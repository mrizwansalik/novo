import { useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useFormContext, useWatch } from "react-hook-form";
import { useParams } from "react-router";
import ColNoSpacing from "src/components/ColNoSpacing";
import { ThirdPartyAdministratorFormValues } from "src/constants";
import { ITpa } from "src/interfaces/benefit";
import { ISubNetwork } from "src/interfaces/network";
import useStore from "src/utils/useStore";
import CollapseHeader from "../CollapseHeader";
import ProgramCard from "../ProgramCard";
import { useRenderValues } from "./hooks";
import { Container, CardWrapper, ProgramReference } from "./TPAList.styles";

interface IProgramListProps {
  title: string;
  selectedSubNetworks: ISubNetwork[];
}

export const ProgramList = (props: IProgramListProps) => {
  const { title } = props;
  const { control } = useFormContext();
  const searchKeyword = useWatch({
    control,
    name: ThirdPartyAdministratorFormValues.SEARCH_KEYWORD,
  });
  const [
    totalOfProviderAccesses,
    totalOfPharmacyBenefitManager,
    totalOfOthers,
  ] = useRenderValues();
  const { programBuildStore } = useStore();
  const params = useParams();
  const orgId: string =
    get(params, "orgId", "") || get(params, "brokerageId", "");

  const handleChangeSearchKeyword = useCallback(
    debounce((keyword: string) => {
      programBuildStore?.fetchThirdPartyAdministrators(orgId, keyword);
    }, 800),
    []
  );

  useEffect(() => {
    handleChangeSearchKeyword(searchKeyword);
  }, [searchKeyword]);

  return (
    <Container withSpacing={!title}>
      {title && programBuildStore?.tpas?.length > 0 && (
        <ProgramReference>{title}</ProgramReference>
      )}
      <ColNoSpacing xl="12" lg="12" md="12" sm="12" xs="12">
        <CollapseHeader />
      </ColNoSpacing>
      {Array.isArray(programBuildStore?.tpas) &&
        programBuildStore?.tpas?.map((tpa: ITpa, index: number) => {
          return (
            <CardWrapper key={index} xl="12" lg="12" md="12" sm="12" xs="12">
              <ProgramCard
                totalOfProviderAccesses={totalOfProviderAccesses}
                totalOfPharmacyBenefitManager={totalOfPharmacyBenefitManager}
                totalOfOthers={totalOfOthers}
                tpaOrder={index}
                tpa={tpa}
              />
            </CardWrapper>
          );
        })}
    </Container>
  );
};

export default observer(ProgramList);

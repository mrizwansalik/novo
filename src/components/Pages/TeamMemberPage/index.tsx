import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react";
import { useForm, FormProvider } from "react-hook-form";
import { Row, Col } from "reactstrap";
import useStore from "../../../utils/useStore";
import MemberForm from "./components/MemberForm";
import MemberHeader from "./components/MemberHeader";
import MemberTable from "./components/MemberTable";
import { IMemberForm } from "./interfaces";
import { Layout } from "./styles";
import { validationSchema } from "./utils";

interface IProps {
  header?: string;
}

const TeamMemberPage = (props: IProps) => {
  const { header } = props;
  const methods = useForm<IMemberForm>({
    reValidateMode: "onChange",
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });
  const { workerStore, orgStore } = useStore();
  const { orgDetail } = orgStore;

  useEffect(() => {
    if (orgDetail?.id) {
      workerStore.getWorkers(orgDetail.id);
    }
  }, [orgDetail]);

  return (
    <FormProvider {...methods}>
      <Layout>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <MemberHeader header={header} />
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <MemberTable />
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <MemberForm />
          </Col>
        </Row>
      </Layout>
    </FormProvider>
  );
};

export default observer(TeamMemberPage);

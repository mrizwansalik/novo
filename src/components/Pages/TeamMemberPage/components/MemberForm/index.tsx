import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { observer } from "mobx-react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router";
import { Form } from "reactstrap";
import useStore from "../../../../../utils/useStore";
import { MemberFormValues } from "../../constants";
import { IMemberForm } from "../../interfaces";
import { handleCreateWorker } from "../../utils/workerForm";
import {
  BigPlus,
  Container,
  FormLayout,
  InputGroupWithStyle,
  ButtonContainer,
} from "./styles";

const MemberForm = () => {
  const { register, handleSubmit, formState } = useFormContext<IMemberForm>();
  const { orgStore, workerStore } = useStore();
  const { orgDetail } = orgStore;
  const { errors } = formState;
  const { carrierId } = useParams<{
    carrierId: string;
  }>();

  return (
    <Form name="add-member-form">
      <Container>
        <FormLayout md="3">
          <InputGroupWithStyle
            name={MemberFormValues.FIRST_NAME}
            label="First Name"
            placeHolder="e.g Don"
            {...register(MemberFormValues.FIRST_NAME)}
            error={get(errors, `${MemberFormValues.FIRST_NAME}.message`, "")}
          />
        </FormLayout>
        <FormLayout md="3">
          <InputGroupWithStyle
            name={MemberFormValues.LAST_NAME}
            label="Last Name"
            placeHolder="e.g Draper"
            {...register(MemberFormValues.LAST_NAME)}
            error={get(errors, `${MemberFormValues.LAST_NAME}.message`, "")}
          />
        </FormLayout>
        <FormLayout md="5">
          <InputGroupWithStyle
            name={MemberFormValues.EMAIL}
            label="Email"
            placeHolder="e.g eng+draper@novoconnection.com"
            {...register(MemberFormValues.EMAIL)}
            error={get(errors, `${MemberFormValues.EMAIL}.message`, "")}
          />
        </FormLayout>
        <ButtonContainer md="1">
          <BigPlus
            active={isEmpty(errors)}
            onClick={handleSubmit((formValue: IMemberForm) =>
              handleCreateWorker(
                workerStore,
                formValue,
                carrierId ? carrierId : orgDetail.id,
                carrierId ? false : true
              )
            )}
          >
            +
          </BigPlus>
        </ButtonContainer>
      </Container>
    </Form>
  );
};

export default observer(MemberForm);

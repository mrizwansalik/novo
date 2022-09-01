import { Fragment } from "react";
import { useFormContext, Controller } from "react-hook-form";
import Icon from "src/components/Icon";
import { IPhqDocument } from "src/interfaces/benefit";
import { IWorker } from "src/interfaces/worker";
import { showStatusBadge, getDocumentsStatus } from "./utils";
import {
  Container,
  InputSection,
  InformationSection,
  ArrowSection,
  WorkerName,
  WorkerEmail,
  StatusBadge,
} from "./workDetail.styles";

interface IWorkerDetailProps {
  onClickArrow: () => void;
  worker: IWorker;
  documents: IPhqDocument[];
}

const WorkerDetail = (props: IWorkerDetailProps) => {
  const { onClickArrow, worker, documents } = props;
  const { label, iconName, status } = getDocumentsStatus(documents);
  const { control } = useFormContext();

  return (
    <Fragment>
      {worker?.id && (
        <Container>
          <Controller
            name={`workers[${worker?.id}]`}
            control={control}
            render={({ field }) => {
              return (
                <InputSection
                  {...field}
                  checked={field?.value}
                  type="checkbox"
                />
              );
            }}
          />
          <InformationSection>
            <WorkerName>{worker?.name}</WorkerName>
            <WorkerEmail>{worker?.email}</WorkerEmail>
            {showStatusBadge(documents) && (
              <StatusBadge submitStatus={status}>
                <Icon iconName={iconName} />
                <span>{label}</span>
              </StatusBadge>
            )}
          </InformationSection>
          <ArrowSection
            onClick={onClickArrow}
            iconName="blue-circle-arrow-right.png"
          />
        </Container>
      )}
    </Fragment>
  );
};

export default WorkerDetail;

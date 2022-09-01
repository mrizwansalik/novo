import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Icon from "src/components/Icon";
import Modal from "src/components/Modal";
import { IOption } from "src/interfaces/common";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import { IWorker } from "../../utils";
import {
  StyledModal,
  StyledModalHeader,
  ModalTitle,
  DeleteButton,
  EmployeeName,
  StyledModalBody,
  Email,
  PhoneNumber,
  TableHeader,
  HeaderContent,
  TableBodyRow,
  BodyContent,
  StyledContainer,
  CloseIcon,
  DownloadIcon,
  Questionnaire,
  StyledSingleSelect,
  DeleteModalBody,
  PrimaryButton,
  SecondaryButton,
} from "./styles";
interface IEmployeeProfileModalProps {
  isOpen?: boolean;
  toggle?: () => void;
  data?: IWorker;
  submissionType?: string;
}
enum SignatureState {
  FULLY_SIGNED = "fully_signed",
  NEEDS_SIGNATURES = "needs_signatures",
}
enum SubmissionType {
  AWAITING = "awaiting",
  UN_SUBMITTED = "unsubmitted",
  SUBMITTED = "submitted",
}
const headerList = ["Questionnaire", "Signature", "Updated", "Submission"];
const submitFormOptions = [
  {
    value: "unsubmitted",
    label: "Requires Action",
  },
  {
    value: "submitted",
    label: "Submitted",
  },
];
const submittedOptions = [
  {
    value: "submitted",
    label: "Submitted",
  },
  {
    value: "accepted",
    label: "Accepted",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
];
function getDefaultOption(value: string, options: IOption[]): IOption {
  return options.find((item) => item.value === value);
}
const EmployeeProfileModal = (props: IEmployeeProfileModalProps) => {
  const { isOpen, toggle, data, submissionType } = props;
  const { prospectId } = useParams<IParamTypes>();
  const history = useHistory();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { healthHistoryStore } = useStore();
  async function handleOnChange(value: string, document) {
    healthHistoryStore.updateWorkerDocumentStatus(
      prospectId,
      data.id,
      document.worker_document_id,
      value
    );
  }
  async function handleDeleteWorker() {
    await healthHistoryStore.deleteWorker(data.id);
    await healthHistoryStore.fetchWorkerData(prospectId);
    setIsDeleteModalOpen(false);
    toggle();
    toast.success("Employee deleted!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);
  return (
    <StyledModal isOpen={isOpen} toggle={toggle}>
      <StyledModalHeader>
        <ModalTitle>Employee Profile</ModalTitle>
        <DeleteButton
          label="Delete employee"
          onClick={() => setIsDeleteModalOpen(true)}
        />
        <CloseIcon iconName="cross-blue.png" size={10} onClick={toggle} />
      </StyledModalHeader>
      <StyledModalBody>
        <EmployeeName>{data?.name}</EmployeeName>
        <Email>{data?.email}</Email>
        <PhoneNumber>{`(${data?.phone.slice(0, 3)}) ${data?.phone.slice(
          0,
          3
        )}-${data?.phone.slice(0, 4)}`}</PhoneNumber>

        <StyledContainer>
          <TableHeader>
            <HeaderContent md={5}>Questionnaire</HeaderContent>
            <HeaderContent md={2}>Signature</HeaderContent>
            <HeaderContent md={2}>Updated</HeaderContent>
            <HeaderContent md={3}>Submission</HeaderContent>
          </TableHeader>
          {Array.isArray(data?.documents) &&
            data?.documents.length > 0 &&
            data?.documents.map((item) => (
              <TableBodyRow isSigned={item.signature === "Signed"}>
                <BodyContent md={5}>
                  <Questionnaire isSigned={item.signature === "Signed"}>
                    {item.name}
                  </Questionnaire>
                  <DownloadIcon className="download">
                    <Icon iconName="grey-download-tray.png" size={24} />
                  </DownloadIcon>
                </BodyContent>
                <BodyContent md={2}>
                  {item.signature_state === SignatureState.FULLY_SIGNED
                    ? "Signed"
                    : "Unsigned"}
                </BodyContent>
                <BodyContent md={2}>
                  {moment(item.updated).format("MMM DD, YYYY")}
                </BodyContent>
                <BodyContent md={3}>
                  {submissionType !== SubmissionType.AWAITING &&
                    (submissionType === SubmissionType.UN_SUBMITTED ? (
                      <StyledSingleSelect
                        options={submitFormOptions}
                        defaultValue={getDefaultOption(
                          item.status,
                          submitFormOptions
                        )}
                        onChange={(e) => handleOnChange(e.value, item)}
                      />
                    ) : (
                      <StyledSingleSelect
                        options={submittedOptions}
                        defaultValue={getDefaultOption(
                          item.status,
                          submittedOptions
                        )}
                        onChange={(e) => handleOnChange(e.value, item)}
                      />
                    ))}
                </BodyContent>
              </TableBodyRow>
            ))}
        </StyledContainer>
      </StyledModalBody>
      <Modal
        isOpen={isDeleteModalOpen}
        toggle={() => setIsDeleteModalOpen(false)}
        body={
          <DeleteModalBody>
            <h5>{`ARE YOU SURE YOU WANT TO DELETE ${data?.name}?`}</h5>
            <div>
              <PrimaryButton label="Yes" onClick={() => handleDeleteWorker()} />
              <SecondaryButton
                label="No"
                onClick={() => setIsDeleteModalOpen(false)}
              />
            </div>
          </DeleteModalBody>
        }
      />
    </StyledModal>
  );
};

export default observer(EmployeeProfileModal);

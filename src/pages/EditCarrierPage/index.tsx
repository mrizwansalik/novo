import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import Button from "src/components/Button";
import ConfirmModal from "src/components/ConfirmModal";
import FileUploader from "src/components/FileUploader";
import PageLayout from "src/components/PageLayout";
import {
  CarrierBox,
  CarrierLogo128,
  CarrierLogoNo,
  Dotted,
} from "src/components/Pages/CarrierListPage/components/CarrierList/styles";
import TeamMemberPage from "src/components/Pages/TeamMemberPage";
import { BaseFilePath } from "src/constants";
import { IStopLossCarrier } from "src/interfaces/carrier";
import routes from "src/routes";
import useStore from "src/utils/useStore";
import {
  StyledButton,
  Title,
  StyledInput,
  StyledCheckbox,
  Circle,
  EditCarrierPageContainer,
  StyledLabel,
} from "./styles";

interface IParamsType {
  carrierId: string;
}

const customAllowFileTypes = ["image/*"];

const EmptyCarrier = {
  address: "",
  blog: "",
  carrier_type: "stop_loss",
  city: null,
  country: null,
  desc: "",
  facebook: "",
  fax: "",
  filestack_picture: "",
  id: "",
  is_standard: true,
  is_underwriter: false,
  linkedin: "",
  name: "",
  non_square_picture_thumbnail_64: "",
  non_square_picture_thumbnail_128: "",
  non_square_picture_thumbnail_256: "",
  non_square_picture_thumbnail_512: "",
  phone: "",
  picture: "",
  picture_thumbnail_64: "",
  picture_thumbnail_128: "",
  picture_thumbnail_256: "",
  picture_thumbnail_512: "",
  postal: "",
  region: null,
  suite_number: "",
  twitter: "",
  website: null,
  workers: [],
};

const EditCarrierPage = () => {
  const history = useHistory();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenModalUpload, setIsOpenModalUpload] = useState(false);
  const [carrier, setCarrier] = useState<IStopLossCarrier>(EmptyCarrier);
  const [showMember, setShowMember] = useState(false);
  const { carrierListStore, workerStore } = useStore();
  const { carrierList, carrierDisplayList } = carrierListStore;
  const { carrierId } = useParams<IParamsType>();
  function onDeleteLogo() {
    setCarrier({ ...carrier, picture: "", picture_thumbnail_128: "" });
  }
  async function onSaveCarrier() {
    const data = await carrierListStore.updateStopLossCarrier(carrier);
    if (data.id) {
      toast.success(data.name + " updated.");
    } else {
      toast.error("There was an error updating " + carrier.name);
    }
    history.push(routes.dashboard.god.carriers.list.value);
  }
  async function onDeleteConfirm() {
    const data = await carrierListStore.deleteCarrier(carrier.id);
    toast.success(carrier.name + " deleted.");
    setIsOpenConfirmModal(false);
    history.push(routes.dashboard.god.carriers.list.value);
  }
  useEffect(() => {
    carrierListStore.getCarrierList();
  }, []);

  useEffect(() => {
    if (carrierDisplayList.length) {
      setCarrier(
        carrierDisplayList.find((i) => i.id === carrierId) || EmptyCarrier
      );
    }
  }, [carrierDisplayList.length]);

  useEffect(() => {
    if (carrierId) {
      workerStore.getWorkers(carrierId);
    }
  }, [carrierId]);

  return (
    <PageLayout title="Edit Carrier | Novo Connection">
      <EditCarrierPageContainer>
        <Container>
          <Row>
            <Col md={{ size: 6, offset: 2 }}>
              <Title>
                Edit {carrierDisplayList?.find((i) => i.id === carrierId)?.name}
              </Title>
            </Col>
            <Col md={2}>
              <Circle onClick={(e) => setIsOpenConfirmModal(true)} />
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 1, offset: 2 }}>
              <StyledButton autoFocus onFocus={(e) => setShowMember(false)}>
                Info
              </StyledButton>
            </Col>
            <Col md={1}>
              <StyledButton onFocus={(e) => setShowMember(true)}>
                Team
              </StyledButton>
            </Col>
          </Row>
          {!showMember ? (
            <>
              <Row>
                <Col md={{ size: 4, offset: 2 }} xs={12}>
                  <StyledLabel>Name</StyledLabel>
                  <StyledInput
                    value={carrier.name}
                    onChange={(e) =>
                      setCarrier({ ...carrier, name: e.target.value })
                    }
                  />
                  <StyledCheckbox
                    checked={carrier.is_underwriter}
                    onChange={(e) =>
                      setCarrier({
                        ...carrier,
                        is_underwriter: e.target.checked,
                      })
                    }
                  />
                  <label style={{ fontWeight: 300 }}>Is Underwriter</label>
                </Col>
                <Col md={4} xs={12}>
                  <StyledLabel>Logo</StyledLabel>
                  <CarrierBox>
                    {carrier.picture_thumbnail_128 ? (
                      <CarrierLogo128 src={carrier.picture_thumbnail_128} />
                    ) : (
                      <CarrierLogoNo />
                    )}
                    <Dotted />
                    <Button
                      label="Upload Logo"
                      onClick={(e) => setIsOpenModalUpload(true)}
                    />
                    <Button
                      className="float-end"
                      color="danger"
                      label="Delete"
                    />
                  </CarrierBox>
                </Col>
              </Row>
              <Row>
                <Col md={{ size: 10, offset: 2 }}>
                  <Button
                    size="lg"
                    color="primary"
                    label="Save"
                    onClick={onSaveCarrier}
                  />
                  <Button
                    style={{ marginLeft: 5 }}
                    size="lg"
                    label="Cancel"
                    onClick={(e) =>
                      history.push(routes.dashboard.god.carriers.list.value)
                    }
                  />
                </Col>
              </Row>
            </>
          ) : (
            <TeamMemberPage header={carrier.name} />
          )}
          <ConfirmModal
            toggle={() => setIsOpenConfirmModal(false)}
            isOpen={isOpenConfirmModal}
            title={`Are you sure you want to remove ${carrier.name}`}
            acceptText="Yes, remove it"
            rejectText="No, keep it"
            acceptCallback={onDeleteConfirm}
            rejectCallback={() => setIsOpenConfirmModal(false)}
          />
          <FileUploader
            isOpen={isOpenModalUpload}
            customAllowFileTypes={customAllowFileTypes}
            onRequestClose={() => setIsOpenModalUpload(false)}
            filePath={BaseFilePath.PUBLIC}
            onUploadSuccess={(logoFile) => {
              setCarrier({
                ...carrier,
                picture: logoFile.file,
                picture_thumbnail_128: logoFile.file,
              });
              setIsOpenModalUpload(false);
            }}
          />
        </Container>
      </EditCarrierPageContainer>
    </PageLayout>
  );
};

export default EditCarrierPage;

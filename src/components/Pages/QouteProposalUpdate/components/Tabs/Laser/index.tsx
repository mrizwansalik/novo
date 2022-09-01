import { useState } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmModal from "src/components/ConfirmModal";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import {
  HeaderLayout,
  ActionSheetContainer,
  Header,
  HeaderContainer,
  InputLabel,
  TextBox,
  RightContainer,
  RightContainerSection,
  AddButton,
  AddLabel,
  BrokerageCount,
  StyledInput,
  RightContainerHeaders,
  RightSectionContent,
  ActionButton,
  IconWraper,
  CancelButton,
  AddButtonGroup,
  StyledNumberInput,
} from "./style";

const laserData = {
  name: "",
  amount: 0,
  notes: "",
};
const EditLaser = {
  amount: 0,
  created: "",
  id: "",
  modified: "",
  name: "",
  notes: "",
};

const Update = () => {
  const { brokerageId, prospectId, rfpId } = useParams<IParamTypes>();
  const { qouteRFPsStore } = useStore();
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [editLaser, setEditLaser] = useState(false);
  const [laserId, setLaserId] = useState("");
  const [laserItem, setLaserItem] = useState(EditLaser);
  const [laser, setLaser] = useState(laserData);
  const {
    qouteLasers,
    addQouteLasers,
    getQouteLasers,
    updateQouteLasers,
    deleteQouteLasers,
  } = qouteRFPsStore;

  const handleSave = () => {
    const res = addQouteLasers(prospectId, rfpId, laser);
    if (res) {
      getQouteLasers(prospectId, rfpId);
    }
  };
  async function onDeleteConfirm() {
    toast.info("Removing program...");

    await deleteQouteLasers(prospectId, rfpId, laserId);
    toast.success("Program removed.");
    setLaserId("");
    setIsConfirmModal(false);
    getQouteLasers(prospectId, rfpId);
  }
  const handleEdit = async () => {
    const res = await updateQouteLasers(
      prospectId,
      rfpId,
      laserItem.id,
      laserItem
    );
    if (res) {
      getQouteLasers(prospectId, rfpId);
      setEditLaser(false);
    }
  };
  return (
    <HeaderContainer>
      <HeaderLayout md={9}>
        <ActionSheetContainer>
          <Header>Fill out information below for lasers.</Header>
          <BrokerageCount md={3}>
            <InputLabel>Name</InputLabel>
            <StyledInput
              onChange={(e) => {
                setLaser({
                  ...laser,
                  name: e.target.value,
                });
              }}
            />
          </BrokerageCount>
          <BrokerageCount md={3}>
            <InputLabel>Amount</InputLabel>
            <StyledInput
              onChange={(e) => {
                setLaser({
                  ...laser,
                  amount: JSON.parse(e.target.value),
                });
              }}
            />
          </BrokerageCount>
          <InputLabel>Notes</InputLabel>
          <TextBox
            onChange={(e) => {
              setLaser({
                ...laser,
                notes: e.target.value,
              });
            }}
            style={{ height: "112px" }}
          />
        </ActionSheetContainer>

        <AddButton onClick={() => handleSave()}>
          <AddLabel>Add Laser</AddLabel>
        </AddButton>
      </HeaderLayout>
      <RightContainer md={3}>
        <RightContainerSection>
          <RightContainerHeaders>Lasers</RightContainerHeaders>
          {qouteLasers.map((item) => {
            return (
              <RightSectionContent>
                {item.id === laserItem?.id && editLaser ? (
                  <>
                    <BrokerageCount md={8} style={{ marginBottom: "2%" }}>
                      <StyledInput
                        value={laserItem.name}
                        onChange={(e) => {
                          setLaserItem({
                            ...laserItem,
                            name: e.target.value,
                          });
                        }}
                      />
                    </BrokerageCount>
                    <BrokerageCount md={8} style={{ marginBottom: "2%" }}>
                      <StyledNumberInput
                        value={`$ ${laserItem.amount}`}
                        onChange={(e) => {
                          setLaserItem({
                            ...laserItem,
                            amount: e.target.value,
                          });
                        }}
                      />
                    </BrokerageCount>
                    <TextBox
                      style={{ backgroundColor: "white" }}
                      value={laserItem.notes}
                      onChange={(e) => {
                        setLaserItem({
                          ...laserItem,
                          notes: e.target.value,
                        });
                      }}
                    />
                    <AddButtonGroup>
                      <AddButton onClick={() => handleEdit()}>
                        <AddLabel>Save</AddLabel>
                      </AddButton>
                      <CancelButton onClick={() => setEditLaser(false)}>
                        Cancel
                      </CancelButton>
                    </AddButtonGroup>
                  </>
                ) : (
                  <>
                    <ActionButton>
                      <IconWraper
                        iconName="trash-grey.png"
                        size={24}
                        onClick={() => {
                          setIsConfirmModal(true);
                          setLaserId(item.id);
                        }}
                      ></IconWraper>
                      <IconWraper
                        iconName="black_pencil.png"
                        size={24}
                        onClick={() => {
                          setLaserItem(item);
                          setEditLaser(true);
                        }}
                      ></IconWraper>
                    </ActionButton>
                    <div>{item?.name}</div>
                    <div>{item?.amount}</div>
                    <div>{item?.notes}</div>
                  </>
                )}
              </RightSectionContent>
            );
          })}
        </RightContainerSection>
      </RightContainer>
      <ConfirmModal
        toggle={() => setIsConfirmModal(!isConfirmModal)}
        isOpen={isConfirmModal}
        title="Are you sure you want to remove this Laser ?"
        acceptText="Yes, remove it"
        rejectText="No, keep it"
        acceptCallback={onDeleteConfirm}
        rejectCallback={() => setIsConfirmModal(false)}
      />
    </HeaderContainer>
  );
};

export default observer(Update);

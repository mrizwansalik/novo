import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { removeOrgPlanFromExistingPlans } from "src/api/quote";
import Icon from "src/components/Icon";
import Modal from "src/components/Modal";
import useStore from "src/utils/useStore";
import {
  ComponentContainer,
  ModalBody,
  NoPlan,
  PlanItem,
  PlansBody,
  PlansHeader,
  PrimaryButton,
  SecondaryButton,
} from "./addedPlansBox.style";

const AddedPlansBox = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>();

  const { existingPlansStore } = useStore();
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");
  const currentPlanId = get(params, "planId");
  const { existingPlans } = existingPlansStore;

  const history = useHistory();
  const { pathname } = useLocation();

  function handleOpenDeleteModal(planId: string) {
    setSelectedPlanId(planId);
    setIsDeleteModalOpen(true);
  }

  async function handleDeletePlan(planId: string) {
    try {
      toast.info("Removing plan...");
      await removeOrgPlanFromExistingPlans(prospectId, planId);
      existingPlansStore.removeExistingPlan(planId);
      toast.success("Plan removed.");
      if (currentPlanId === planId) {
        const pathElement = pathname.split("/");
        pathElement.pop();
        history.push(pathElement.join("/"));
      }
    } catch (e) {
      toast.error("There was an error removing the plan.");
    }
  }

  function handleClickEditPlan(planId: string) {
    if (currentPlanId) {
      const pathElement = pathname.split("/");
      pathElement[pathElement.length - 1] = planId;
      history.push(pathElement.join("/"));
    } else {
      if (pathname[pathname.length - 1] === "/") {
        history.push(pathname + planId);
      } else {
        history.push(`${pathname}/${planId}`);
      }
    }
  }

  useEffect(() => {
    if (prospectId) {
      existingPlansStore.getExistingPlans(prospectId);
    }
  }, [prospectId]);

  return (
    <ComponentContainer>
      <PlansHeader>
        <h2>Your Plans</h2>
      </PlansHeader>
      <PlansBody>
        {Array.isArray(existingPlans) ? (
          existingPlans.map((plan) => (
            <PlanItem key={plan.id}>
              <h3>{plan.name}</h3>
              <div>
                <Icon
                  iconName="black_pencil.png"
                  size={24}
                  onClick={() => handleClickEditPlan(plan.id)}
                />
                <Icon
                  iconName="trash-black.png"
                  size={24}
                  onClick={() => handleOpenDeleteModal(plan.id)}
                />
              </div>
            </PlanItem>
          ))
        ) : (
          <NoPlan> No plans added yet.</NoPlan>
        )}
      </PlansBody>

      <Modal
        isOpen={isDeleteModalOpen}
        toggle={() => setIsDeleteModalOpen(false)}
        body={
          <ModalBody>
            <h5>Are you sure you want to delete this plan?</h5>
            <div>
              <PrimaryButton
                label="Delete"
                onClick={() => {
                  handleDeletePlan(selectedPlanId);
                  setIsDeleteModalOpen(false);
                }}
              />
              <SecondaryButton
                label="Cancel"
                onClick={() => setIsDeleteModalOpen(false)}
              />
            </div>
          </ModalBody>
        }
      />
    </ComponentContainer>
  );
};

export default observer(AddedPlansBox);

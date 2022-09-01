import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import {
  StatusInfoContainer,
  Description,
  Instruction,
  PublicShareLink,
  Link,
  ReferralLink,
  LinkIcon,
} from "./styles";

const referralLinks = {
  EMPLOYEE_PHQ_FAQ:
    "https://answers.allay.io/article/67-employee-faq-on-personal-health-questionnaires-phq",
  CHANGING_PHQ_ANSWERS:
    "https://answers.allay.io/article/69-how-to-change-your-answers-to-a-personal-health-questionnaire-phq",
};

const InfoContainer = () => {
  const { healthHistoryStore, brokerProspectsListStore } = useStore();
  const [isInstructionDisplay, setIsInstructionDisplay] = useState(true);
  const { workerSignupToken } = healthHistoryStore;
  const { currentProspectProgress } = brokerProspectsListStore;
  const shareLinkRef = useRef(null);
  const { prospectId } = useParams<IParamTypes>();
  const history = useHistory();

  const handleCopy = () => {
    toast.dismiss();
    const text = shareLinkRef.current.innerText;
    const textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = text;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    toast.success("Copied public share link to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      style: {
        width: "320px",
      },
    });
  };
  useEffect(() => {
    if (currentProspectProgress?.phq_status === "locked") {
      setIsInstructionDisplay(false);
    } else {
      setIsInstructionDisplay(true);
    }
  }, [currentProspectProgress]);
  return (
    <StatusInfoContainer>
      <Description>
        Invite Employees to complete personal health questionnaires. PHQs are
        required for underwriting when there is not sufficient claims history.
      </Description>
      {isInstructionDisplay && (
        <Instruction>
          <LinkIcon iconName="link-blue.png" size={1} width={24} height={12} />
          Share this questionnaire via a{" "}
          <PublicShareLink onClick={handleCopy}>
            public share link.
          </PublicShareLink>
          <Link ref={shareLinkRef}>
            {`${process?.env?.REACT_APP_URL}/signup/org/${workerSignupToken}`}
          </Link>
          You may want to include the following links when sharing the referral
          link:&nbsp;
          <ReferralLink href={referralLinks.EMPLOYEE_PHQ_FAQ} target="_blank">
            Employee PHQ FAQ
          </ReferralLink>
          ,&nbsp;
          <ReferralLink
            href={referralLinks.CHANGING_PHQ_ANSWERS}
            target="_blank"
          >
            Changing PHQ Answers
          </ReferralLink>
        </Instruction>
      )}
    </StatusInfoContainer>
  );
};

export default observer(InfoContainer);

import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { Link, useParams } from "react-router-dom";
import useStore from "src/utils/useStore";
import {
  Container,
  CardLayout,
  Title,
  InputLink,
  CopyButton,
  RefLinkSection,
  RefLinkTitle,
  RefLinkButton,
  LinkSection,
  TooltipContainer,
  HideScrollBar,
} from "./inviteCard.styles";
import { handleCopy } from "./utils";

const InviteCard = () => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipMessage, setTooltipMessage] = useState("Copy to clipboard");
  const tooltipRef = useRef();
  const copyRef = useRef();
  const { workerStore } = useStore();
  const { workerSignUpToken } = workerStore;
  const params = useParams();
  const prospectId: string = get(params, "prospectId", "");

  useEffect(() => {
    if (prospectId) {
      workerStore?.createWorkerSignUpToken(prospectId);
    }
  }, [prospectId]);

  return (
    <Container md="12">
      <CardLayout>
        <Title md="12">Share the PHQ invite link for 213123:</Title>
        <LinkSection md="8">
          <InputLink
            innerRef={copyRef}
            value={`${process?.env?.REACT_APP_URL}/signup/org/${workerSignUpToken}`}
          />
          <CopyButton
            innerRef={tooltipRef}
            label="COPY"
            onClick={() => handleCopy(copyRef, setTooltipMessage)}
            onMouseLeave={() => {
              setShowTooltip(false);
            }}
            onMouseOver={() => {
              setTooltipMessage("Copy to clipboard");
              setShowTooltip(true);
            }}
          />
          <TooltipContainer
            isOpen={showTooltip}
            placement="top"
            target={tooltipRef}
          >
            {tooltipMessage}
          </TooltipContainer>
        </LinkSection>
        <RefLinkSection md="12">
          <RefLinkTitle>
            <span>
              You may want to include the following links when sharing the
              referral link:
            </span>
            <RefLinkButton>
              <Link to="#">Employee PHQ FAQ,</Link>
              <Link to="#">Changing PHQ Answers</Link>
            </RefLinkButton>
          </RefLinkTitle>
        </RefLinkSection>
      </CardLayout>
      <HideScrollBar />
    </Container>
  );
};

export default observer(InviteCard);

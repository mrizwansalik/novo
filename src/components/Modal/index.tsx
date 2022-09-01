import React from "react";
import {
  Modal as ReactStrapModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "reactstrap";

export interface IModalProps extends ModalProps {
  isOpen?: boolean;
  toggle?: () => void;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal = (props: IModalProps) => {
  const { isOpen, toggle, header, body, footer, external, ...rest } = props;

  return (
    <ReactStrapModal
      toggle={toggle}
      isOpen={isOpen}
      external={external}
      {...rest}
    >
      {header && <ModalHeader>{header}</ModalHeader>}
      {body && <ModalBody>{body}</ModalBody>}
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </ReactStrapModal>
  );
};

export default Modal;

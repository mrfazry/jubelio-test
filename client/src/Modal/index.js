import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function CustomModal(props) {
  const { open, title, body, actionButtons, toggle } = props;

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{actionButtons}</ModalFooter>
    </Modal>
  );
}

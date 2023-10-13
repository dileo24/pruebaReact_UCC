import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalComponent({
  showModal,
  handleModal,
  funcion,
  body,
  title,
}) {
  return (
    <Modal show={showModal} onHide={() => handleModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={funcion}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

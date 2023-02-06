import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


function AppModal(props) {
  return (
    <Modal
      {...props}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={props.ModalClass}
    >
      {/* <Modal.Header closeButton>
        </Modal.Header> */}
      <Modal.Body style={{padding: 0}}>
        {props.children}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default AppModal;

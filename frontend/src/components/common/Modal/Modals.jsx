import React, { memo } from 'react';
import Modal from 'react-bootstrap/Modal';

const Modals = ({ title, show, handleClose, onSubmit, children }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div>{children}</div>
    </Modal.Body>
    <Modal.Footer>
      <button type="button" className="btn btn-success" onClick={onSubmit}>
        Submit
      </button>
    </Modal.Footer>
  </Modal>
);
export default memo(Modals);

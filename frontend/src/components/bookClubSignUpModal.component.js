import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function BookClubSignUpModal(props){
    

    return(
        <Modal show={props.isOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>

        </Modal>
    );
}
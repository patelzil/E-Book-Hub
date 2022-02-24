import React from "react";
import {Button, Form} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'

export default function Signup() {
    return (
        <Modal.Dialog>
            <Modal.Header style={{justifyContent: "center"}}>
                <Modal.Title >Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-div">
                    <Form className="form">
                        <Form.Group className="mb-3 input-div" controlId="formFirstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="string" placeholder="Enter first name" />
                        </Form.Group>

                        <Form.Group className="mb-3 input-div" controlId="formLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="string" placeholder="Enter last name" />
                        </Form.Group>

                        <Form.Group className="mb-3 input-div" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3 input-div" controlId="formUserName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="string" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group className="mb-3 input-div" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3 input-div" controlId="formConPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder=" Confirm Password" />
                        </Form.Group>

                        <Button className="submit-button input-div" style={{width: "300px"}} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </Modal.Body>
        </Modal.Dialog>
    )
}

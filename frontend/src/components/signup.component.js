import React, {useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import axios from "axios";
import online_reading from '../assets/online_reading.svg'

export default function Signup() {
    const initialUser = {firstName: "", lastName: "", eMail: "", username: "", password: ""}
    const [user, setUser] = useState(initialUser)
    const [validated, setValidated] = useState(false);
    const [conPass, setConPass] = useState("")


    const handleSubmit = (event) => {
        event.preventDefault();
        setUser(initialUser);
        setValidated(true);
        console.log(user)

        axios.post("http://localhost:5000/EBookHub/users/", user)
            .then(function(response){
                if(response.data.status === "sucess"){
                    alert("successful POST")
                } else {
                    alert("failed POST")
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div className="signup-container">
            {/*img source: https://undraw.co/search*/}
            <img className="w-50" style={{maxWidth: "800px", margin: "5%"}} src={online_reading} alt=""/>
            <Modal.Dialog>
                <Modal.Header style={{justifyContent: "center"}}>
                    <Modal.Title >Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{padding: "20px"}}>
                    <div className="form-div">
                        <Form
                            noValidate
                            validated={validated}
                            className="form"
                            onSubmit={handleSubmit}
                        >
                            <Form.Group className="mb-3 input-div" controlId="formFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control required type="string" placeholder="Enter first name" onChange={(e) => (initialUser.firstName = e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3 input-div" controlId="formLastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control required type="string" placeholder="Enter last name" onChange={(e) => (initialUser.lastName = e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3 input-div" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control required type="email" placeholder="Enter email" onChange={(e) => (initialUser.eMail = e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3 input-div" controlId="formUserName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control required type="string" placeholder="Enter username" onChange={(e) => (initialUser.username = e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3 input-div" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" placeholder="Password" onChange={(e) => {initialUser.password = e.target.value; }}/>
                            </Form.Group>

                            <Form.Group className="mb-3 input-div" controlId="formConPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control required type="password" placeholder=" Confirm Password" onChange={(e) => setConPass(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Passwords do not match
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button
                                className="submit-button input-div"
                                style={{width: "350px"}}
                                variant="primary"
                                type="submit"
                            >
                                Submit
                            </Button>

                            <div className="text-center mt-3">
                                Already have an account?<br/><a href="/login">Log in</a>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal.Dialog>
        </div>

    )
}

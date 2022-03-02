import React, { useState } from "react";
import {Button, Form} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import axios from "axios";
import online_reading from '../assets/online_reading.svg';
import SignUpNavBar from "./signupnavbar.component";

export default function Signup(props) {
    
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [eMail, setEmail] = useState("")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [signedUp,setSignedUp] = useState(0);

    const handleSubmit = (event) => {
        
        event.preventDefault();
        if (password === confirmPassword)
        {
            axios.post("http://localhost:5000/EBookHub/users/createUser", {firstName: firstName, lastName: lastName, eMail: eMail, username: username, password: password})
                .then(function(response)
                {
                    if(response.data.status === "success")
                    {
                        setSignedUp(1);
                        const temp = response.data.data.newUser;
                        localStorage.setItem( 'userObject' ,JSON.stringify(temp));
                    } else {
                         setSignedUp(2);
                    }
                })
                .catch(function (error) {
                    setSignedUp(2);
                    console.log(error)
                })
        }  else 
        {
            window.alert("Passwords do not match!");
        }
    }

    return (
        <div>
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }}>
            <SignUpNavBar/>
            </div>
            { signedUp === 1 ?
                (<div>
                    <Modal.Dialog style={{marginTop: "300px", width: "500px", borderColor: "green"}}>
                        <Modal.Header style={{justifyContent: "center"}}>
                            <Modal.Title >Sign Up</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <p style={{fontSize: "25px", textAlign: "center"}}>Successfully created an account!</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" href="/user" >Close</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
                ): (signedUp === 2) ?
                (
                    <div>
                        <Modal.Dialog style={{marginTop: "300px", width: "500px"}}>
                            <Modal.Header style={{justifyContent: "center"}}>
                                <Modal.Title>Error Signing Up</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p style={{fontSize: "25px",textAlign: "center"}}>Could not sign up. Please try again.</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" href="/signup">Close</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                ) :
                (<div className="signup-container">
                    {/*img source: https://undraw.co/search*/}
                    <img className="w-50" style={{maxWidth: "800px", margin: "5%"}} src={online_reading} alt=""/>
                    <Modal.Dialog>
                        <Modal.Header style={{justifyContent: "center"}}>
                            <Modal.Title >Sign Up</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{padding: "20px"}}>
                            <div className="form-div">
                                <Form
                                    className="form"
                                    onSubmit={handleSubmit}
                                >
                                    <Form.Group className="mb-3 input-div" controlId="formFirstName" title="firstName">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control required type="string" placeholder="Enter first name" onChange={(e) => (setFirstName(e.target.value.trim()))}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formLastName" title="lastName">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control required type="string"  placeholder="Enter last name" onChange={(e) => (setLastName(e.target.value.trim()))}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formEmail" title="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control required type="email" placeholder="Enter email" onChange={(e) => (setEmail(e.target.value.trim()))}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formUserName" title="userName">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control required type="string"  placeholder="Enter username" onChange={(e) => (setUserName(e.target.value.trim()))}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formPassword" title="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control required type="password" placeholder="Enter password" onChange={(e) =>  (setPassword(e.target.value.trim()))}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formconfirmPasswordword" title="re-Password">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control required type="password" placeholder="Re-enter the password" onChange={(e) =>setConfirmPassword(e.target.value.trim())}/>
                                    </Form.Group>

                                    <Button
                                        className="submit-button input-div"
                                        style={{width: "350px"}}
                                        variant="primary"
                                        type="submit"
                                        onClick={handleSubmit}
                                        title= "registerButton"
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
                </div>)}
        </div>
    )
}

import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import axios from "axios";
import online_reading from '../assets/online_reading.svg';

export default function Signup() {
    const initialUser = {firstName: "", lastName: "", eMail: "", username: "", password: ""}
    const [user, setUser] = useState(initialUser)
    const [conPass, setConPass] = useState("")
    const [signedUp,setSignedUp] = useState(0);

    const handleSubmit = (event) => {
        setUser(initialUser);
        console.log(user);
        if (user.password !== conPass){
            window.alert("Passwords do not match!");
        }  else {
            axios.post("http://localhost:5000/EBookHub/users/createUser", user)
                .then(function(response){
                    if(response.data.status === "success"){
                         setSignedUp(1);
                    } else {
                         setSignedUp(2);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }

    return (
        <div>
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
                            <Button className="submit-button" href="/">Close</Button>
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
                                <Button className="submit-button" variant="black" href="/signup">Close</Button>
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
                                        <Form.Control required type="string" placeholder="Enter first name" onChange={(e) => (initialUser.firstName = e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formLastName" title="lastName">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control required type="string"  placeholder="Enter last name" onChange={(e) => (initialUser.lastName = e.target.value.trim())}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formEmail" title="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control required type="email" placeholder="Enter email" onChange={(e) => (initialUser.eMail = e.target.value.trim())}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formUserName" title="userName">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control required type="string"  placeholder="Enter username" onChange={(e) => (initialUser.username = e.target.value.trim())}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formPassword" title="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control required type="password" placeholder="Enter password" onChange={(e) => {initialUser.password = e.target.value.trim(); }}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formConPassword" title="re-Password">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control required type="password" placeholder="Re-enter the password" onChange={(e) => setConPass(e.target.value.trim())}/>
                                    </Form.Group>

                                    <Button
                                        className="submit-button input-div"
                                        style={{width: "350px"}}
                                        variant="primary"
                                        type="submit"
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

import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import axios from "axios";
import online_reading from '../assets/online_reading.svg'

export default function Signup() {
    const initialUser = {
        firstName: "",
        lastName: "",
        eMail: "",
        username: "",
        password: ""
    }

    const [user, setUser] = useState(initialUser)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const isSignUp = false;
    // const [isSignUp, setData] = useState(false);
    // const testData = {
    //     username: "test",
    //     password: "test123"
    // }

    const handleSubmit = () => {
        // setData(true);
        // axios.get('http://localhost:5000/Ebookhub/users/Zeeelvaliya')
        //     .then(res => {
        //         // const content = res.data
        //         console.log(res.data.data)
        //     })

        // axios.post("http://localhost:5000/EBookHub/users/createUser", testData)
        //     .then(function(response){
        //         if(response.data.status === "sucess"){
        //             alert("successful POST")
        //         } else {
        //             alert("failed POST")
        //             console.log(response)
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error)
        //     })

    }

    return (
        <div className="signup-container">
            <img className="w-50" style={{maxWidth: "800px", margin: "5%"}} src={online_reading} alt=""/>
            <Modal.Dialog>
                <Modal.Header style={{justifyContent: "center"}}>
                    <Modal.Title >Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{padding: "20px"}}>
                    <div className="form-div">
                        <Form className="form">
                            <Form.Group className="mb-3 input-div" controlId="formFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="string" placeholder="Enter first name" onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 input-div" controlId="formLastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="string" placeholder="Enter last name" onChange={(e) => setLastName(e.target.value)}/>
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

                            <Button
                                className="submit-button input-div"
                                style={{width: "350px"}}
                                variant="primary"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                            <div className="text-center mt-3">
                                <medium>Already have an account?<br></br><a href="/login">Log in</a></medium>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal.Dialog>
        </div>

    )
}

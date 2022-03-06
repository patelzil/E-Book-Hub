import React, { useState } from "react";
import {Button, Form} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import axios from "axios";
import online_reading from '../assets/online_reading.svg';
import SignUpNavBar from "./signupnavbar.component";
import { TextField } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Signup(props) {
    
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [eMail, setEmail] = useState("")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [signedUp,setSignedUp] = useState(0);
    const [visibilityFlag, setVisibilityFlag] = useState(false);
    const [validationFlag, setValidationFlag] = useState(false);
    const [emailFlag, setEmailFlag] = useState(false);
    const regex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).(?=.*[!@$%#\]).{8,12}$');
    const regexEmail = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}');
    const handleSubmit = (event) => {
        
        event.preventDefault();
        if(regexEmail.test(eMail)){
            setEmailFlag(false);
        if (password === confirmPassword)
        {
            if(regex.test(password) && regex.test(confirmPassword)){
                axios.post("http://localhost:5000/EBookHub/users/createUser", {firstName: firstName, lastName: lastName, eMail: eMail, username: username, password: password})
                .then(function(response)
                {
                    if(response.data.status === "success")
                    {
                        setSignedUp(1);
                        const temp = response.data.data.newUser;
                        localStorage.setItem( 'userObject' ,JSON.stringify(temp));
                        localStorage.setItem('loginNavbar', JSON.stringify({ flag: true }));
                        localStorage.setItem('logout', JSON.stringify({ flag: false }));
                    } else {
                         setSignedUp(2);
                    }
                })
                .catch(function (error) {
                    setSignedUp(2);
                    console.log(error)
                })
            } else 
            {
                setValidationFlag(true);
            }
        }  else 
        {
            window.alert("Passwords do not match!");
        }
        }else {
            setEmailFlag(true);
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
                                        <TextField
                                        required
                                            label="First Name"
                                            type = "text"
                                            helperText="* are required fields"
                                            size="small"
                                            style={{ width: "100%"}}
                                            placeholder="First Name"
                                            onChange={ (event) =>  { setFirstName(event.target.value.trim()) } }
                                            />
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formLastName" title="lastName">
                                        <TextField
                                        required
                                            label="Last Name"
                                            type = "text"
                                            size="small"
                                            style={{ width: "100%"}}
                                            placeholder="Last Name"
                                            onChange={ (event) =>  { setLastName(event.target.value.trim()) } }
                                            />
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formEmail" title="email">
                                        <TextField
                                            required
                                            error={emailFlag}
                                            label="Email"
                                            type = "email"
                                            helperText={ (emailFlag) ? ("invalid email") : ("you can use email to signup only once!") }
                                            size="small"
                                            style={{ width: "100%"}}
                                            placeholder="Email Address"
                                            onChange={ (event) =>  { setEmail(event.target.value.trim()) } }
                                            />
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formUserName" title="userName">
                                        <TextField
                                            required
                                            label="Username"
                                            helperText="username can only be chosen once!"
                                            type = "text"
                                            size="small"
                                            style={{ width: "100%"}}
                                            placeholder="Last Name"
                                            onChange={ (event) =>  { setUserName(event.target.value.trim()) } }
                                            />
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formPassword" title="password">
                                    <TextField
                                            required
                                            error={validationFlag}
                                            helperText={ (validationFlag) ? ("Please enter a valid password!") : ("")}
                                            label="Password"
                                            style={{ width: "100%"}}
                                            type = {(visibilityFlag === true) ? ("text") : ("password")}
                                            size="small"
                                            InputProps={{
                                            endAdornment: (visibilityFlag === true) ? (<VisibilityOffIcon onClick={ () => { setVisibilityFlag(false);}  } />) : (<VisibilityIcon onClick={() => {  setVisibilityFlag(true) }}/>)
                                            }}
                                            onChange={ (event) =>  {  setPassword(event.target.value.trim());  } }
                                            />
                                            
                                    </Form.Group>

                                    <Form.Group className="mb-3 input-div" controlId="formconfirmPasswordword" title="re-Password">
                                    <TextField
                                            required
                                            error={validationFlag}
                                            helperText={ (validationFlag) ? ("Please enter a valid password!") : ("")}
                                            label="Confirm Password"
                                            style={{ width: "100%"}}
                                            type = {(visibilityFlag === true) ? ("text") : ("password")}
                                            size="small"
                                            InputProps={{
                                                endAdornment: (visibilityFlag === true) ? (<VisibilityOffIcon onClick={ () => { setVisibilityFlag(false);}  } />) : (<VisibilityIcon onClick={() => {  setVisibilityFlag(true) }}/>)
                                                }}
                                            onChange={ (event) =>  {  setConfirmPassword(event.target.value.trim());  } }
                                            />
                                            <p></p>
                                            <div>
                                            <strong>Password requirements:</strong>
                                            <ul>
                                            <li>between 8 and 12 characters</li>
                                            <li>must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number</li>
                                            <li>contain special characters: !, #, @, $, % </li>
                                            </ul>
                                            </div>
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

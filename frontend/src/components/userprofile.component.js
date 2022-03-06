import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import UserSessionNavBar from "./usersessionnavbar.component";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { TextField } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function UserProfile() {

    const [editProfileFlag, setEditProfileFlag] = useState(false);
    const userObject = (JSON.parse(localStorage.getItem('userObject')) !== null) ? (JSON.parse(localStorage.getItem('userObject'))) : ({firstName: "first name", lastName: "last name", eMail: " email ", username: " username ", password: "password"});
    const [firstName, setFirstName] = useState(userObject.firstName)
    const [lastName, setLastName] = useState(userObject.lastName)
    const [eMail, setEmail] = useState(userObject.eMail)
    const [username, setUserName] = useState(userObject.username)
    const [password, setPassword] = useState(userObject.password)
    const [updateSuccess, setUpdateSuccess] = useState(0);
    const [visibilityFlag, setVisibilityFlag] = useState(false);
    const [validationFlag, setValidationFlag] = useState(false);
    const [emailFlag, setEmailFlag] = useState(false);
    const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/);
    const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    const submitHandler = (event) => {
        event.preventDefault();
        if (regexEmail.test(eMail)) {
            setEmailFlag(false);
            if (regex.test(password)) {
                setValidationFlag(false);
                axios.patch(`http://localhost:5000/EBookHub/users/${username}`, { firstName: firstName, lastName: lastName, eMail: eMail, username: username, password: password })
                    .then(function (response) {
                        console.log(response)
                        if (response.data.status === "success") {
                            setUpdateSuccess(1);
                            const temp = response.data.data.user;
                            localStorage.setItem('userObject', JSON.stringify(temp));
                        } else {
                            setUpdateSuccess(2);
                        }
                    })
                    .catch(function (error) {
                        setUpdateSuccess(2);
                        console.log(error)
                    })
            } else {
                setValidationFlag(true);
            }
        }
        else {
            setEmailFlag(true);
        }
    }

    return (
        <>
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }}>
                <UserSessionNavBar />
            </div>

            {(updateSuccess === 1) ?
                (<div>
                    <Modal.Dialog style={{ marginTop: "300px", width: "500px", borderColor: "green" }}>
                        <Modal.Header style={{ justifyContent: "center" }}>
                            <Modal.Title >Updated Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <p style={{ fontSize: "25px", textAlign: "center" }}>Successfully updated your profile!</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" href="/profile" >Close</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>)
                : (updateSuccess === 2)
                    ?
                    (<div title="erroPageUserProfile">
                        <Modal.Dialog style={{ marginTop: "300px", width: "500px" }}>
                            <Modal.Header style={{ justifyContent: "center" }}>
                                <Modal.Title>Error Updating Profile</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p style={{ fontSize: "25px", textAlign: "center" }}>Could not update your profile. Please try again.</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" href="/profile">Close</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>)
                    : (<Container>
                        <div className="signup-container" title="editButtonUserProfile">
                            <Modal.Dialog>
                                <Modal.Header style={{ justifyContent: "center" }}>
                                    <Button
                                        style={{ width: "350px" }}
                                        className="button"
                                        variant={(!editProfileFlag) ? ("default") : ("danger")}
                                        onClick=
                                        {
                                            () => {
                                                setEditProfileFlag(!editProfileFlag);
                                            }
                                        }>
                                        {(!editProfileFlag) ? ("Edit Profile") : ("Cancel")}
                                        {(!editProfileFlag) ? (<EditIcon style={{ paddingLeft: "8px" }} />) : (<CancelIcon style={{ paddingLeft: "8px" }} />)}
                                    </Button>
                                </Modal.Header>
                                <Modal.Body style={{ padding: "20px" }}>
                                    <div className="form-div" title="editProfileForm">
                                        <Form className="form" style={{ float: "right" }} >
                                            <Form.Group className="mb-3 input-div" controlId="formFirstName" title="firstName">
                                                <TextField
                                                    label="First Name"
                                                    type="text"
                                                    size="small"
                                                    style={{ width: "100%" }}
                                                    placeholder="First Name"
                                                    value={(userObject !== null) ? (firstName) : ("your first name")}
                                                    disabled={!editProfileFlag}
                                                    onChange={(event) => { setFirstName(event.target.value) }}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3 input-div" controlId="formLastName" title="lastName">
                                                <TextField
                                                    label="Last Name"
                                                    type="text"
                                                    size="small"
                                                    style={{ width: "100%" }}
                                                    placeholder="Last Name"
                                                    value={(userObject !== null) ? (lastName) : ("your last name")}
                                                    disabled={!editProfileFlag}
                                                    onChange={(event) => { setLastName(event.target.value) }}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3 input-div" controlId="formEmail" title="email">
                                                <TextField
                                                    error={emailFlag}
                                                    label="Email"
                                                    type = "email"
                                                    helperText={ (emailFlag) ? ("invalid email") : ("") }
                                                    size="small"
                                                    style={{ width: "100%" }}
                                                    placeholder="Email"
                                                    value={(userObject !== null) ? (eMail) : ("your email address")}
                                                    disabled={!editProfileFlag}
                                                    onChange={(event) => { setEmail(event.target.value) }}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3 input-div" controlId="formUserName" title="userName">
                                                <TextField
                                                    label="Username"
                                                    type="text"
                                                    size="small"
                                                    style={{ width: "100%" }}
                                                    value={(userObject !== null) ? (username) : ("your username")}
                                                    disabled={true}
                                                    onChange={(event) => { setUserName(event.target.value) }}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3 input-div" controlId="formPassword" title="password">
                                                <TextField
                                                    error={validationFlag}
                                                    helperText={(validationFlag) ? ("Please enter a valid password!") : ("")}
                                                    label="Password"
                                                    style={{ width: "100%" }}
                                                    type={(visibilityFlag === true) ? ("text") : ("password")}
                                                    size="small"
                                                    value={(userObject !== null) ? (password) : ("your password")}
                                                    disabled={!editProfileFlag}
                                                    InputProps={{
                                                        endAdornment: (visibilityFlag === true) ? (<VisibilityOffIcon onClick={() => { if (editProfileFlag) { setVisibilityFlag(false) } }} />) : (<VisibilityIcon onClick={() => { if (!editProfileFlag) { setVisibilityFlag(false) } else { setVisibilityFlag(true) } }} />)
                                                    }}
                                                    onChange={(event) => { setPassword(event.target.value); }}
                                                />
                                                <p></p>
                                                <div style={{ display: (!editProfileFlag) ? ("none") : ("block"), margin: "0px", width: "100%" }} title="passRequirnmentUserProfile">
                                                    <strong>Password requirements:</strong>
                                                    <ul>
                                                        <li>between 8 and 12 characters</li>
                                                        <li>must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number</li>
                                                        <li>contain special characters: !, #, @, $, % </li>
                                                    </ul>
                                                </div>
                                            </Form.Group>



                                            {(editProfileFlag) ? (<Button
                                                className="submit-button input-div"
                                                style={{ width: "350px" }}
                                                variant="primary"
                                                type="submit"
                                                title="registerButton"
                                                onClick=
                                                {
                                                    submitHandler
                                                }
                                            >
                                                Submit
                                            </Button>) : (<div></div>)}

                                        </Form>
                                    </div>
                                </Modal.Body>
                            </Modal.Dialog>
                        </div>
                    </Container>)}


        </>
    )
}
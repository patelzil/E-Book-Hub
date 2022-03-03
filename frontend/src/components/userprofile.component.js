import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import UserSessionNavBar from "./usersessionnavbar.component";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

export default function UserProfile() {

        const [editProfileFlag, setEditProfileFlag] = useState(false);
        const  userObject = (JSON.parse(localStorage.getItem('userObject')) !== null) ? (JSON.parse(localStorage.getItem('userObject'))) : (null);
        const [firstName, setFirstName] = useState(userObject.firstName)
        const [lastName, setLastName] = useState(userObject.lastName)
        const [eMail, setEmail] = useState(userObject.eMail)
        const [username, setUserName] = useState(userObject.username)
        const [password, setPassword] = useState(userObject.password)
        const [updateSuccess,setUpdateSuccess] = useState(0);

        const submitHandler = (event) => 
        {
            event.preventDefault();
            axios.patch(`http://localhost:5000/EBookHub/users/${ username }`, {firstName: firstName, lastName: lastName, eMail: eMail, username: username, password: password})
            .then(function(response)
            {
                console.log(response)
                if(response.data.status === "success")
                {
                    setUpdateSuccess(1);
                    const temp = response.data.data.user;
                    localStorage.setItem( 'userObject' ,JSON.stringify(temp));
                } else 
                {
                    setUpdateSuccess(2);
                }
            })
            .catch(function (error) {
                setUpdateSuccess(2);
                console.log(error)
            })
        }

        return (
            <> 
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }}>
            <UserSessionNavBar/>
            </div>
            
            { (updateSuccess === 1) ? 
            ( <div>
                <Modal.Dialog style={{marginTop: "300px", width: "500px", borderColor: "green"}}>
                    <Modal.Header style={{justifyContent: "center"}}>
                        <Modal.Title >Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <p style={{fontSize: "25px", textAlign: "center"}}>Successfully updated your profile!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" href="/profile" >Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div> ) 
            : ( updateSuccess === 2 ) 
             ? 
            ( <div>
                <Modal.Dialog style={{marginTop: "300px", width: "500px"}}>
                    <Modal.Header style={{justifyContent: "center"}}>
                        <Modal.Title>Error Signing Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{fontSize: "25px",textAlign: "center"}}>Could not update your profile. Please try again.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" href="/profile">Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div> ) 
            : ( <Container>
                <div className="signup-container">
                        <Modal.Dialog>
                            <Modal.Header style={{justifyContent: "center"}}>
                                <Button
                                style={{ width: "350px" }}
                                className="button"
                                variant={ (!editProfileFlag) ? ("default") : ("danger") }
                                onClick=
                                {
                                    () => 
                                    {
                                        setEditProfileFlag(!editProfileFlag)
                                    }
                                }>
                                { (!editProfileFlag) ? ("Edit Profile") : ( "Cancel") }
                                { (!editProfileFlag) ? (<EditIcon style={{paddingLeft:"8px"}} />) : (<CancelIcon style={{paddingLeft:"8px"}} />) }
                                </Button>
                            </Modal.Header>
                            <Modal.Body style={{padding: "20px"}}>
                                <div className="form-div">
                                    <Form className="form" style={{ float: "right" }} >
                                        <Form.Group className="mb-3 input-div" controlId="formFirstName" title="firstName">
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control required type="string" value={ (userObject !== null) ? (firstName) : ("your first name") } onChange={(e) => {setFirstName(e.target.value.trim())}} disabled={!editProfileFlag}/>
                                        </Form.Group>
    
                                        <Form.Group className="mb-3 input-div" controlId="formLastName" title="lastName">
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control required type="string"  value={ (userObject !== null) ? (lastName) : ("your last name") } onChange={(e) => (setLastName(e.target.value.trim()))} disabled={!editProfileFlag}/>
                                        </Form.Group>
    
                                        <Form.Group className="mb-3 input-div" controlId="formEmail" title="email">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control required type="email" value={ (userObject !== null) ? (eMail) : ("your email address") } onChange={(e) => (setEmail(e.target.value.trim()))} disabled={!editProfileFlag}/>
                                        </Form.Group>
    
                                        <Form.Group className="mb-3 input-div" controlId="formUserName" title="userName">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control required type="string"  value={ (userObject !== null) ? (username) : ("your username") } onChange={(e) => (setUserName(e.target.value.trim()))} disabled={true}/>
                                        </Form.Group>
    
                                        <Form.Group className="mb-3 input-div" controlId="formPassword" title="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control required type="password" value={ (userObject !== null) ? (password) : ("your password") } onChange={(e) => (setPassword(e.target.value.trim()))} disabled={!editProfileFlag}/>
                                        </Form.Group>
    
                                        { (editProfileFlag) ? (<Button
                                            className="submit-button input-div"
                                            style={{width: "350px"}}
                                            variant="primary"
                                            type="submit"
                                            title= "registerButton"
                                            onClick =
                                            {
                                                    submitHandler
                                            }
                                        >
                                            Submit
                                        </Button>) : (<div></div>) }
                                        
                                    </Form>
                                </div>
                            </Modal.Body>
                        </Modal.Dialog>
                    </div>
                </Container> ) }

            
            </>
        )
    }
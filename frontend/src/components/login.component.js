import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import login_page from '../assets/login_page.svg'
import axios from "axios";
import LoginNavBar from "./loginnavbar.component";
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginflag, setLoginflag] = useState(0);
    const [visibilityFlag, setVisibilityFlag] = useState(false);
    const handleSubmit = (event) =>
    {
        event.preventDefault();
        axios.get(`http://localhost:5000/EBookHub/users/${ username }/${ password }`)
            .then(function(response){
                if(response.data.status === "success")
                {
                        setLoginflag(1);
                        const temp = response.data.data.user;
                        localStorage.setItem('userObject', JSON.stringify(temp));
                        localStorage.setItem('loginNavbar', JSON.stringify({ flag: true }));
                        localStorage.setItem('logout', JSON.stringify({ flag: false }));
                } else {
                    setLoginflag(2);
                }
            })
            .catch(function (error) {
                setLoginflag(2);
                console.log(error)
            })
    }

    return (
        <div>
        <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }}>
        <LoginNavBar/>
        </div>
        { (loginflag === 1) ?
            (   <div>
                    <Modal.Dialog style={{marginTop: "300px", width: "500px", borderColor: "green"}}>
                        <Modal.Header style={{justifyContent: "center"}}>
                            <Modal.Title >Login Successful</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <p style={{fontSize: "25px", textAlign: "center"}}>Successfully Logged In!</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Link to={ (localStorage.getItem('book-nl')) ? ("/payment"): ("/user") }>
                            <Button variant="success" type="button" >Close</Button>
                            </Link>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            ):  (loginflag === 2) ?
            ( <div>
                    <Modal.Dialog style={{marginTop: "300px", width: "500px"}}>
                        <Modal.Header style={{justifyContent: "center"}}>
                            <Modal.Title>Error Loging In</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p style={{fontSize: "25px",textAlign: "center"}}>Could not Login. Please try again.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" href="/login">Close</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            ):
            (
                <div className = "card">
                    <div className = "card-header">
                        <h1>LOGIN</h1>
                    </div>

                    <div className ="card-body">
                        <Container className = "mt-5">
                            <Row>
                                <Col lg={4} md={6} sm={12} className="justify-content-center mt-5 p-3">

                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail" title="userName">
                                        <TextField
                                            label="Username"
                                            type = "text"
                                            size="small"
                                            style={{margin: "10px", width: "100%"}}
                                            placeholder="Username"
                                            onChange={ (event) =>  { setUsername(event.target.value) } }
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword" title="password">
                                            <TextField
                                            label="Password"
                                            style={{margin: "0px 10px", width: "100%"}}
                                            type = {(visibilityFlag === true) ? ("text") : ("password")}
                                            placeholder="Password"
                                            size="small"
                                            InputProps={{
                                            endAdornment: (visibilityFlag === true) ? (<VisibilityOffIcon onClick={() => (setVisibilityFlag(false))} />) : (<VisibilityIcon onClick={() => (setVisibilityFlag(true))}/>)
                                            }}
                                            onChange={ (event) =>  { setPassword(event.target.value); } }
                                            />
                                            <p></p>
                                        </Form.Group>

                                        <Button className="button-block" type="submit" title="logInButton" onClick={ handleSubmit } >Login</Button>

                                        <Button className="button-block" title="forgotPassword">Forgot Password</Button>


                                    </Form>

                                    <div className="text-center mt-3">
                                        <p className="SignUp">Don't have an account yet?<br></br><Link to="/signup">Sign up</Link></p>
                                    </div>
                                </Col>

                                <Col lg={8} md={12} sm={12}>
                                    <img className = "w-100" src={login_page} alt=""></img>
                                </Col>

                            </Row>
                            </Container>
                    </div>
                </div>)
        }
        </div>
    )
}

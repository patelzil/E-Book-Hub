import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import login_page from '../assets/login_page.svg'
import axios from "axios";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginflag, setLoginflag] = useState(0);
    const [userObject, setUserObject] = useState(null);

    const handleSubmit = (event) => 
    {
        event.preventDefault();
        axios.get(`http://localhost:5000/EBookHub/users/${ username }`)
            .then(function(response){
                if(response.data.status === "success"){
                    if (response.data.data.user.password === password)
                    {
                        setLoginflag(1);
                        const temp = response.data.data.user;
                        setUserObject(temp);
                    } else
                    {
                        setLoginflag(2);
                    }
                } else {
                    setLoginflag(2);
                }
            })
            .catch(function (error) {
                setLoginflag(2);
                alert("Invalid username, please enter a valid username :)");
                console.log(error)
            })
    }

    return (
        <div>
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
                            <Link to="/user" state={ { response: userObject } }> <Button className="submit-button">Close</Button> </Link>
                                
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
                            <Button className="submit-button" href="/login">Close</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            ): 
            (
                <div class = "card">
                    <div class = "card-header"> 
                        <h1>LOGIN</h1> 
                    </div>
    
                    <div class="card-body"> 
                        <Container className = "mt-5">
                            <Row>
                                <Col lg={4} md={6} sm={12} className="justify-content-center mt-5 p-3">
                                    
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control required type="text" onChange={ (event) =>  { setUsername(event.target.value) } } placeholder="Username" />
                                        </Form.Group>
    
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control required type="password" onChange={ (event) =>  { setPassword(event.target.value) } } placeholder="Password" />
                                        </Form.Group>
                                        
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Remember me" />
                                        </Form.Group>
    
                                        <Button className="button-block" type="submit" onClick={ handleSubmit } >Login</Button>
    
                                        <Button className="button-block" >Forgot Password</Button>
    
                                
                                    </Form>
    
                                    <div className="text-center mt-3">
                                        <medium className="SignUp">Don't have an account yet?<br></br><Link to="/signup">Sign up</Link></medium>
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

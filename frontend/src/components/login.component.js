import React, {Component} from "react";
import {Col, Row, Container, Form, Button} from "react-bootstrap";
import login_page from '../assets/login_page.svg'

export default class Login extends Component {
    render() {
        return (
            <>
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
                                        <Form.Control required type="text" placeholder="Username" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control required type="password" placeholder="Password" />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember me" />
                                    </Form.Group>

                                    <Button className="button-block" type="submit">Login</Button>

                                    <Button className="button-block" type="submit">Forgot Password</Button>

                            
                                </Form>

                                <div className="text-center mt-3">
                                    <medium className="SignUp">Don't have an account yet?<br></br><a href="#">Sign up</a></medium>
                                </div>
                            </Col>

                            <Col lg={8} md={12} sm={12}>
                                <img className = "w-100" src={login_page} alt=""></img>
                            </Col>
                            
                        </Row>
                    </Container>
                </div>
            </div>
                
            </>
        );
    }
}

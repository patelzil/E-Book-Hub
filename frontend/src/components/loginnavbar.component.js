import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar} from 'react-bootstrap'
import logo from '../assets/logo.png'
import '../styles/styles.css'

export default function LoginNavBar(){
    return (
        <Container>
            <Navbar collapseOnSelect expand="sm" variant="dark" bg="black" title="logInNavbar">
                <Container style={{width: "100%"}}>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Navbar.Brand href="/">
                                <img src={logo} width="35" height="35" alt="" style={{marginRight: "20px"}}/>
                                E-Book-Hub
                            </Navbar.Brand>
                        </Nav>
                        <Nav className="">
                            <Link to="/login" className="inactive-button" disabled>Log In</Link>
                            <Link to="/signup" className="button">Sign Up</Link>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </Container>
    )
}

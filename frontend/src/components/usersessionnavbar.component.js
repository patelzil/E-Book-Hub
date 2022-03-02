import React from "react";
import { Container, Dropdown, DropdownButton, Nav, Navbar} from 'react-bootstrap'
import logo from '../assets/logo.png'
import '../styles/styles.css'

export default function UserSessionNavBar(){
    
    const  username = JSON.parse(localStorage.getItem('userObject')) !== null ? (JSON.parse(localStorage.getItem('userObject')).username) : ("username") ;

    return (
        <Container>
            <Navbar collapseOnSelect expand="sm" variant="dark" bg="black">
                <Container style={{width: "100%"}}>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Navbar.Brand href="/">
                                <img src={logo} width="35" height="35" alt="" style={{marginRight: "20px"}}/>
                                E-Book-Hub
                            </Navbar.Brand>
                        </Nav>
                        <DropdownButton id="dropdown-basic-button" class="button" title={ username }>
                            <Dropdown.Item href="/profile" class="button">Profile</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/user" class="button">Dashboard</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/" class="button" onClick= { () => { localStorage.clear()} }>Logout</Dropdown.Item>
                        </DropdownButton>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </Container>
    )
}

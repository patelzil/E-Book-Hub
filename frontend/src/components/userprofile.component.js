import React from "react";
import { Container } from "react-bootstrap";
import UserSessionNavBar from "./usersessionnavbar.component";

export default function UserProfile() {

        return (
            <> 
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }}>
            <UserSessionNavBar/>
            </div>
            <Container>
                hello
            </Container>
            </>
        )
    }
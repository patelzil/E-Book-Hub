import React from "react";
import { useLocation } from "react-router-dom";

export default function User() {

    const  location = useLocation()
    const  userObject = location.state.response; 
        return (
            <>
            <h1> Welcome to your dashboard, {userObject.firstName} {userObject.lastName}! </h1>
            <p>please add appropriate content</p>
            </>
        )
    }

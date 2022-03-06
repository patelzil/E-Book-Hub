import React from "react";
import UserSessionNavBar from "./usersessionnavbar.component";

export default function User() {

    
    const userObject = JSON.parse(localStorage.getItem('userObject'));

        return (
            <> 
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }} title="userDashboard">
            <UserSessionNavBar/>
            </div>
            { userObject !== null ? 
            (
            <div title="dashBoardMessage">
                <h1> Welcome to your dashboard, {userObject.firstName} { userObject.lastName} ! </h1>
                <p>please add appropriate content</p>
            </div>
            ) : (
                <div>
                <h1> Error 404! </h1>
                <p>please login again</p>
                </div>
            )
            }
            
            </>
        )
    }

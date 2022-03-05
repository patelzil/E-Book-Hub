import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar.component";
import SearchPage from './searchPage.component'
import UserSessionNavBar from "./usersessionnavbar.component";

export default function Home(){

    const  userSessionNavbar = (localStorage.getItem('loginNavbar') !== null) ? (JSON.parse(localStorage.getItem('loginNavbar'))) : (null);
    const history = useNavigate();
    useEffect(() => {
        //console.log(history('/'));
    });

    return (
        <div>
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }}>
            { ( userSessionNavbar !== null && userSessionNavbar.flag === true) ? (<UserSessionNavBar/>) : (<NavBar/>)}
            </div>
            <SearchPage/>
        </div>
    )
}

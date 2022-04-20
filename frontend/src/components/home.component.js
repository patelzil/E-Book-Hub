import React from "react";
import NavBar from "./navbar.component";
import SearchPage from './searchPage.component'
import UserSessionNavBar from "./usersessionnavbar.component";
import HomeUpdated from "./homeUpdated.component";

export default function Home(){

    const  userSessionNavbar = (localStorage.getItem('loginNavbar') !== null) ? (JSON.parse(localStorage.getItem('loginNavbar'))) : (null);

    return (
        <div>
            <div style={{ zIndex: 0, top: 0, position: 'sticky', background: 'black' }}>
            { ( userSessionNavbar !== null && userSessionNavbar.flag === true) ? (<UserSessionNavBar/>) : (<NavBar/>)}
            </div>

            <HomeUpdated />
            {/* <SearchPage/> */}
        </div>
    )
}

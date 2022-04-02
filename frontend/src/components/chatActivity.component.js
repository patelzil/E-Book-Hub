import ChatInfo from "./chatInfo.component";
import React from "react";
import UserSessionNavBar from "./usersessionnavbar.component";
import { useLocation } from 'react-router-dom'


export default function ChatActivity(props){
    const  userSessionNavbar = (localStorage.getItem('loginNavbar') !== null) ? (JSON.parse(localStorage.getItem('loginNavbar'))) : (null);
    const location = useLocation()
    const { bookClubItem } = location.state

    console.log(bookClubItem)
    return(
        <div>
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }} title="userDashboard">
                <UserSessionNavBar/>
            </div>

            <ChatInfo bookClub = {bookClubItem}/>

        </div>
    );
}
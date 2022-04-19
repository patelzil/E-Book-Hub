import ChatInfo from "./chatInfo.component";
import React from "react";
import UserSessionNavBar from "./usersessionnavbar.component";
import { useLocation } from 'react-router-dom'


export default function ChatActivity(props){
    const location = useLocation()
    const { bookClubItem } = location.state

    return(
        <div data-testid="chatRoomActivity">
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }} title="userDashboard">
                <UserSessionNavBar/>
            </div>

            <ChatInfo bookClub = {bookClubItem}/>

        </div>
    );
}

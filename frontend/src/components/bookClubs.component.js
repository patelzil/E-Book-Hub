import axios from 'axios';
import UserSessionNavBar from "./usersessionnavbar.component";
import React, {useEffect, useState} from "react";
import BookClubEvents from "./bookClubEvents.component";

export default function BookClubs(){
    
    const [bookClubList, setBookClubList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/EBookHub/books/bookclub/getAllClubs')
            .then(function(response){
                console.log(response.data.status)
                if(response.data.status === "Pass"){
                    setBookClubList(response.data.message);
                }else{
                    setBookClubList([])
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }, []);

    return(
        <div>
   
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }} title="userDashboard">
                <UserSessionNavBar/>
            </div>

            <div title='listOfBooksClubs'>
                <BookClubEvents list={bookClubList}/>
            </div>
        </div>


  

    )
}

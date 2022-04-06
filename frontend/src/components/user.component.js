import React, {useEffect, useState} from "react";
import UserSessionNavBar from "./usersessionnavbar.component";
import Modal from 'react-bootstrap/Modal';
import logo from '../assets/logo.png';
import axios from 'axios';
import Books from "./books.component";
import BookClubEvents from "./bookClubEvents.component";
import BookClubEventCard from "./bookClubEventCard.component";

export default function User() {

    
    const userObject =  (localStorage.getItem('userObject') !== null) ? (JSON.parse(localStorage.getItem('userObject'))) : (null);
    const userName = JSON.parse(localStorage.getItem('userObject')).username;
    const [bookList, setBookList] = useState([]);
    const [bookClubList, setBookClubList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/EBookHub/books/purchase/boughtBooks/getAll/',{ 
            params: {
              username: userName
            }
        }
          ).then(function(response){
                if(response.data.status === "success"){
                    setBookList(response.data.found)
                }else{
                    setBookList([])
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }, []);

        return (
            <> 
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }} title="userDashboard">
            <UserSessionNavBar/>
            </div>
            { userObject !== null ? 
            ( <div title="dashBoardMessage"> <h1> Welcome to your dashboard, {userObject.firstName} { userObject.lastName} ! </h1> </div> ) : ( <div> <h1> Error 404! </h1> <p>please login again</p> </div> )
            }
            <h2>Book Owned by you:</h2>
            <div title='listOfBooks'>
               {(bookList.length > 0) ? (<Books list={bookList} showBuy={false}/>) : (<><h4>No Book Owned</h4></>)}
            </div>
            {/* <h2>Book Clubs:</h2>
            <div title='listOfBooksClubs'>
                {userObject.bookclub.map((bookClub)=>(<BookClubEventCard key={bookClub.id} bookClubDetails={bookClub} currentUser={userObject}/>))}
            </div> */}
            </>
        )
    }

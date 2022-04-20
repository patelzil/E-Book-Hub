import React, {useEffect, useState} from "react";
import UserSessionNavBar from "./usersessionnavbar.component";
import axios from 'axios';
import BookCategory from "./bookCategory";
//import BookClubEventCard from "./bookClubEventCard.component";

export default function User() {

    
    const userObject =  (localStorage.getItem('userObject') !== null) ? (JSON.parse(localStorage.getItem('userObject'))) : (null);
    const userName = (localStorage.getItem('userObject') !== null) ? (JSON.parse(localStorage.getItem('userObject')).username) : (null);
    const [bookList, setBookList] = useState([]);
    let bookOwned = [];

    useEffect(() => {
        axios.get('http://localhost:5000/EBookHub/books/purchase/boughtBooks/getAll/',
            {
                params:
                {
                    username: userName
                }
            }
          ).then(function(response){
                if(response.data.status === "success"){
                    setBookList(response.data.found)
                    bookList.map( item => bookOwned.push({ id: item.id, title: item.title }))
                    localStorage.setItem('booksOwned', JSON.stringify(bookOwned));
                }else{
                    setBookList([])
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    });

        return (
            <> 
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }} title="userDashboard">
            <UserSessionNavBar/>
            </div>
            { userObject !== null ? 
            ( <div title="dashBoardMessage"> <h1> Welcome to your dashboard, {userObject.firstName} { userObject.lastName} ! </h1> </div> ) : ( <div> <h1> Error 404! </h1> <p>please login again</p> </div> )
            }
            <div title='listOfBooks'>
               {(bookList.length > 0) ? (<BookCategory list={bookList} title={"Book Owned by you:"} showBuy={false}/>) : (<><h4>No Book Owned</h4></>)}
            </div>
            {/* <h2>Book Clubs:</h2>
            <div title='listOfBooksClubs'>
                {userObject.bookclub.map((bookClub)=>(<BookClubEventCard key={bookClub.id} bookClubDetails={bookClub} currentUser={userObject}/>))}
            </div> */}
            </>
        )
    }

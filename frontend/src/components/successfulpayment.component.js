
import axios from "axios";
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import UserSessionNavBar from "./usersessionnavbar.component";

export default function SuccessfulPayment() {

  const navigate = useNavigate();
  const  book = (localStorage.getItem('book-wl') !== null) ? (JSON.parse(localStorage.getItem('book-wl'))) : 
                  (localStorage.getItem('book-nl') !== null) ? (JSON.parse(localStorage.getItem('book-nl')))
                  : (null);

  const userObj =  (localStorage.getItem('userObject') !== null) ? (JSON.parse(localStorage.getItem('userObject'))) : (null);

  const handlePayment = async (event) => {
    event.preventDefault();
  
    const book_user = 
    {
            id: book.id,
            username: userObj.username,
            title: book.title,
            subTitle: book.subTitle,
            category:book.category,
            authors: book.authors,
            publisher: book.publisher,
            publishDate: book.publishDate,
            description: book.description,
            pageCount: book.pageCount,
            imageLink: book.imageLink,
            price: book.price,
            rating: book.rating,
    }; 
    axios.post(`http://localhost:5000/EBookHub/books/purchase/payment/`, book_user)
        .then(function(response){
            if(response.data.status === "success")
            {
                localStorage.removeItem('book-nl');
                localStorage.removeItem('book-wl');
                navigate('/user');
            } else {
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}

    return (
    <div>
        <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }}>
                <UserSessionNavBar/>
        </div>
      <Modal.Dialog style={{marginTop: "300px", width: "500px", borderColor: "green"}}>
          <Modal.Header style={{justifyContent: "center"}}>
              <Modal.Title >Payment Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body >
              <p style={{fontSize: "25px", textAlign: "center"}}>Book added successfully to your account</p>
          </Modal.Body>
          <Modal.Footer>
              <Button 
              variant="success" 
              onClick={(event) => handlePayment(event)}
              >Proceed to Dashboard</Button>
          </Modal.Footer>
      </Modal.Dialog>
    </div>)
}
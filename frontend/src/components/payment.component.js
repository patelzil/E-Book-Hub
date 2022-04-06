import { TextField } from "@mui/material";
import { Button, Form, Modal } from "react-bootstrap";
import NavBar from "./navbar.component";
import logo from '../assets/logo.png';
import UserSessionNavBar from "./usersessionnavbar.component";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { useNavigate } from "react-router-dom";

export default function Payment() {

    const navigate = useNavigate();
    const  userSessionNavbar = (localStorage.getItem('loginNavbar') !== null) ? (JSON.parse(localStorage.getItem('loginNavbar'))) : (null);
    const  book = (localStorage.getItem('book-wl') !== null) ? (JSON.parse(localStorage.getItem('book-wl'))) : 
                  (localStorage.getItem('book-nl') !== null) ? (JSON.parse(localStorage.getItem('book-nl')))
                  : (null);
    const username =  (localStorage.getItem('userObject') !== null) ? (JSON.parse(localStorage.getItem('userObject')).username) : (null);
    const [buyFlag, setBuyFlag] = useState(true);
    const [rentFlag, setRentFlag] = useState(true);
    const handlePayment = (event) => {
        event.preventDefault();
        const book_user = 
        {
                id: book.id,
                username: username,
                title: book.title,
                subTitle: book.subTitle,
                category:book.category,
                authors: book.authors,
                publisher: book.publisher,
                publishDate: book.publishDate,
                description: book.description,
                pageCount: book.pageCount,
                imageLink: book.imageLink,
                price: (book.price === 'FREE') ? (book.price) : ((buyFlag) ? (book.price) : (0.5 * book.price)),
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
            { ( userSessionNavbar !== null && userSessionNavbar.flag === true) ? (<UserSessionNavBar/>) : (<NavBar/>)}
        </div>
        <div>
                <div style={{ marginTop:"10%", display: "flex", justifyContent: "center", flexDirection:"row"}}>
                    <Modal.Dialog style={{ float: "left", width: "50%"}}>
                        <Modal.Header style={{justifyContent: "center"}}>
                            <Modal.Title >Payment</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{padding: "20px"}}>
                            <div className="form-div">
                                <Form
                                    className="form"
                                >

                                    <FormGroup style={{ display:"inline-block", padding: "2%" }} >
                                        <FormControlLabel 
                                        control={<Checkbox/>}
                                        onClick={ () => { setRentFlag(!rentFlag);  }}
                                        label="BUY"
                                        disabled = { !buyFlag }
                                        />
                                        <FormControlLabel
                                        control={<Checkbox />}
                                        onClick={ () => { setBuyFlag(!buyFlag); } } 
                                        label="RENT"
                                        disabled = { !rentFlag }
                                        />
                                    </FormGroup>

                                    <Form.Group className="mb-3">
                                        <TextField
                                            required
                                            variant="outlined"
                                            label="Name on Card"
                                            type = "text"
                                            size="small"
                                            placeholder="Name on Card"
                                            />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                    <InputMask
                                        mask="9999-9999-9999-9999"
                                    >
                                    {() => 
                                    <TextField
                                        required
                                        label="Card Number"
                                        type = "text"
                                        size="small"
                                        placeholder="xxxx-xxxx-xxxx-xxxx"
                                    />}
                                    </InputMask>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        
                                        <InputMask
                                        mask="99/99"
                                    >
                                    {() => 
                                    <TextField
                                    required
                                    label="Expiry Month/Year"
                                    type = "text"
                                    size="small"
                                    placeholder="MM/YY"
                                    />}
                                    </InputMask>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                    <InputMask
                                        mask="999"
                                    >
                                    {() => 
                                    <TextField
                                    required
                                    label="CVV"
                                    type = "text"
                                    size="small"
                                    placeholder="xxx"
                                    />}
                                    </InputMask>
                                        
                                    </Form.Group>

                                    <Button 
                                    className="card button" 
                                    style={{width: "53%", marginBottom: "5px"}}
                                    onClick={ (event) => { handlePayment(event); } }
                                    >
                                    Pay</Button>
                                </Form>
                            </div>
                        </Modal.Body>
                    </Modal.Dialog>
                    <Modal.Dialog style={{ float: "right", width: "50%" }}>
                    <Modal.Header style={{justifyContent: "center"}}>
                            <Modal.Title>{ (book !== null) ? (book.title) : ('Book')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="image-modal">
                                    <img  width="240px" height="300px" variant="top" src={book.imageLink ==="NOT AVAILABLE" ? logo : book.imageLink.thumbnail} alt={book.title} style={{ alignSelf: "center" }} />
                                    <br/>
                                    <p><b>Authors:</b><br/>
                                        <div>
                                            {(book.authors === null) ? (<span>No authors available</span>) : (book.authors)}
                                        </div>
                                    </p>
                                    <p style={{ alignSelf:"center" }}><b>{  (book.price === 'FREE') ? (book.price) : ((buyFlag) ? (<>CAD ${book.price}</>) : (<>CAD ${0.5 * book.price}</>))  }</b><br/></p>
                        </div>
                    </Modal.Body>
                    </Modal.Dialog>
                    </div>
                </div>
        </div>
    )
}
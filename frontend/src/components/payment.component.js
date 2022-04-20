import React from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import NavBar from "./navbar.component";
import logo from '../assets/logo.png';
import UserSessionNavBar from "./usersessionnavbar.component";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import env from "react-dotenv";
import { useNavigate } from 'react-router-dom';

export default function Payment() {

    const  userSessionNavbar = (localStorage.getItem('loginNavbar') !== null) ? (JSON.parse(localStorage.getItem('loginNavbar'))) : (null);
    const  book = (localStorage.getItem('book-wl') !== null) ? (JSON.parse(localStorage.getItem('book-wl'))) :
        (localStorage.getItem('book-nl') !== null) ? (JSON.parse(localStorage.getItem('book-nl')))
            : (null);
    const userObj =  (localStorage.getItem('userObject') !== null) ? (JSON.parse(localStorage.getItem('userObject'))) : (null);
    const [buyFlag, setBuyFlag] = useState(true);
    const navigate = useNavigate();

    const handlePayment = async (event) => {
        event.preventDefault();
        const book_user = {
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
            price: (book.price === 'FREE') ? (book.price) : ((buyFlag) ? (book.price) : (0.5 * book.price)),
            rating: book.rating,
        };
        
        const price = (buyFlag) ? (100.0 * book.price) : (50.0 * book.price);

                        axios.post('http://localhost:5000/EBookHub/books/purchase/securePayment/',
                            {
                                customer_email: userObj.eMail,
                                line_items:
                                    [
                                        {
                                            quantity: 1,
                                            price_data: {
                                                currency: 'cad',
                                                unit_amount: Math.round(price),
                                                product_data:
                                                    {
                                                        name: book.title,
                                                        description: book.description,
                                                        images:
                                                            [
                                                                book.imageLink === "NOT AVAILABLE" ? 'https://raw.githubusercontent.com/Patelzil/E-Book-Hub/main/frontend/src/assets/logo.png' : book.imageLink.thumbnail
                                                            ]
                                                    }
                                            }
                                        }
                                    ],
                                payment_method_types: ["card"],
                            })
                            .then
                            (async function (response) {
                                    if (response.data.status === "success") {
                                        console.log(env.REACT_API_KEY);
                                        const stripe = await loadStripe(`${env.REACT_API_KEY}`);
                                        console.log(stripe);
                                        const id = response.data.sessionId;
                                        const {error} = await stripe.redirectToCheckout({sessionId: id});
                                        if (error) {
                                            console.log(error);
                                        }
                                    }
                                }
                            )
                            .catch ( function(error) {
                                    console.log(error)
                            });
    }
    return (
        <div>
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }}>
                { ( userSessionNavbar !== null && userSessionNavbar.flag === true) ? (<UserSessionNavBar/>) : (<NavBar/>)}
            </div>
            <div>
                <div style={{ justifyContent: "center"}}>
                    <Modal.Dialog style={{ width: "50%" }}>
                        <Modal.Header style={{justifyContent: "center"}}>
                            <Modal.Title>{ (book !== null) ? (book.title) : ('Book')}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="image-modal" style={{textAlign: "center"}}>
                                <img  width="240px" height="300px" variant="top" src={book.imageLink ==="NOT AVAILABLE" ? logo : book.imageLink.thumbnail} alt={book.title} style={{ alignSelf: "center" }} />
                                <br/>
                                <p><b>Authors:</b><br/>
                                    {(book.authors === null) ? (<span>No authors available</span>) : (book.authors)}
                                </p>
                                <p><b>{  (book.price === 'FREE') ? (book.price) : ((buyFlag) ? (<>CAD ${1 * book.price}</>) : (<>CAD ${0.5 * book.price}</>))  }</b><br/></p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="form-div">
                                <Form
                                    className="form"
                                    onSubmit={(event) => { handlePayment(event) }}
                                >
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Purchase Type:</FormLabel>
                                        <RadioGroup
                                            row
                                            defaultValue="Buy"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value="Buy"
                                                control={<Radio />}
                                                label="Buy"
                                                onClick={ () => { setBuyFlag(true); } }
                                            />
                                            <FormControlLabel
                                                value="Rent"
                                                control={<Radio />}
                                                label="Rent"
                                                onClick={ () => { setBuyFlag(false); } }
                                            />
                                        </RadioGroup>
                                    </FormControl>

                                    <Button
                                        type="submit"
                                        className="card button"
                                        style={{ width:"150px" }}
                                    >
                                        Pay
                                    </Button>

                                </Form>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            </div>
        </div>
    )
}
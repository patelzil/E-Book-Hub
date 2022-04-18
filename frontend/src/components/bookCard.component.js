import React, { useState } from "react";
import {Button, Card } from "react-bootstrap";
import {Rating} from "@mui/material";
import Modal from 'react-bootstrap/Modal';
import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";

export default function BookCard(props) {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const  loginFlag = (localStorage.getItem('loginNavbar') !== null) ? (JSON.parse(localStorage.getItem('loginNavbar'))) : (null);

    const handleDetails = (event) => {
        event.preventDefault();
        setShow(true);
    }

    const handleBuyBook = (event) => {
        event.preventDefault();
        if(loginFlag !== null)
        {
            localStorage.setItem('book-wl', JSON.stringify(props.bookDetails));
            navigate('/payment');
        } else
        {
            localStorage.setItem('book-nl', JSON.stringify(props.bookDetails));
            navigate('/login');
        }
    }

    return (
        <>
            <div>
                <Card style={{ width: '260px', height: '460px', margin: "15px" }}>
                    <div style={{width: "100%", height: "260px", display: "flex", flexDirection: "column", alignItems: "center",
                        justifyContent: "center"}}>
                        <Card.Img  width="260px" height="250px" style={{objectFit: 'contain'}} variant="top" src={props.bookDetails.imageLink ==="NOT AVAILABLE" ? logo : props.bookDetails.imageLink.thumbnail}/>
                    </div>
                    <Card.Body style={{width: "100%", marginTop: "0px"}}>
                        <Card.Title className="book-title" style={{fontSize: "18px", fontWeight: "bold"}}>{props.bookDetails.title}</Card.Title>
                        <Card.Subtitle className="book-title" style={{fontSize: "16px", fontWeight: "bold"}}>{props.bookDetails.subtitle}</Card.Subtitle>

                        <Card.Text className="book-title" style={{fontSize: "14px"}}>
                            {props.bookDetails.authors[0]}
                        </Card.Text>

                        <div style={{fontSize: "18px", fontWeight: "bold", margin: "0px"}}>{(props.bookDetails.price === 'FREE') ? (<>FREE</>) : (<>CAD ${props.bookDetails.price}</>)}
                            <div style={{ float: "right"}}>
                                <Rating name="read-only" value={props.bookDetails.rating} precision={0.5} readOnly />
                            </div>
                        </div>
                        {(props.showBuy) ? (<><Button className="card button" style={{width: "90%", marginBottom: "5px"}} onClick={handleBuyBook}>Buy</Button></>) : (<></>)}
                        <Button className="card button" style={{width: "90%", marginBottom: "5px"}} onClick={handleDetails}>Details</Button>

                    </Card.Body>
                </Card>
            </div>

            <div>
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    fullscreen
                    centered
                    scrollable={true}
                    restoreFocus={false}
                    dialogClassName="book-modal"
                >
                    <Modal.Header closeButton></Modal.Header>

                    <Modal.Body>
                        <div className="body-modal">
                            <div className="image-modal">
                                <img  width="240px" height="300px" style={{objectFit: 'contain'}}  variant="top" src={props.bookDetails.imageLink ==="NOT AVAILABLE" ? logo : props.bookDetails.imageLink.thumbnail} alt={props.bookDetails.title}/>
                                <br/>
                                <p><b>Authors:</b><br/>
                                    <div>
                                        {(props.bookDetails.authors === null) ? (<span>No authors available</span>) : (props.bookDetails.authors)}
                                    </div>
                                </p>
                            </div>
                            <div className="description-modal">
                                <Modal.Title id="contained-modal-title-vcenter">
                                    {props.bookDetails.title}
                                </Modal.Title>
                                <h4>{props.bookDetails.subtitle}</h4>
                                <hr/>
                                <p><b><i>Description:</i></b><br/><br/>{props.bookDetails.description === "NOT AVAILABLE" ? "No descriptive material is available for this title." : props.bookDetails.description} </p>
                                <b><i>More information:</i></b><br/>
                                <pre>
                                    Publisher       : {props.bookDetails.publisher}<br/>
                                    Publish date    : {props.bookDetails.publishDate}<br/>
                                    Number of pages : {props.bookDetails.pageCount}<br/>
                                    Category        : {props.bookDetails.category[0]}
                                </pre>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Title>
                            { <div>CAD ${props.bookDetails.price}</div> }
                        </Modal.Title>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

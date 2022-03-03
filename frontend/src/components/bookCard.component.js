import React, { useState } from "react";
import {Button, Card } from "react-bootstrap";
import {Rating} from "@mui/material";
import Modal from 'react-bootstrap/Modal'

export default function BookCard(props) {
    const [show, setShow] = useState(false);

    const handleDetails = () => {
        setShow(true);
    }

    return (
        <>
            <div>
                <Card style={{ width: '260px', height: '450px', margin: "15px" }}>
                    <div style={{width: "100%", height: "250px", display: "flex", flexDirection: "column", alignItems: "center",
                        justifyContent: "center"}}>
                        <Card.Img  width="260px" height="250px" variant="top" src={props.bookDetails.imageLink.thumbnail}/>
                    </div>
                    <Card.Body style={{width: "100%", marginTop: "0px"}}>
                        <Card.Title className="book-title" style={{fontSize: "20px", fontWeight: "bold"}}>{props.bookDetails.title}</Card.Title>
                        <Card.Subtitle className="book-title" style={{fontSize: "18px", fontWeight: "bold"}}>{props.bookDetails.subtitle}</Card.Subtitle>

                        <Card.Text className="book-title" style={{fontSize: "18px"}}>
                            {props.bookDetails.authors[0]}
                        </Card.Text>

                        <div style={{fontSize: "18px", fontWeight: "bold", margin: "0px"}}>FREE
                            <div style={{ float: "right"}}>
                                <Rating name="read-only" value={props.bookDetails.rating} precision={0.5} readOnly />
                            </div>
                        </div>

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
                >
                    <Modal.Body>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {props.bookDetails.title}
                        </Modal.Title>
                        <h4>{props.bookDetails.subtitle}</h4>
                        <p>
                            {props.bookDetails.description}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setShow(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </>
    )
}

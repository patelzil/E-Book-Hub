import React from "react";
import {Button, Card} from "react-bootstrap";
import logo from '../assets/logo.png'

export default function BookCard(props) {
    return (
        <Card style={{ width: '18rem', margin: "15px" }}>
            <div style={{width: "285px", height: "285px", display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center"}}>
                <Card.Img  variant="top" src= {props.bookDetails.imageLinks} alt={props.bookDetails.title} />
            </div>
            <Card.Body style={{width: "100%"}}>
                <Card.Title>{props.bookDetails.title}</Card.Title>
                <Card.Subtitle>{props.bookDetails.subtitle}</Card.Subtitle>
                <Card.Text>{props.bookDetails.author}</Card.Text>
                <div>$ 29.99<div style={{ float: "right"}}>Rating: {props.bookDetails.rating}</div></div>
                {/*<Rating name="read-only" value={props.bookDetails.rating} readOnly />*/}
                <Button className="card button">Details</Button>
            </Card.Body>
        </Card>

    )
}

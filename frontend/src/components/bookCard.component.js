import React from "react";
import {Button, Card} from "react-bootstrap";

export default function BookCard(props) {
    return (
        <Card style={{ width: '18rem', margin: "15px" }}>
            <div style={{width: "285px", height: "285px", display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center"}}>
                <Card.Img  variant="top" src={props.bookDetails.imageLinks+"?text=E-book-hub"}/>
            </div>
            <Card.Body style={{width: "100%"}}>
                <Card.Title style={{fontSize: "22px", fontWeight: "bold"}}>{props.bookDetails.title}</Card.Title>
                <Card.Subtitle style={{fontSize: "20px", fontWeight: "bold"}}>{props.bookDetails.subtitle}</Card.Subtitle>
                <Card.Text style={{fontSize: "18px"}}>{props.bookDetails.author}</Card.Text>
                <div style={{fontSize: "18px", fontWeight: "bold"}}>$ 29.99
                    <div style={{ float: "right"}}>Rating: {props.bookDetails.rating}</div>
                </div>
                <Button className="card button">Details</Button>
            </Card.Body>
        </Card>

    )
}

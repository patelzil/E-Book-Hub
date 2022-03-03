import React from "react";
import {Button, Card} from "react-bootstrap";
import {Rating} from "@mui/material";
import logo from '../assets/logo.png'

export default function BookCard(props) {
    return (
        <Card style={{ width: '285px', margin: "15px" }}>
            <div style={{width: "100%", height: "250px", display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center"}}>
                <Card.Img  variant="top" src={logo}/>
            </div>
            <Card.Body style={{width: "100%", marginTop: "10px"}}>
                <Card.Title style={{fontSize: "22px", fontWeight: "bold"}}>{props.bookDetails.title}</Card.Title>
                <Card.Subtitle style={{fontSize: "20px", fontWeight: "bold"}}>{props.bookDetails.subtitle}</Card.Subtitle>
                <Card.Text style={{fontSize: "18px"}}>{props.bookDetails.author}</Card.Text>
                <div style={{fontSize: "18px", fontWeight: "bold"}}>$ 29.99
                    <div style={{ float: "right"}}>
                        <Rating name="read-only" value={props.bookDetails.rating} precision={0.5} readOnly />
                    </div>
                </div>
                <Button className="card button" style={{width: "90%"}}>Details</Button>
            </Card.Body>
        </Card>
    )
}

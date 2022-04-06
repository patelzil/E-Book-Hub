import React, { useState } from "react";
import BookClubEventCard from "./bookClubEventCard.component";
import {Button, Card } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
import {Grid} from "@mui/material";
import { CardActions,  } from "@mui/material";
import axios from "axios";

export default function BookClubEvents(props){
    const  userSessionNavbar = (localStorage.getItem('loginNavbar') !== null) ? (JSON.parse(localStorage.getItem('loginNavbar'))) : (null);
    const userObject = JSON.parse(localStorage.getItem('userObject'));

    // FORM FIEDS
    const [bookClubTitle, setBookClubTitle] = useState("")
    const [bookClubInfo, setBookClubInfo] = useState("")

    const [errorMessage, setErrorMessage] = useState("");
    const [show, setShow] = useState(false)
    const [validated, setValidated] = useState(false);

    const handleModal = (event) => {
        event.preventDefault();
        setShow(true);
    }

    const handleCreateBookClub = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            axios.post("http://localhost:5000/EBookHub/books/bookclub/createBookclub", {bookclubName: bookClubTitle, info: bookClubInfo, user: userObject.username, MessagesInfo:[] })
            .then(function(response)
            {
                if(response.data.status === "success")
                {
                    // Close modal after request is successful
                    setShow(false);
                    window.alert(response.data.message);
                    //Refresh the page - Substitute for smooth refresh
                    window.location.reload(false);

                } else if(response.data.status === "Fail") {
                    window.alert(response.data.message);
                    // TODO: Show error to user about BookClub already exists!

                }
            })
            .catch(function (error) {
                console.log(error)
                setErrorMessage("Book Club already exists! You can choose another Title for your book Club.")
                alert("Book Club already exists! You can choose another Title for your book Club.");
            })

        }

        setValidated(true);

    }



    return (
        <div>

            <div style={ {width:'300px', maxHeight:'500px', display:"flex", justifyContent:"center",alignItems: "center"}}>
                <CardActions>
                    <Button variant="outline-success" size = "lg" onClick={handleModal}> CREATE BOOK CLUB </Button>
                </CardActions>
            </div>


            <div>
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    centered
                    scrollable={true}
                    restoreFocus={false}
                    dialogClassName="bookClub-modal"
                >
                    <Modal.Header closeButton><h2>Making reading more interesting...</h2></Modal.Header>

                    <Modal.Body>
                        <Form noValidate validated={validated} onSubmit={handleCreateBookClub}>
                            <Form.Group className="mb-3" controlId="formBasicText" onChange={(event) =>  { setBookClubTitle(event.target.value.trim()) }}>
                                <Form.Label> <h4>Book Club Title</h4> </Form.Label>
                                <Form.Control type="text" placeholder="Your book club title..." required/>
                                <Form.Text className="text-muted">
                                    Keep it short and interesting to attract readers.
                                </Form.Text>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">A Bookclub must have title!</Form.Control.Feedback>

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(event) =>  { setBookClubInfo(event.target.value.trim()) }}>
                                <Form.Label> <h4>Description </h4> </Form.Label>
                                <Form.Control as="textarea" rows={3} maxLength={1000} required/>
                                <Form.Text className="text-muted">
                                    Limit of 1000 characters
                                </Form.Text>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">A Bookclub must have a description!</Form.Control.Feedback>
                            </Form.Group>


                            <Button className="car button" type="submit" >
                                Create book club
                            </Button>
                        </Form>

                    </Modal.Body>

                </Modal>
            </div>


            {/* The list of book clubs will be received as prop list. Go through it and display each card */}

            <div style={{padding: "30px"}} title="bookClubComponent">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    { props.list === undefined ? (
                        <h3 style={{textAlign: "center", margin: "20px"}}>Search to see book clubs</h3>
                    ) : props.list.length > 0 ? (
                        props.list.map((bookClub)=><BookClubEventCard key={bookClub.id} bookClubDetails={bookClub} currentUser={userObject}/>)
                    ) : (
                        <h3 style={{textAlign: "center", margin: "20px"}}>No book clubs found</h3>
                    )}
                </Grid>
            </div>

        </div>
    );
}

import React, { useState } from "react";
import {Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { CardActions, CardContent, Divider,Chip } from "@mui/material";
import { BsCheckLg } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import axios from "axios";


export default function BookClubEventCard(props){

    function isUserInThisClub(){
        let userInClub = (props.bookClubDetails.Users).includes(props.currentUser.username);
        return userInClub;
    }

    const [showJoin, setShowJoin] = useState(isUserInThisClub() )
    // const [bookClubItem, setBookClubItem] = useState(props.bookClubDetails)
    const [flag, setFlag] = useState(false);

    const handleJoin = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/EBookHub/books/bookclub/addUser", {bookclubName: props.bookClubDetails.bookclubName, user: props.currentUser.username })
        .then(function(response)
        {
            if(response.data.status === "success")
            {
                // alert("Succcessfully added");
                setShowJoin(isUserInThisClub());
                window.location.reload(false);
            } else {
                alert("failed to add");

            }
        })
        .catch(function (error) {
            alert(error)
            console.log(error)
        })
        
        axios.get(`http://localhost:5000/EBookHub/users/${ props.currentUser.username }/${ props.currentUser.password }`)
            .then(function(response){
                if(response.data.status === "success")
                {
                        const temp = response.data.data.user;
                        localStorage.setItem('userObject', JSON.stringify(temp));
                } 
            })
            .catch(function (error) {
                console.log(error)
            })

    }


    const handleLeave = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/EBookHub/books/bookclub/deleteUser", {bookclubName: props.bookClubDetails.bookclubName, user: props.currentUser.username })
        .then(function(response)
        {
            if(response.data.status === "Success")
            {
                // alert("Succcessfully exited");
                setShowJoin(isUserInThisClub());
                window.location.reload(false);

            } else {
                alert("failed exited");

            }
        })
        .catch(function (error) {
            alert(error)
            console.log(error)
        })

        axios.get(`http://localhost:5000/EBookHub/users/${ props.currentUser.username }/${ props.currentUser.password }`)
            .then(function(response){
                if(response.data.status === "success")
                {
                        const temp = response.data.data.user;
                        localStorage.setItem('userObject', JSON.stringify(temp));
                } 
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return(
        <div style={ {width:'400px', display:"flex", justifyContent:"center",alignItems: "center", margin:'5px'}}>
            <Card style={{backgroundColor:"#f5f5f5", borderRadius:"25px" }} sx={{maxWidth: 400, displayPrint: 'flex', justifyContent:'center'}} variant="outine">
                <CardContent>
                    <div style={{justifyContent:"center", margin:"2px", borderRadius:"25px",display:"flex", padding:"5px",color:"#FFFFFF",background: "linear-gradient(to right, #304352, #d7d2cc)" }}>
                        <Typography variant="h5" component="div">
                            {props.bookClubDetails.bookclubName}
                        </Typography>
                    </div>

                    <Divider>
                        <Chip label="CLUB INFO" />
                    </Divider>

                    <div style={{height:"150px",width:"350px", overflow: 'clip'}}>
                        <Typography variant="body" >
                            {props.bookClubDetails.info}
                        </Typography>
                    </div>

                </CardContent>

                <CardActions>
                    {showJoin?
                        <Button variant="outline-danger" size = "md" onClick={ handleLeave }> <BsXLg/> LEAVE </Button>
                    :
                        <Button variant="outline-success" size = "md" onClick={ handleJoin }> <BsCheckLg/> JOIN </Button>
                    }

                    <Link to="/chatActivity" state ={{bookClubItem: props.bookClubDetails}} className="button">View Activity</Link>

                </CardActions>
            </Card>
        </div>
    );
}

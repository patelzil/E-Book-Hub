import React from "react";
import BookCard from "./bookCard.component";
import {Grid} from "@mui/material";

export default function Books(props) {
    return (
        <div style={{padding: "30px"}} title="bookComponent">
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                { props.list === undefined ? (
                    <h3 style={{textAlign: "center", margin: "20px"}}>Search to see books.</h3>
                ) : props.list.length > 0 ? (
                    props.list.map((book)=><BookCard key={book.id} bookDetails={book}/>)
                ) : (
                    <h3 style={{textAlign: "center", margin: "20px"}}>No books found. Please try again.</h3>
                )}
            </Grid>
        </div>
    )
}

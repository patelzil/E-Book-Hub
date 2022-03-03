import React from "react";
import BookCard from "./bookCard.component";
import {Grid} from "@mui/material";

export default function Books() {
    const list = [{
        title: "book",
        subtitle: "one",
        author: "author name",
        categories: "category",
        pageCount: 435,
        rating: 3.5,
        description: "I don't know what should go here.",
        imageLinks: "",
    },{
        title: "book",
        subtitle: "two",
        author: "author name",
        categories: "category",
        pageCount: 435,
        rating: 3.5,
        description: "I don't know what should go here.",
        imageLinks: "../assets/logo.png",
    },{
        title: "book",
        subtitle: "three",
        author: "author name",
        categories: "category",
        pageCount: 435,
        rating: 3.5,
        description: "I don't know what should go here.",
        imageLinks: "",
    },{
        title: "book",
        subtitle: "four",
        author: "author name",
        categories: "category",
        pageCount: 435,
        rating: 3.5,
        description: "I don't know what should go here.",
        imageLinks: "../assets/logo.png",
    },{
        title: "book",
        subtitle: "five",
        author: "author name",
        categories: "category",
        pageCount: 435,
        rating: 3.5,
        description: "I don't know what should go here.",
        imageLinks: "../assets/logo.png",
    },{
        title: "book",
        subtitle: "six",
        author: "author name",
        categories: "category",
        pageCount: 435,
        rating: 3.5,
        description: "I don't know what should go here.",
        imageLinks: "../assets/logo.png",
    }]

    return (
        <div style={{padding: "30px"}}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                { list.length > 0 ? (
                    list.map((book, key)=><BookCard bookDetails={book}/>)
                ) : (
                    <h3 style={{textAlign: "center", margin: "20px"}}>No books found.</h3>
                )}
            </Grid>
        </div>
    )
}

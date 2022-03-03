import axios from 'axios';
import React, { useState } from "react";
import SearchBar from "./SearchBar";


export default function Home(){
    const [bookList, setBookList] = useState([])

    //run this functions when search bar is submitted
    const onSearchSubmit = (searchTerm, filterValue, minPrice, maxPrice) => {
        console.log("Searchterm: ", searchTerm, " filtervalue:", filterValue, "PriceSet", minPrice,"-", maxPrice);
        //call to axios function
       //filterValue : Possible terms are {searchTitle, searchAuthor, searchPrice/searchFree, searchCategory}
        axios.get('http://localhost:5000/EBookHub/books/${filterValue}/${searchTerm}')
            .then(function(response){
                if(response.data.status === "success"){
                    setBookList(response.data.responseBooks);
                }
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    return (
        <div className="ui container" style={{marginTop: '10px'}}>
            <SearchBar onSubmit={onSearchSubmit}></SearchBar>
        </div>
    );
    
}


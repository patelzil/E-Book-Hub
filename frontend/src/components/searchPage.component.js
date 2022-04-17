import axios from 'axios';
import React, {useEffect, useState} from "react";
import SearchBar from "./searchBar.component";
import Books from "./books.component";

export default function SearchPageComponent(props){
    const [bookList, setBookList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/EBookHub/books/default')
            .then(function(response){
                if(response.data.status === "success"){
                    setBookList(response.data.data.responseBooks);
                }else{
                    setBookList([])
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }, []);

    //run this functions when search bar is submitted
    const onSearchSubmit = (searchTerm,minPrice, maxPrice) => {
        //call to axios function
        //filterValue : Possible terms are {searchTitle, searchAuthor, searchPrice/searchFree, searchCategory}
        const searchUrl = 'http://localhost:5000/EBookHub/books/' + props.filterChosen + '/' + searchTerm;
        axios.get(searchUrl)
            .then(function(response){
                if(response.data.status === "success"){
                    setBookList(response.data.data.responseBooks);
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    // position = fixed is used to make the search bar fixed
    return (
        <div  className="ui container" title="searchRequestPage">
         
            <div className="ui container"  style={{position:'fixed', zIndex:1, marginTop:'-35px'}}>
                <SearchBar onSubmit={onSearchSubmit}></SearchBar>
            </div>
         
            <div title='listOfBooks' style={{paddingTop:'70px'}}>
                <Books list={bookList} showBuy={true}/>
            </div>

        </div>
    
    )
}

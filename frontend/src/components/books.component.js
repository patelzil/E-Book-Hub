import React, {useEffect, useState} from "react";
import BookCategory from "./bookCategory";
import axios from "axios";

export default function Books(props) {
    const [comic, setComic] = useState([]);
    const [classics, setClassics] = useState([]);
    const [horror, setHorror] = useState([]);

    useEffect(() => {
        let isSubscribed = true;

        axios.get('http://localhost:5000/EBookHub/books/searchCategory/comic')
            .then(function(response){
                if(response.data.status === "success"){
                    setComic(response.data.data.responseBooks);
                }else{
                    setComic([])
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        axios.get('http://localhost:5000/EBookHub/books/searchCategory/classics')
            .then(function(response){
                if(response.data.status === "success"){
                    setClassics(response.data.data.responseBooks);
                }else{
                    setClassics([])
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        axios.get('http://localhost:5000/EBookHub/books/searchCategory/horror')
            .then(function(response){
                if(response.data.status === "success"){
                    setHorror(response.data.data.responseBooks);
                }else{
                    setHorror([])
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        return () => (isSubscribed = false)
    }, []);

    return (
        <>
            <BookCategory title={"Search results..."} list={props.list} showBuy={props.showBuy}/>
            <h2 style={{textAlign: 'center', paddingTop: "20px"}}>EXPLORE MORE</h2>
            <BookCategory title={"Comic Books"} list={comic} showBuy={props.showBuy}/>
            <BookCategory title={"Classics"} list={classics} showBuy={props.showBuy}/>
            <BookCategory title={"Horror"} list={horror} showBuy={props.showBuy}/>
        </>
    )
}

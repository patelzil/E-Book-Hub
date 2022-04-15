import React from "react";
import BookCard from "./bookCard.component";
import {Carousel} from "react-bootstrap";

export default function BookCategory(props) {
    return (
        <>
            <h3 style={{paddingTop: "10px", paddingLeft: "10px"}}>{props.title}</h3>
            {/*<div style={{position: "relative"}}>*/}
            {/*<Carousel>*/}
                <div className={"custom-scrollbar"} style={{padding: "0px", display: "flex", flexDirection: "row", overflow: "auto"}} title="bookComponent">
                    { props.list === undefined ? (
                        <h3 style={{textAlign: "center", margin: "20px"}}>Search to see books.</h3>
                    ) : props.list.length > 0 ? (
                        props.list.map((book, index)=><Carousel.Item><BookCard id={index.toString()} key={index} bookDetails={book} showBuy={props.showBuy}/></Carousel.Item>)
                    ) : (
                        <h3 style={{textAlign: "center", margin: "20px"}}>No books found. Please try again.</h3>
                    )}
                </div>
            {/*</Carousel>*/}

                {/*<button style={{position: "absolute", right: "0px", top: "50%"}}*/}
                {/*    onClick={onClickRight}*/}
                {/*>*/}
                {/*    Right*/}
                {/*</button>*/}
            {/*</div>*/}
        </>
    )
}

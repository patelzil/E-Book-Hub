import React from "react";
import BookCard from "./bookCard.component";

export default function BookCategory(props) {
    return (
        <>
            <h3 style={{paddingTop: "10px", paddingLeft: "10px"}}>{props.title}</h3>
            <div style={{position: "relative"}}>
                <div id={props.title+"slide"} className={"custom-scrollbar"} style={{padding: "0px", display: "flex",  scrollBehavior: "smooth", flexDirection: "row", overflowX: "scroll"}} title={props.title}>
                    { props.list === undefined ? (
                        <h3 style={{textAlign: "center", margin: "20px"}}>Search to see books.</h3>
                    ) : props.list.length > 0 ? (
                            props.list.map((book, index) =>
                                <BookCard key={index} bookDetails={book} showBuy={props.showBuy}/>
                            )
                    ) : (
                        <h3 style={{textAlign: "center", margin: "20px"}}>No books found. Please try again.</h3>
                    )}
                </div>
                <div>
                    {props.list !== undefined && props.list.length > 0 ? (
                        <button
                            style={{ position: "absolute", right: "0px", top: '50%' }}
                            onClick={()=> {
                                document.getElementById(props.title + "slide").scrollLeft += 700;
                            }}
                        >
                            next
                        </button>
                    ): <></>
                    }
                </div>
                <div>
                    {props.list !== undefined && props.list.length > 0 ? (
                        <button
                            style={{ position: "absolute", left: "0px", top: '50%' }}
                            onClick={()=> {
                                document.getElementById(props.title + "slide").scrollLeft -= 700;
                            }
                            }>
                            prev
                        </button>
                    ): <></>
                    }
                </div>
            </div>
        </>
    )
}

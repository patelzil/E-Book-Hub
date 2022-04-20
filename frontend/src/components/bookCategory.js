import React from "react";
import BookCard from "./bookCard.component";
import {FiChevronRight, FiChevronLeft} from "react-icons/fi";

export default function BookCategory(props) {
    return (
        <>
            <h3 style={{paddingTop: "10px", paddingLeft: "10px"}}>{props.title}</h3>
            <div style={{position: "relative", display: "flex", justifyContent: "row"}}>
                <div id={props.title+"slide"} className={"custom-scrollbar"} style={{display: "flex",  scrollBehavior: "smooth", flexDirection: "row", overflowX: "scroll"}} title={props.title}>
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
                        <FiChevronRight
                            size={45}
                            style={{ position: "absolute", paddingLeft: "3px", right: "5px", top: '50%', backgroundColor: "#606060", color: "white", borderRadius: '50%' }}
                            onClick={()=> {
                                document.getElementById(props.title + "slide").scrollLeft += 700;
                            }}/>
                    ): <></>
                    }
                </div>
                <div>
                    {props.list !== undefined && props.list.length > 0 ? (
                        <FiChevronLeft
                            size={45}
                            style={{ position: "absolute", left: "5px", top: '50%',background:"#606060", color: "white", borderRadius: '50%' }}
                            onClick={()=> {
                                document.getElementById(props.title + "slide").scrollLeft -= 700;
                            }
                            }/>
                    ): <></>
                    }
                </div>
            </div>
        </>
    )
}

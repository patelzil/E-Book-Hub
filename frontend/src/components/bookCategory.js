import React, { useLayoutEffect, useState } from "react";
import BookCard from "./bookCard.component";
// carousel imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BookCategory(props) {
    const [width, setWidth] = useState(window.innerWidth)

    useLayoutEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <>
            <h3 style={{paddingTop: "10px", paddingLeft: "10px"}}>{props.title}</h3>
            <div style={{position: "relative"}}>
                <div className={"custom-scrollbar"} style={{padding: "0px", display: "flex", flexDirection: "row", overflowX: "scroll"}} title="bookComponent">
                    { props.list === undefined ? (
                        <h3 style={{textAlign: "center", margin: "20px"}}>Search to see books.</h3>
                    ) : props.list.length > 0 ? (
                            <Swiper
                                slidesPerView={width/275}
                                spaceBetween={30}
                                slidesPerGroup={4}
                                loopFillGroupWithBlank={true}
                                navigation={true}
                                modules={[ Navigation]}
                                className="mySwiper"
                            >
                                {props.list.map((book, index) => <SwiperSlide>
                                        <BookCard id={index.toString()} key={index} bookDetails={book} showBuy={props.showBuy}/>
                                    </SwiperSlide>)
                                }
                            </Swiper>
                    ) : (
                        <h3 style={{textAlign: "center", margin: "20px"}}>No books found. Please try again.</h3>
                    )}
                </div>
            </div>
        </>
    )
}

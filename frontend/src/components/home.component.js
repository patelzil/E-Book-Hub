import React from "react";
import Books from "./books.component";
import NavBar from "./navbar.component";

export default function Home() {
        return (
            <div>
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }}>
            <NavBar/>
            </div>
            <div><Books/></div>
            </div>
        )
    }

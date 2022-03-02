import React from "react";
import NavBar from "./navbar.component";

export default function Home() {

        

        return (
            <>
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }}>
            <NavBar/>
            </div>
            <h1> Welcome Home!</h1>
            </>
        )
    }

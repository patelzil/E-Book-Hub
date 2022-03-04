import React from "react";
import NavBar from "./navbar.component";
import SearchPage from './searchPage.component'

export default function Home(){
    return (
        <div>
            <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }}>
                <NavBar/>
            </div>
            <SearchPage/>
        </div>
    )
}

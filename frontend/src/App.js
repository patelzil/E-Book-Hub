import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./components/home.component"
import Login from "./components/login.component";
import Signup from "./components/signup.component";
import User from "./components/user.component";
import NavBar from "./components/navbar.component";

function App() {
  return (
      <Router>
        <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }}><NavBar/></div>
          {/*<NavBar/>*/}
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/user" element={<User />}/>
        </Routes>
      </Router>
  );
}

export default App;

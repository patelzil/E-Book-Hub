import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./components/home.component"
import Login from "./components/login.component";
import Signup from "./components/signup.component";
import User from "./components/user.component";
import UserProfile from "./components/userprofile.component";
import BookClubs from "./components/bookClubs.component"
import ChatActivity from "./components/chatActivity.component"
import ChatRoom from "./components/ChatRoom.component";

function App() {

  return (
      <Router>
          <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/profile" element={<UserProfile/>}/>
          <Route path="/bookClubs" element={<BookClubs/>}/>
          <Route path="/chatActivity" element={<ChatActivity/>}/>
          <Route path="/chat" element={<ChatRoom/>}/>
          </Routes>
      </Router>
  );
}

export default App;

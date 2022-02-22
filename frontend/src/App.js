import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/home.component"
import Login from "./components/login.component";
import Signup from "./components/signup.component";

function App() {
  return (
      <Router>
          <h1>Welcome to the E-book-hub home page</h1>
        <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
  );
}

export default App;

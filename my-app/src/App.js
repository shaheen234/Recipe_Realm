import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import './style.css';
import { Login } from "./Login";
import { Register } from "./Register";
import AboutUs from "./Aboutus";
import Contact from "./Contacts";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <Router>
      <header className="header">
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <div className="App">
        <Routes>
          <Route path="/" element={
            currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
          } />
          
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
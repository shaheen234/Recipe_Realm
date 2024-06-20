import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import './App.css';
import './style.css';
import { Login } from "./Login";
import { Register } from "./Register";
import AboutUs from "./Aboutus";
import Contact from "./Contacts";
import HomePage from "./home";
import PostPage from "./postpage";

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
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <LoginRegisterButton 
            currentForm={currentForm}
            setCurrentForm={toggleForm}
          />
        </nav>
      </header>
      <div className="App">
        <Routes>
          <Route path="/" element={
            currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
          } />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/login" element={<Login onFormSwitch={toggleForm} />} />
          <Route path="/register" element={<Register onFormSwitch={toggleForm} />} />
        </Routes>
      </div>
    </Router>
  );
}

const LoginRegisterButton = ({ currentForm, setCurrentForm }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (currentForm === 'login') {
      setCurrentForm('register');
      navigate('/register');
    } else {
      setCurrentForm('login');
      navigate('/login');
    }
  }

  return (
    <button 
      className="login-signup-btn" 
      onClick={handleClick}
    >
      {currentForm === 'login' ? 'Sign Up' : 'Login'}
    </button>
  );
};

export default App;

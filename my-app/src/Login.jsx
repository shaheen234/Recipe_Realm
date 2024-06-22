import React, { useState } from "react";
import { useLocation } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import './login.css'

export const Login = (props) => {
    const [email, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate()

    const location = useLocation();
    const { message } = location.state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        const params = {
            name: email,
            password: pass
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        };
        try{
            let response = await fetch('http://localhost:8000/api/login/', requestOptions);
            if (response.ok){
                let data = await response.json();
                console.log(data);
                navigate('/home', { state: { message: 'Logged In successfully! ✅'}})
                
            }
        }catch (e){
            console.log(e);
        }

    }

    return (
        <div className="auth-form-container">
            <div className='success-msg'>{message}</div>
            <h2>Log In</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Username</label>
                <input value={email} onChange={(e) => setUsername(e.target.value)}type="name" placeholder="Username" id="name" name="name" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="Enter password" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here</button>
        </div>
    )
}
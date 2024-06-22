import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

export const Register = (props) => {
    const [pass, setPass] = useState('');
    const [name, setUsername] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name);
        const params = {
            name: name,
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
            let response = await fetch('http://localhost:8000/api/signup/', requestOptions);
            if (response.ok){
                let data = await response.json();
                console.log(data);
                navigate('/login', { state: { message: 'User created successfully! ✅'}})
                
            }
        }catch (e){
            console.log(e);
        }

    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Username</label>
                <input value={name} onChange={(e) => setUsername(e.target.value)}name="name" id="name" placeholder="Username" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="Enter password" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? LogIn here</button>
        </div>
    )
}
import React, { useState } from "react";

export const Login = (props) => {
    const [email, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
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
import React, { useState } from "react";

export const Register = (props) => {
    const [pass, setPass] = useState('');
    const [name, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
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
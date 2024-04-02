import React, { useState } from 'react';
import './Login.scss';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false); // Initialize termsAgreed state as false

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleTermsChange = (event) => {
        setTermsAgreed(event.target.checked); // Update termsAgreed state based on checkbox status
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Perform validation here if needed 

        // Once validated, send the data to the backend for authentication
        const userData = {
            email: email,
            password: password,
        };


        try {
            const response = await axios.post('http://localhost:3000/users/login', userData);

            if (response.status >= 200 && response.status < 300) {
                console.log(response.data);
                alert(`Welcome back ${response.data.name}`)
                window.location.href = '/';
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <main id="main-content1">
            <div id="signup-container">
            <p className="kind1">Welcome Back!</p>
            <p className="kind2">Enter your credentials to access your account:</p>
                <form id="create-account-form" onSubmit={handleSubmit}>

                <p className="reg">Email address</p>
                    <input type="email" id="email" placeholder="Email address" value={email} onChange={handleEmailChange} />
                
                <p className="reg">Password</p>
                    <input type="password" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    <div className="checkbox-container">
                        <input type="checkbox" id="terms" checked={termsAgreed} onChange={handleTermsChange} />
                        <label htmlFor="terms">I agree to the terms & privacy policy</label>
                    </div>
                    <button type="submit" className="btn primary-btn">Log In</button>
                </form>
                <p className="signin-link">Don't have an account? <a href="/register">Sign up</a></p>
            </div>
        </main>
    );
};

export default Login;

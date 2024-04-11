import React, { useState } from 'react';
import './Login.scss';
import axios from 'axios';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                toast.success(`Welcome back, ${response.data.name}`, {autoClose: 2000}); // Send log-in success notif
                setTimeout(() => window.location.href = '/', 2500); // Redirect Home in 2.5s
            } else {
                console.error('Log-In failed');
                toast.error('Log-In failed');
            }
        } catch (error) {

            // Code 401: Unauthorized, Incorrect Creds 
            // Notify incorrect creds. (In practice, for us, specifically wrong pw)
            if (error.response.status == 401) {
                toast.error('Log-In Failed: Incorrect Credentials');

            } else { // includes wrong username
                console.error('Error:', error.message);
                toast.error('Error');
            }
        }
    };

    return (
        <main id="main-content">
            <div id="signup-container">
                <h1>Login</h1>
                <form id="create-account-form" onSubmit={handleSubmit}>
                    <input type="email" id="email" placeholder="Email address" value={email} onChange={handleEmailChange} />
                    <input type="password" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    <div className="checkbox-container">
                        <input type="checkbox" id="terms" checked={termsAgreed} onChange={handleTermsChange} />
                        <label htmlFor="terms">I agree to the terms & privacy policy</label>
                    </div>
                    <button type="submit" className="btn primary-btn">Log In</button>
                </form>
                <p className="signin-link">Don't have an account? <a href="/register">Sign up</a></p>

                <ToastContainer newestOnTop/>
            </div>
        </main>
    );
};

export default Login;

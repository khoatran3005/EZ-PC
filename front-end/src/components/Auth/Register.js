import React, { useState } from 'react';
import './Register.scss';
import axios from 'axios';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);


    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleRetypePasswordChange = (event) => setRetypePassword(event.target.value);
    const handleTermsChange = (event) => setTermsAgreed(event.target.checked);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            name: name,
            email: email,
            password: password,
        };
        try {
            const response = await axios.post('http://localhost:3000/users', userData);

            if (response.status >= 200 && response.status < 300) {
                console.log('User registered successfully');
                toast.success('Registration successful!', {autoClose: 2000});
                setTimeout(() => window.location.href = '/login', 2500); // Redirect to Log-in in 2.5s
            } else {
                console.error('Registration failed');
                toast.error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error.message);
            toast.error('Registration failed. Review form and try again.');
        }
    };

    return (
        <>
            <main id="main-content">
                <div id="signup-container">
                    <h1>Create an account</h1>
                    <form id="create-account-form" onSubmit={handleSubmit}>
                        <input type="text" id="name" placeholder="Name" value={name} onChange={handleNameChange} />
                        <input type="email" id="email" placeholder="Email address" value={email} onChange={handleEmailChange} />
                        <input type="password" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                        <input type="password" id="retype-password" placeholder="Retype Password" value={retypePassword} onChange={handleRetypePasswordChange} />
                        <div className="checkbox-container">
                            <input type="checkbox" id="terms" checked={termsAgreed} onChange={handleTermsChange} />
                            <label htmlFor="terms">I agree to the terms & privacy policy</label>
                        </div>
                        <button type="submit" className="btn primary-btn" onClick={handleSubmit}>Sign Up</button>
                    </form>
                    <p className="signin-link">Have an account? <a href="/login">Sign In</a></p>

                    <ToastContainer newestOnTop/>
                </div>
            </main>
        </>
    )
}

export default Register;

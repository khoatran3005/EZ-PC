import React, { useState, useContext, useEffect } from 'react';
import './Login.scss';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../contexts/UserContext.js';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);
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

    // const validateEmail = (email) => { // Not working, fix ---------------------
    //     return String(email)
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|.(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
    //         );
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate details

        // Not working, fix ---------------------
        // if (!validateEmail(email)) {
        //     console.error('Registration Failed. Invalid Email.');
        //     toast.error('Registration Failed. Invalid Email.');
        // };

        // Once validated, send the data to the backend for authentication
        const userData = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('http://localhost:3000/users/login', userData);
            console.log('Response recieved from server.')
            if (response.status >= 200 && response.status < 300) {
                console.log(response.data);
                setUser(response.data); // Set the user context to the response data
                console.log(`Successfully logged in as: ${response.data.name}`);
                toast.success(`Welcome back, ${response.data.name}!`, { autoClose: 2000 }); // Send log-in success notification
            } else {
                console.error('Log-In failed: Server issue.');
                toast.error('Log-In failed: Server issue.');
            }
        } catch (error) {
            console.error('Log-In failed. Error:', error.message);
            toast.error('Log-In failed: Unknown Error.');
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/'); // Redirect to Home if user is already logged in
        }
    }, [user, navigate]);

    return (
        <main id="main-content1" style={{
            position: 'relative',
            height: '100vh',
            background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)', /* Gradient background */
        }}>
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
                        <label htmlFor="terms" id="ag">I agree to the terms & privacy policy</label>
                    </div>
                    <button type="submit" className="btn primary-btn">Log In</button>
                </form>
                <p className="signin-link">Don't have an account? <Link to="/register">Sign up</Link></p>

                <ToastContainer newestOnTop />
            </div>
        </main>
    );
};

export default Login;

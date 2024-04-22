import React, { useContext, useEffect, useState } from 'react';
import './Register.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Register = () => {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
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
                navigate('/login');
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/'); // Redirect to Home if user is already logged in
        }
    }, [user]);

    return (
        <>
            <main id="main-content" style={{
                position: 'relative', /* Ensure proper positioning */
                height: '100vh', /* Full viewport height */
                background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)', /* Gradient background */
            }}>
                <div id="signup-container">

                    <p className="kind">Create an account:</p>

                    <form id="create-account-form" onSubmit={handleSubmit}>
                        <p className="reg">Name</p>
                        <input type="text" id="name" placeholder="Name" value={name} onChange={handleNameChange} />

                        <p className="reg">Email address</p>

                        <input type="email" id="email" placeholder="Email address" value={email} onChange={handleEmailChange} />

                        <p className="reg">Password</p>
                        <input type="password" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />

                        <p className="reg">Retype Password</p>
                        <input type="password" id="retype-password" placeholder="Retype Password" value={retypePassword} onChange={handleRetypePasswordChange} />
                        <div className="checkbox-container">

                            <input type="checkbox" id="terms" checked={termsAgreed} onChange={handleTermsChange} />
                            <label htmlFor="terms">I agree to the terms & privacy policy</label>
                        </div>
                        <button type="submit" className="btn primary-btn" onClick={handleSubmit}>Sign Up</button>
                    </form>
                    <p className="signin-link">Have an account? <Link to="/login">Sign In</Link></p>
                </div>
            </main>
        </>
    )
}

export default Register;

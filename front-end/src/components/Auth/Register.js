import React, { useState } from 'react';
import './Register.scss'; // Make sure you have the corresponding SCSS file for styling

const Register = () => {
    // State for input fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);

    // Event handlers
    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleRetypePasswordChange = (event) => setRetypePassword(event.target.value);
    const handleTermsChange = (event) => setTermsAgreed(event.target.checked);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Add validation for password matching and possibly other checks

        // If validation passes, proceed to send the data
        const userData = {
            name: name,
            email: email,
            password: password,
            termsAgreed: termsAgreed
        };

        // Replace 'YOUR_BACKEND_ENDPOINT' with the actual endpoint to your backend service
        fetch('YOUR_BACKEND_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.ok) {
                // Handle successful registration
                console.log('User registered successfully');
            } else {
                // Handle failed registration
                console.error('Registration failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
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
                        <button type="submit" className="btn primary-btn">Signup</button>
                    </form>
                    <p className="signin-link">Have an account? <a href="/login">Sign In</a></p>
                </div>
            </main>
        </>
    )
}

export default Register;

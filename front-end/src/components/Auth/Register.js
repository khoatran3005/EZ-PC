const Register = () => {
    return (
        <>
            <main id="main-content">
                <div id="signup-container">
                    <h1>Create an account</h1>
                    <form id="create-account-form">
                        <input type="text" id="name" placeholder="Name" />
                        <input type="email" id="email" placeholder="Email address" />
                        <input type="password" id="password" placeholder="Password" />
                        <input type="retype-password" id="retype-password" placeholder="retype-password" />
                        <div class="checkbox-container">
                            <input type="checkbox" id="terms" />
                            <label for="terms">I agree to the terms & privacy policy</label>
                        </div>
                        <button type="submit" class="btn primary-btn">Signup</button>
                    </form>
                    <p class="signin-link">Have an account? <a href="/login">Sign In</a></p>
                </div>
            </main>
        </>
    )
}

export default Register;
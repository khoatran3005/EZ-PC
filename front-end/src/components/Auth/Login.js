import './Login.scss'

const Login = () => {
    return (
        <>
            <main id="main-content">
                <div id="signup-container">
                    <h1>Login</h1>
                    <form id="create-account-form">
                        <input type="email" id="email" placeholder="Email address" />
                        <input type="password" id="password" placeholder="Password" />
                        <div class="checkbox-container">
                            <input type="checkbox" id="terms" />
                            <label for="terms">I agree to the terms & privacy policy</label>
                        </div>
                        <button type="submit" class="btn primary-btn">Signup</button>
                    </form>
                    <p class="signin-link">Don't have an account? <a href="/register  ">Sign up</a></p>
                </div>
            </main>
        </>
    )
}

export default Login;
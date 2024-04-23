import logo from '../../assets/logo.png'
import './Header.scss'
import { Link } from "react-router-dom";



const Header = () => {
    return (
        <>
            {<nav>
                <div id="logo">
                    <Link to="/"><img src={logo} alt="company logo"></img></Link>
                </div>

                <ul id="HLS">
                    <button id="signup-btn" className="btn"><Link to="/register" className='nav-link'>Sign Up</Link></button>

                    <Link to="/login" className='nav-link'>Login</Link>
                    <Link to="/" className='nav-link'>Home</Link>
                </ul>

            </nav>}


        </>
    )
}

export default Header;

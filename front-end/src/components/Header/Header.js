import logo from '../../assets/logo.png'
import './Header.scss'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
    return (
        <>
            <nav>
                <div id="logo">
                    <Link to="/"><img src={logo} alt="company logo"></img></Link>
                </div>
                <b>
                    <div id="HLS">
                        <button id="signup-btn" class="btn"><Link to="/register" className='nav-link'>Sign Up</Link></button>
                        <Link to="/login" className='nav-link'>Login</Link>
                        <Link to="/" className='nav-link'>Home</Link>
                    </div>
                </b>
            </nav>
        </>
    )
}

export default Header;

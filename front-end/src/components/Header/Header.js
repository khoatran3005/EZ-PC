import { useContext } from 'react';
import logo from '../../assets/logo.png'
import './Header.scss'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';



const Header = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    if (user) {
        return (
            <>
                {<nav>
                    <div id="logo">
                        <Link to="/"><img src={logo} alt="company logo"></img></Link>
                    </div>

                    <ul id="HLS">
                        <button id="signup-btn" className="btn"><Link to="/saved" className='nav-link'>Saved PCs</Link></button>

                        <Link className='nav-link' onClick={handleLogout}>Log Out</Link>
                        <Link to="/" className='nav-link'>Home</Link>
                    </ul>

                </nav>}
            </>
        )

    } else {
        return (
            <>
                {<nav>
                    <div id="logo">
                        <Link to="/"><img src={logo} alt="company logo"></img></Link>
                    </div>

                    <ul id="HLS">
                        <button id="signup-btn" className="btn"><Link to="/register" className='nav-link'>Sign Up</Link></button>

                        <Link to="/login" className='nav-link'>Log In</Link>
                        <Link to="/" className='nav-link'>Home</Link>
                    </ul>

                </nav>}
            </>
        )
    }

}

export default Header;

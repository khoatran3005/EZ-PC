import { useContext } from 'react';
import ill from '../../assets/ill.png'
import './Homepage.scss'
import { Link } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';

const Homepage = () => {
    const { user } = useContext(UserContext);

    return (
        <> <div id="i" style={{
            position: 'relative',
            height: '100vh',
            background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)'
        }}>
            <div id="message" >
                <p className="first">Making it easy <span>to find a PC.</span></p>
                <p className="second">We are happy to help you find a PC!</p>
                <button id="con-btn" className="btn"><Link to="/info" className='nav-link'>
                    {user ? "Suggest a Computer" : "Continue as Guest"}
                </Link></button>

                <img id="ill" src={ill} alt="illustration" />

            </div>
        </div>
        </>
    )
}

export default Homepage;



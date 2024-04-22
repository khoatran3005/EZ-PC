import ill from '../../assets/ill.png'
import './Homepage.scss'
import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <> <div id="i" style={{
            position: 'relative',
            height: '100vh',
            background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)'
        }}>
            <div id="message" >
                <p class="first">Making it easy <span>to find a PC.</span></p>
                <p class="second">We are happy to help you find a PC!</p>
                <button id="con-btn" class="btn"><Link to="/info" className='nav-link'>Continue as guest</Link></button>

                <img id="ill" src={ill} alt="illustration" />

            </div>
        </div>
        </>
    )
}

export default Homepage;



import ill from '../../assets/ill.png'
import './Homepage.scss'
import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <> <div id="i" style={{
            position: 'relative', /* Ensure proper positioning */
            height: '100vh', /* Full viewport height */
            background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)', /* Gradient background */
        }}>
            <div id="message" >
                <p className="first">Making it easy <span>to find a PC.</span></p>
                <p className="second">We are happy to help you find a PC!</p>
                <button id="con-btn" className="btn"><Link to="/info" className='nav-link'>Continue as guest</Link></button>

                <img id="ill" src={ill} alt="illustration" />

            </div>
        </div>
        </>
    )
}

export default Homepage;



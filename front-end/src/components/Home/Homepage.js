import ill from '../../assets/ill.png'
import './Homepage.scss'

const Homepage = () => {
    return (
        <>
            <div id="message">
                <p class="first">Making it easy <span>to find a PC.</span></p>
                <p class="second">We are happy to help you find a PC!</p>
                <button id="con-btn" class="btn"><Link to="/info" className='nav-link'>Continue as guest</Link></button>

                <img id="ill" src={ill} alt="illustration" />
            </div>
        </>
    )
}

export default Homepage;


import React, { useState } from 'react';
import './Info.scss'
import { Link } from "react-router-dom";
import infovid from '../../assets/infovid.mp4';


// import infoimg from '../../assets/infoimg.jpg';

const Info = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10000);
  const [studentLevel, setStudentLevel] = useState('');
  const [hobby, setHobby] = useState('');

  const handleMinChange = (event) => {
    const value = parseInt(event.target.value);
    // Ensure minValue doesn't exceed maxValue
    if (value <= maxValue) {
      setMinValue(value);
    } else {
      setMinValue(maxValue);
    }
  };
  
  const handleMaxChange = (event) => {
    let value = parseInt(event.target.value);
    
    // Ensure maxValue doesn't go below minValue or exceed 10000
    if (value < minValue) {
      value = minValue;
    } else if (value > 10000) {
      value = 10000;
    }
  
    setMaxValue(value);
  };
  
  
  const handleStudentLevelChange = (event) => {
    setStudentLevel(event.target.value);
  };

  const handleHobbyChange = (event) => {
    setHobby(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can perform actions with the collected information, like suggesting computers
    console.log("Submitted Values:", minValue, maxValue, studentLevel, hobby);

  };
 

  return (
    <>
     <div className="container2" style={{  position: 'relative', /* Ensure proper positioning */
    height: '100vh', /* Full viewport height */
    background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)', /* Gradient background */}}>
      <div className="container"  /*style={{ backgroundImage: `url(${ill})` }}*/>
        <form className = "form"onSubmit={handleSubmit}>
          <div id="input" className="input">
            <p className="kind">Kindly provide the information below:</p>
            <p className="head">Budget:</p>
            <div className="price-input">
              <div className="field">
                <span>Min</span>
                <input
                  type="number"
                  className="input-min"
                  value={minValue}
                  onChange={handleMinChange}
                />
              </div>
              <div className="separator">-</div>
              <div className="field">
                <span>Max</span>
                <input
                  type="number"
                  className="input-max"
                  value={maxValue}
                  onChange={handleMaxChange}
                />
              </div>
            </div>
            {/* Slider */}
            <div className="slider">
              <div
                className="progress"
                style={{
                  width: `${((maxValue - minValue) / 10000) * 100}%`, // Assuming 10000 is the total range
                  left: `${(minValue / 10000) * 100}%`,
                }}
              ></div>
            </div>
            <div className="range-input">
              <input
                type="range"
                className="range-min"
                min="0"
                max="10000"
                value={minValue}
                onChange={handleMinChange}
              />
              <input
                type="range"
                className="range-max"
                min="0"
                max="10000"
                value={maxValue}
                onChange={handleMaxChange}
              />
            </div>
            {/* Other input fields */}
            <div id = "test">
            <p className="head">Student Level:</p>
            <select className="select" size="1" name="level" value={studentLevel} onChange={handleStudentLevelChange}>
              <option className="drop" value="">Select Student Level</option>
              <option value="Elementary">Elementary</option>
              <option value="Middle School">Middle School</option>
              <option value="High School">High School</option>
              <option value="College">College</option>
            </select>
            </div>

            <div id ="test">
            <p className="head">Other Hobbies:</p>
            <select size="1" name="hobby" value={hobby} onChange={handleHobbyChange}>
              <option className="drop" value="">Select Hobby</option>
              <option value="Gaming">Gaming</option>
              <option value="Video Editing">Video Editing</option>
            </select>
            </div>
            <div id ="test">
            <button type="submit" class="btn btn-primary"><Link to = "/suggest" className='nav-link'>Submit</Link></button>
            </div>
          </div>
        </form>

        <div className="video-container">
          <video autoPlay muted loop>
            <source src={infovid} type="video/mp4" />
          </video>
        </div>

        {/* <div className= "infoimg">
           <img id="infoimg" src={infoimg} alt="illustration" />
         </div> */}

        {/* <div className="infovideo">
          <video id="infovideo" controls>
            <source src={infovid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> */}
          


       </div> 
       </div>
    </>
  );
}

export default Info;


import React from 'react';

const Info = () => {
  return (
    <>
      <div id="wrapper2">
        <nav>
          <div id="logo">
            <img src="logo.png" alt="company logo" />
          </div>
          <div id="HLS">
            <button id="signup-btn" className="btn">Sign Up</button>
            <a href="#">Login</a>
            <a href="#">Home</a>
          </div>
        </nav>

        <div id="input" className="input">
          <p className="kind">Kindly provide the information below:</p>
          <p className="head">Budget</p>
          <p className="head">Student Level</p>

          <select size="1" name="level">
            <option className="drop">Select Student Level</option>
            <option value="Freshmen">Freshmen</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>
          <p className="head">Other Hobbies</p>

          <select size="1" name="hobby">
            <option className="drop">Select Hobby</option>
            <option value="Gaming">Gaming</option>
            <option value="Video Editing">Video Editing</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Info;

  
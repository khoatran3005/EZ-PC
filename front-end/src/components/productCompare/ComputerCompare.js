import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ComputerCompare.scss';
import axios from "axios";


const ComputerCompare = () => {
  const location = useLocation();
  const { ids } = location.state; // Get the IDs of the computers to compare
  const [computers, setComputers] = useState([]);
  const [error, setError] = useState(null); // To manage errors



  useEffect(() => {
    const fetchComputers = async () => {
      try {
        await axios({
          method: 'get',
          url: 'http://localhost:3000/computer/compare',
          params: { computer_id_1: ids[0], computer_id_2: ids[1] },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then((response) => {
            if (error) {
              setError(error.message);
            } else {
              console.log(response.data);
              setComputers(response.data);
              console.log("data: " + response.data);
            }
          });
        // Redirect or do something else after submitting the form
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle the error if needed
      }
    };

    fetchComputers()
  }, [ids]); // Dependency on IDs

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log("computers: " + computers);
  return (
    <div className="compare-container">
      <h1>Compare Computers</h1>
      <div className="comparison-grid">
        {computers.map((computer) => (
          <div key={computer.id} className="computer-specs">
            <div className="spec">
              <img
                src={computer.image[0]} // Assuming there's an array of images
                className="small-img" // Apply a class for smaller image
               alt={"img"}/>
            </div>
            <div className="spec"><strong>Model Name:</strong> {computer.name}</div>
            <div className="spec"><strong>Operating System:</strong> {computer.os}</div>
            <div className="spec"><strong>Ram Memory:</strong> {computer.ram} GB</div>
            <div className="spec"><strong>Storage:</strong> {computer.storage.space} GB {computer.storage.type}</div>
            <div className="spec"><strong>Processor:</strong> {computer.processor.type} {computer.processor.model}</div>
            <div className="spec"><strong>Display:</strong> {computer.display} inches</div>

          </div>
        ))}


      </div>

      <div>
        <button className="btn">
          <Link to="/suggest" className="nav-link">Back</Link>
        </button>
      </div>
    </div>
  );
};

export default ComputerCompare;

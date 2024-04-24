import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import supabase from '../config/SupabaseClient';
import './ComputerCompare.scss';


const ComputerCompare = () => {
  const location = useLocation();
  const { ids } = location.state; // Get the IDs of the computers to compare
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage errors

 

  useEffect(() => {
    const fetchComputers = async () => {
      const { data, error } = await supabase
        .from('computer')
        .select('*')
        .in('id', ids); // Get the computers by IDs

      if (error) {
        setError(error.message);
      } else {
        setComputers(data);
      }

      setLoading(false);
    };

    fetchComputers(); // Fetch the computers to compare
  }, [ids]); // Dependency on IDs

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="compare-container">
      <h1>Compare Computers</h1>
      <div className="comparison-grid">
        {computers.map((computer) => (
          <div key={computer.id} className="computer-specs">
            <div className="spec"> 
            <img
                src={computer.image[0]} // Assuming there's an array of images
                alt={`${computer.name} image`}
                className="small-img" // Apply a class for smaller image
            />
            </div>
            <div className="spec"><strong>Model Name:</strong> {computer.name}</div>
            <div className="spec"><strong>Operating System:</strong> {computer.os}</div>
            <div className="spec"><strong>Ram Memory:</strong> {computer.ram} GB</div>
            <div class="spec"><strong>Storage:</strong> {computer.storage.space} GB {computer.storage.type}</div>
            <div class="spec"><strong>Processor:</strong> {computer.processor.type} {computer.processor.model}</div>
            <div class="spec"><strong>Display:</strong> {computer.display} inches</div>
            
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

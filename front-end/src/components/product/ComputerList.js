import React, { useState, useEffect } from 'react';
import './computerList.scss';
import { Link } from "react-router-dom";

/** 
const computerList = () => {
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual endpoint where you fetch the computer data
    fetch('your-api-endpoint')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setComputers(data); // Assuming your response is the array of computers
        setLoading(false);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []); // The empty array causes this effect to only run on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="computer-list">
      {computers.map(computer => (
        <div key={computer.id} className="computer">
          <img src={computer.image} alt={computer.name} />
          <h3>{computer.name}</h3>
          <p>{computer.specs}</p>
          <p>Model: {computer.model}</p>
          <p>SKU: {computer.sku}</p>
          <div className="rating">{`⭐ (${computer.rating})`}</div>
          <div className="availability">
            <p>Pick up on {computer.pickUpDate}</p>
            <p>Get it by {computer.deliveryDate}</p>
          </div>
          <div className="actions">
            <button>Compare</button>
            <button>Save</button>
          </div>
        </div>
      ))}
    </div>
  );
};
*/

const computerList = () => {
  // Hard-coded list of computers
  const computers = [
    {
      id: 1,
      name: 'Gaming Beast',
      specs: 'Intel i9 CPU, 32GB RAM, 1TB SSD, RTX 3080',
      model: 'GB-2024',
      sku: '123456',
      image: '/assets/lenovo.jpg',
      rating: '4.5',
      pickUpDate: 'April 5, 2024',
      deliveryDate: 'April 7, 2024'
    },
    // ... add more computers as needed
  ];

  return (
    <div className="computer-grid">
      {computers.map(computer => (
        <div key={computer.id} className="computer-card">
          <img src={computer.image} alt={computer.name} />
          <div className="computer-info">
            <h3>{computer.name}</h3>
            <p>{computer.specs}</p>
            <p>Model: {computer.model}</p>
            <p>SKU: {computer.sku}</p>
            <div className="rating">{`⭐ (${computer.rating})`}</div>
            <div className="availability">
              <p>Pick up on {computer.pickUpDate}</p>
              <p>Get it by {computer.deliveryDate}</p>
            </div>
            <div className="actions">
              <button>Compare</button>
              <button>Save</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default computerList;
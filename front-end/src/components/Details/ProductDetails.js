import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, } from 'react-bootstrap';
import './ProductDetails.scss'; // Import your SCSS file

const ProductDetails = () => {
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation
  const { state } = useLocation(); // Retrieve passed state
  const computer = state ? state.computer : null; // Access computer data from state

  // Navigate back to the previous page
  const handleBack = () => {
    navigate(-1);
  };

  if (!computer) {
    return <div>No computer details available.</div>; // Handle case where no data is passed
  }
  

  return (
  <Container className="product-container">
    
      <div className="product-layout"> {/* Flex container */}
        <div className="card-img"> {/* Left-side image */}
         <img src={computer.image[0]} alt={computer.name} />
        </div>
        <div className="product-details"> {/* Right-side details */}
          <h2>{computer.name}</h2>
          <p>
            <strong>Operating System:</strong> {computer.os}
            <br />
            <strong>Memory:</strong> {computer.ram} GB
            <br />
            <strong>Storage:</strong> {computer.storage.space} GB
            <br />
            <strong>Display:</strong> {computer.display} inches
            <br />
          </p>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
        </div>
      </div>
    
  </Container>

  
  );
};

export default ProductDetails;

  
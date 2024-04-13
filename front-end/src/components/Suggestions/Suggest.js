import React, { useState, useEffect } from 'react';
import './suggest.scss';

const Suggest = () => {

  const sampleComputers = [
    {
      id: 1,
      brand: 'Brand A',
      model: 'Model X',
      image: 'https://example.com/image1.jpg',
      operatingSystem: 'Windows 10',
      processor: 'Intel Core i5',
      memory: '8GB',
      storage: '256GB SSD',
      display: '15.6" FHD',
      price: 999.99,
    },
    {
      id: 2,
      brand: 'Brand B',
      model: 'Model Y',
      image: 'https://example.com/image2.jpg',
      operatingSystem: 'macOS',
      processor: 'Apple M1',
      memory: '16GB',
      storage: '512GB SSD',
      display: '13.3" Retina',
      price: 1299.99,
    },
    // Add more sample computer objects as needed
  ];
  
  
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    // For demonstration purposes, setting sample computers directly
    setComputers(sampleComputers);

   
  }, []);

  return (
    <div className="Scontainer" style={{  position: 'relative', /* Ensure proper positioning */
    height: '100vh', /* Full viewport height */
    background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)', /* Gradient background */}}>
      <p className="Sug">Here are some suggestions for you:</p>
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          {computers.map(computer => (
            <div key={computer.id} className="row p-2 bg-white border rounded">
              <div className="col-md-3 mt-1"><img className="img-fluid img-responsive rounded product-image" src={computer.image} alt={`${computer.brand} ${computer.model}`} /></div>
              <div className="col-md-6 mt-1">
                <h5>{computer.brand} {computer.model}</h5>
                <div className="d-flex flex-row">
                  <div className="mr-3"><strong>Operating System:</strong> {computer.operatingSystem}</div>
                  <div className="mr-3"><strong>Processor:</strong> {computer.processor}</div>
                  <div className="mr-3"><strong>Memory:</strong> {computer.memory}</div>
                  <div className="mr-3"><strong>Storage:</strong> {computer.storage}</div>
                  <div><strong>Display:</strong> {computer.display}</div>
                </div>
              </div>
              <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                <div className="d-flex flex-row align-items-center">
                  <h4 className="mr-1">${computer.price}</h4>
                </div>
                <div className="d-flex flex-column mt-4"><button className="btn btn-primary btn-sm" type="button">Save</button><button className="btn btn-outline-primary btn-sm mt-2" type="button">Compare</button></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suggest;

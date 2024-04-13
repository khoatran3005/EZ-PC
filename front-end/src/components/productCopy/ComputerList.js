import React from 'react';
import './ComputerList.scss';

const ComputerList = () => {
  return (
    <div className="container mt-100">
      <div className="row">
        <div className="col-md-4 col-sm-6">
          <div className="card mb-30">
            <div className="card-body text-center">
              <h4 className="card-title">Test Computer</h4>
              <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur fermentum felis, vel efficitur dolor volutpat nec. Nullam nec blandit neque.</p>
              <p>Model: Test Model</p>
              <p>SKU: 123456</p>
              <div className="actions">
                <button>Compare</button>
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputerList;




// import React, { useState, useEffect } from 'react';
// import './computerList.scss';
// import { Link } from "react-router-dom";


// // const computerList = () => {
// //   const [computers, setComputers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);


// //   useEffect(() => {
// //     // Replace 'your-api-endpoint' with the actual endpoint where you fetch the computer data
// //     fetch('your-api-endpoint')
// //       .then(response => {
// //         if (!response.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         return response.json();
// //       })
// //       .then(data => {
// //         setComputers(data); // Assuming your response is the array of computers
// //         setLoading(false);
// //       })
// //       .catch(error => {
// //         console.error('There has been a problem with your fetch operation:', error);
// //         setError(error.message);
// //         setLoading(false);
// //       });
// //   }, []); // The empty array causes this effect to only run on mount

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error: {error}</div>;

// //   return (
// //     <div className="computer-list">
// //       {computers.map(computer => (
// //         <div key={computer.id} className="computer">
// //           <img src={computer.image} alt={computer.name} />
// //           <h3>{computer.name}</h3>
// //           <p>{computer.specs}</p>
// //           <p>Model: {computer.model}</p>
// //           <p>SKU: {computer.sku}</p>
// //           <div className="rating">{`⭐ (${computer.rating})`}</div>
// //           <div className="availability">
// //             <p>Pick up on {computer.pickUpDate}</p>
// //             <p>Get it by {computer.deliveryDate}</p>
// //           </div>
// //           <div className="actions">
// //             <button>Compare</button>
// //             <button>Save</button>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };
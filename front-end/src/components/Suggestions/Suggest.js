import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/SupabaseClient'; // Import Supabase client
import './suggest.scss';
import ReactPaginate from 'react-paginate';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
 // Import checkmark icons import { FaCheckCircle, FaCircle } from 'react-icons/fa';

const Suggest = () => {
  const [computers, setComputers] = useState([]);
  const [selectedComputers, setSelectedComputers] = useState([]); // To hold selected computers
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(4);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComputers = async () => {
      const { data, error } = await supabase
        .from('computer') // Adjust table name
        .select('*');

      if (error) {
        setError(error.message);
      } else {
        setComputers(data);
      }

      setLoading(false);
    };

    fetchComputers();
  }, []);

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(computers.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDetail = (computer) => {
    // Navigate to ProductDetails with the computer details
    navigate('/productdetails', { state: { computer } });
  };

  const handleSelect = (computer) => {
    console.log("Current Selected Computers:", selectedComputers);
    // If already selected, deselect it
    if (selectedComputers.find((c) => c.id === computer.id)) {
      setSelectedComputers(selectedComputers.filter((c) => c.id !== computer.id));
    } else {
      // Add to selected computers, but only allow two
      if (selectedComputers.length < 2) {
        setSelectedComputers([...selectedComputers, computer]);
      }
    }

    if (selectedComputers.length === 2) {
      // Navigate to the comparison page with the IDs of the selected computers
      const ids = selectedComputers.map((c) => c.id);
      console.log("Navigating to Compare with IDs:", ids);
      navigate('/computercompare', { state: { ids } });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Scontainer" >
      <p className="Sug">Here are some suggestions for you:</p>
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          {computers.slice(offset, offset + itemsPerPage).map((computer) => (
            <div key={computer.id} className="row p-2 bg-white border rounded">
              


              <div className="col-md-3 mt-1">
                <img
                  className="img-fluid img-responsive rounded product-image"
                  src={computer.image[0]}
                  alt={`${computer.company} ${computer.name}`}
                />
              </div>
              <div className="col-md-6 mt-1">
                <h5 onClick={() => handleDetail(computer)}>{computer.name}</h5>

                <div className="d-flex flex-column">
                  <div className="mr-3"><strong>Operating System:</strong> {computer.os}</div>
                  <div className="mr-3"><strong>Processor:</strong> {computer.processor.type} {computer.processor.model}</div>
                  <div className="mr-3"><strong>Memory:</strong> {computer.ram} GB</div>
                  <div className="mr-3"><strong>Storage:</strong> {computer.storage.space} GB {computer.storage.type}</div>
                  <div className="mr-3"><strong>Display:</strong> {computer.display} inches</div>
                </div>
              </div>
              <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                <div className="d-flex flex-row align-items-center">
                  <h4 className="mr-1">${computer.price}</h4>
                </div>
                <div className="d-flex flex-column mt-4">
                  <button className="btn btn-primary btn-sm" type="button">Save</button>
                  <button className="btn btn-outline-primary btn-sm mt-2" type="button" onClick={() => handleSelect(computer)}>Compare</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"previous_page"}
        nextLinkClassName={"next_page"}
        disabledClassName={"pagination_disabled"}
        activeClassName={"pagination_active"}
      />
    </div>
  );
};

export default Suggest;



/** 

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './suggest.scss';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/SupabaseClient';  // Import Supabase client

const Suggest = () => {
  const [computers, setComputers] = useState([]); // State to hold computer data
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(4); // Change as needed
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from Supabase
  useEffect(() => {
    const fetchComputers = async () => {
      const { data, error } = await supabase
        .from('computer') // Adjust the table name if different
        .select('*'); // Select all fields; change if needed

      if (error) {
        setError(error.message); // Set error message
      } else {
        setComputers(data); // Set fetched data to state
      }

      setLoading(false); // Set loading to false
    };

    fetchComputers(); // Fetch data when component mounts
  }, []); // Empty dependency array to run only on mount

  // Handle pagination
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(computers.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Redirect to the comparison page
  const handleClick = (computer) => {
    navigate('/computercompare', { state: { computer } }); // Pass the selected computer in state
  };
  if (loading) {
    return <div>Loading...</div>; // Display loading while data is fetched
  }
  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  return (
    <div className="Scontainer" style={{ background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)' }}>
      <p className="Sug">Here are some suggestions for you:</p>
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          {computers.slice(offset, offset + itemsPerPage).map((computer) => (
            <div key={computer.id} className="row p-2 bg-white border rounded">
              <div className="col-md-3 mt-1">
                <img className="img-fluid img-responsive rounded product-image" src={computer.image[0]} alt={`${computer.company} ${computer.name}`} />
              </div>
              <div className="col-md-6 mt-1">
                <h5>{computer.name}</h5>
                <div className="d-flex flex-column">
                  <div className="mr-3"><strong>Operating System:</strong> {computer.os}</div>
                  <div className="mr-3"><strong>Processor:</strong> {computer.processor.type} {computer.processor.model}</div>
                  <div className="mr-3"><strong>Memory:</strong> {computer.ram} GB</div>
                  <div className="mr-3"><strong>Storage:</strong> {computer.storage.space} GB {computer.storage.type}</div>
                  <div className="mr-3"><strong>Display:</strong> {computer.display} inches</div>
                </div>
              </div>
              <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                <div className="d-flex flex-row align-items-center">
                  <h4 className="mr-1">${computer.price}</h4>
                </div>
                <div className="d-flex flex-column mt-4">
                  <button className="btn btn-primary btn-sm" type="button" onClick={() => handleClick(computer)}>Save</button>
                  <button className="btn btn-outline-primary btn-sm mt-2" type="button" onClick={() => handleClick(computer)}>Compare</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"previous_page"}
        nextLinkClassName={"next_page"}
        disabledClassName={"pagination_disabled"}
        activeClassName={"pagination_active"}
      />
    </div>
  );
};

export default Suggest;
*/


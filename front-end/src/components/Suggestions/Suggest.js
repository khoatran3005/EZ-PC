import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';
import ReactPaginate from 'react-paginate';
import './suggest.scss';
import axios from 'axios';
// import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import checkmark icons import { FaCheckCircle, FaCircle } from 'react-icons/fa';



const Suggest = () => {
  const { user } = useContext(UserContext);
  const [computers, setComputers] = useState([]);
  const [selectedComputers, setSelectedComputers] = useState([]); // To hold selected computers
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(4);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSave = async (computer_id, computer_name) => {

    // Ensure user is logged in to prevent null user_id
    if (!user) {
      console.log('Server save request not sent. Refusing to save because User not logged in.');
      toast.warn('Failed to save: You must be logged in to save computers.');
      return;
    }

    const saveData = {
      user_id: user.userid,
      computer_id: computer_id,
    }

    try {
      const response = await axios.post('http://localhost:3000/savedcomputer', saveData);

      console.log(response.data);
      if (response.status >= 200 && response.status < 300) {
        toast.success(computer_name + ` saved successfully.`);
      } else {
        console.error('Failed to save: ' + computer_name + ', computer_id: ' + computer_id + '.');
        toast.error('Failed to save ' + computer_name + ': Server issue.');
      }
    } catch (error) {
      console.error('Save failed. Error:', error.message);
      toast.error('Failed to save ' + computer_name + ': Unknown error.');
    }

  }

  useEffect(() => {
    const suggestData = location.state && location.state.data;
    if (suggestData) {
      setComputers(suggestData);
    }
  }, [location.state]);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(computers.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    scrollToTop(); // Scroll to top when pagination button is clicked

  };

  const currentItems = computers.slice(offset, offset + itemsPerPage);

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

  return (
    <div className="Scontainer" style={{ minHeight: '200vh', maxHeight: '5000vh', width: '1520px', background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)', marginTop: '0', paddingTop: '5px' }}>
      <div className="Sug"><p >Here are personalized laptop recommendations tailored just for you:</p></div>
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          {currentItems.map(computer => (
            <div key={computer.id} className="row p-2 bg-white border">
              <div className="col-md-3 mt-1"><img className="img-fluid img-responsive rounded product-image" src={computer.image[0]} alt={`${computer.company} ${computer.name}`} /></div>
              <div className="col-md-6 mt-1">
                <h5 onClick={() => handleDetail(computer)}>{computer.name}</h5>
                <div className="d-flex flex-column">
                  <div className="mr-3"><strong>Operating System:</strong> {computer.os}</div>
                  <div className="mr-3"><strong>Processor:</strong> {computer.processor.type} {computer.processor.model} ({computer.processor.company})</div>
                  <div className="mr-3"><strong>Memory:</strong> {computer.ram}GB</div>
                  <div className="mr-3"><strong>Storage:</strong> {computer.storage.space}GB {computer.storage.type}</div>
                  <div className="mr-3"><strong>Display:</strong> {computer.display} inches</div>
                </div>
              </div>
              <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                <div className="d-flex flex-row align-items-center">
                  <h4 className="mr-1">${computer.price}</h4>
                </div>
                <div className="d-flex flex-column mt-4">
                  <button className="btn btn-primary btn-sm" type="button" onClick={() => { handleSave(computer.id, computer.name) }}>Save</button>
                  <button className="btn btn-outline-primary btn-sm mt-2" type="button" onClick={() => handleSelect(computer)}>Compare</button></div>
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
      <ToastContainer />
    </div>
  );
};

export default Suggest;

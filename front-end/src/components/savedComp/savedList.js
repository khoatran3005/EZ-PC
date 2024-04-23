import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserContext';
import ReactPaginate from 'react-paginate';
import './savedList.scss';
import axios from 'axios';


const SavedList = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [computers, setComputers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    if (!user) {
      console.log('User not logged in. Redirecting to login page.');
      navigate('/login');
    }

    if (user) {
      console.log('User updated: ', user);
      console.log(user.userid);
    }
  }, [user, navigate]);

  const handleDelete = async (computer_id, computer_name) => {

    const deleteData = {
      user_id: user.userid,
      computer_id: computer_id,
    }

    try {
      console.log("Sending delete request to server.")
      const response = await axios.delete('http://localhost:3000/savedcomputer', deleteData);

      console.log(`Server Responded: ${response.data}`);

      if (response.status >= 200 && response.status < 300) {
        toast.success(computer_name + ` deleted successfully.`);
      } else {
        console.error('Failed to delete: ' + computer_name + ', computer_id: ' + computer_id + '.');
        toast.error('Failed to delete ' + computer_name + ': Server issue.');
      }
    } catch (error) {
      console.error('Deletion failed. Error:', error.message);
      toast.error('Failed to delete ' + computer_name + ': Unknown error.');
    }

  }

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

  const setSavedComputers = async () => { // Function to get saved computers from the server

    // Ensure user is logged in to prevent null user_id
    if (!user) {
      console.log('Server savedComputers request not sent. Refusing to display saved computers because User not logged in.');
      toast.warn('You must be logged in to view saved computers.');
      return;
    }

    const userIdData = {
      user_id: user.userid,
    }

    try {
      console.log("Sending savedComputer get request to server.")
      const response = await axios.get('http://localhost:3000/savedcomputer', 67);

      console.log(`Server Responded: ${response.data}`);

      if (response.status >= 200 && response.status < 300) {
        setComputers(response.data);

      } else {
        console.error('Failed to get saved computers: Server issue.');
        toast.error('Failed to get saved computers: Server issue.');
      }
    } catch (error) {
      console.error('Failed to get saved computers: Unknown error.');
      toast.error('Failed to get saved computers: Unknown error.');
    }
  }

  // const getComputers = async () => { // Function to get a computer from the server

  //     try {
  //       console.log("Sending get request to server.")
  //       const response = await axios.get('http://localhost:3000/computer');

  //       console.log(`Server Responded: ${response.data}`);

  //       if (response.status >= 200 && response.status < 300) {
  //         setComputers(response.data);
  //       } else {
  //         console.error('Failed to get computers: Server issue.');
  //         toast.error('Failed to get computers: Server issue.');
  //       }
  //     } catch (error) {
  //       console.error('Failed to get computers: Unknown error.');
  //       toast.error('Failed to get computers: Unknown error.');
  //     }
  // }
  setSavedComputers();
  const currentItems = computers.slice(offset, offset + itemsPerPage);

  return (
    <div className="Scontainer" style={{ minHeight: '200vh', maxHeight: '5000vh', width: '1520px', background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)', marginTop: '0', paddingTop: '5px' }}>
      <div className="Sug"><p >Here are personalized laptop recommendations tailored just for you:</p></div>
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          {currentItems.map(computer => (
            <div key={computer.id} className="row p-2 bg-white border">
              <div className="col-md-3 mt-1"><img className="img-fluid img-responsive rounded product-image" src={computer.image[0]} alt={`${computer.company} ${computer.name}`} /></div>
              <div className="col-md-6 mt-1">
                <h5>{computer.name}</h5>
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
                  <button className="btn btn-primary btn-sm" type="button" onClick={() => { handleDelete(computer.id, computer.name) }}>Save</button>
                  <button className="btn btn-outline-primary btn-sm mt-2" type="button">Compare</button></div>
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

export default SavedList;

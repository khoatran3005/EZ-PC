import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import './suggest.scss';

const Suggest = () => {
  const [computers, setComputers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(4); // Change this value as per your requirement
  const location = useLocation();

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
        behavior: "smooth" // Optional smooth scrolling animation
      });
    };
  

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(computers.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    scrollToTop(); // Scroll to top when pagination button is clicked

  };

  const currentItems = computers.slice(offset, offset + itemsPerPage);

  return (
    <div className="Scontainer" style={{ position: 'relative', minHeight: '200vh', maxHeight: '5000vh', width: '100vw', background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)', margin: '0', padding: '0' }}>
      <p className="Sug">Here are some suggestions for you:</p>
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          {currentItems.map(computer => (
            <div key={computer.id} className="row p-2 bg-white border rounded">
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
                <div className="d-flex flex-column mt-4"><button className="btn btn-primary btn-sm" type="button">Save</button><button className="btn btn-outline-primary btn-sm mt-2" type="button">Compare</button></div>
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

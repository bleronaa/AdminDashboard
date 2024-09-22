import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Order.css';
import './index.css'
import data from './data.json';
import Footer from './Footer';

const ApproveArtItems = () => {
  const location = useLocation();
  const image = data.NewDiscoveries.find(item => item.id === 1); // Change as needed

  const [auction, setAuction] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');

  const handleAssignAuction = (event) => {
    setAuction(event.target.value);
  };

  const handleRefuse = () => {
    setShowModal(true);
  };

  const handleSubmitRefuse = () => {
    alert(`Reason for refusal: ${reason}`);
    setShowModal(false);
  };
  const handleApprove = () => {
    console.log("Image approved and assigned to:", selectedAuction);
  
    // Simulating parallel task with concurrency using threads
    const worker = new Worker(() => {
      self.onmessage = function(e) {
        // Simulate processing approval in the background
        console.log('Processing approval in thread:', e.data);
        self.postMessage("Approved!");
      };
    });
  
    worker.postMessage(selectedAuction);
    
    worker.onmessage = function(e) {
      console.log(e.data); // Logs "Approved!"
    };
  };

  return (
    <>
      <div className="order-container">
        <div className="order-image">
          <img src={image.url || ''} alt={image.name || ''} />
          <div className="order-details">
            <h1>Details</h1>
            <h2>Description</h2>
            <p>{image.description || ''}</p>
            <hr className='hrline' />
            <h2>Dimensions</h2>
            <p>Height: {image.height || ''}</p>
            <p>Width: {image.width || ''}</p>
            <hr className='hrline' />
            <h2>Country of Origin</h2>
            <p>{image.origin || ''}</p>
            <hr className='hrline' />
            <h2>Category</h2>
            <p>{image.category || ''}</p>
          </div>
        </div>

        <div className="order-info">
          <h1 className='image-name'>{image.text || ''}</h1>
          <hr className='hrline' />

    {/* Displaying the price */}
    <div className="price-display">
            <h4>Price: ${image.price || 'N/A'}</h4>
          </div>

          <div className="dropdown">
            <label htmlFor="assign-auction">Assign to Auction:</label>
            <select id="assign-auction" value={auction} onChange={handleAssignAuction}>
              <option value="">Select Auction</option>
              <option value="Painting">Painting</option>
              <option value="Fine Art Prints">Fine Art Prints</option>
              <option value="Sculpture">Sculpture</option>
              <option value="Impressionism">Impressionism</option>
            </select>
          </div>
         
          {/* Approve and Refuse buttons */}
          <div className="buttons-container">
            <button className="approve-button">Approve</button>
            <button className="refuse-button" onClick={handleRefuse}>Refuse</button>
          </div>

          {/* Modal for Refuse */}
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Reason of Refuse</h2>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter reason for refusal"
                />
                <div className="modal-buttons">
                  <button onClick={handleSubmitRefuse}>Submit</button>
                  <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ApproveArtItems;

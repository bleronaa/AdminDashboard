import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './Axios';
import './Auctions.css';

const EditAuction = () => {
  const { auctionId } = useParams();
  const [auctionDetails, setAuctionDetails] = useState({
    auctionName: '',
    auctionDescription : '',
    auctionStartDate: '',
    auctionEndDate: '',
    country: '',
    city: '',
    category: '',
    auctionImage: '' // This will store the Base64 image
  });

  // Fetch auction details on mount
  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response = await axiosInstance.get('/Auction/getAuctionDetailsForAdmin', {
          params: { auctionId },
        });
        setAuctionDetails(response.data);
      } catch (error) {
        console.error('Error fetching auction details:', error);
      }
    };

    fetchAuctionDetails();
  }, [auctionId]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'auctionImage' && files.length > 0) {
      // Store the raw file object in auctionImage
      setAuctionDetails({
        ...auctionDetails,
        auctionImage: files[0], // Store the file object directly
      });
    } else {
      setAuctionDetails({
        ...auctionDetails,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Create a new FormData object
    const formData = new FormData();
  
    // Append form data
    formData.append('id', auctionId); // Append the auction ID from useParams
    formData.append('auctionName', auctionDetails.auctionName);
    formData.append('startDate', auctionDetails.auctionStartDate);
    formData.append('endDate', auctionDetails.auctionEndDate);
    formData.append('description', auctionDetails.auctionDescription );
    formData.append('country', auctionDetails.country);
    formData.append('city', auctionDetails.city);
    formData.append('category', auctionDetails.category);
  
    // Append the file (raw file object, not Base64)
    if (auctionDetails.auctionImage) {
      formData.append('auctionImage', auctionDetails.auctionImage); // Append the file directly
    }
  
    try {
      const response = await axiosInstance.post('/Auction/editAuction', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct content type
        },
      });
  
      console.log('Auction updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating auction:', error);
    }
  };

  
  return (
    <>
      <main className='main-container'>
        <div className="relative m-10 rounded-md border text-gray-800 shadow-lg adduser">
          <p className="mt-4 pl-4 text-xl font-bold">Edit Auction</p>
          <div className="flex flex-col items-center px-8 py-10">
            {/* Auction Name */}
            <label className="block w-full" htmlFor="auctionName">
              <p className="mb-1 text-sm text-gray-600">Auction Name</p>
              <input
                className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                type="text"
                name="auctionName"
                placeholder="Enter name"
                value={auctionDetails.auctionName}
                onChange={handleInputChange}
              />
            </label>

            {/* Description */}
            <label className="mt-4 block w-full" htmlFor="description">
  <p className="mb-1 text-sm text-gray-600">Description</p>
  <input
    className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
    type="text"
    name="auctionDescription" // Ensure name matches the state key
    placeholder="Description"
    value={auctionDetails.auctionDescription || ''} // Correct key here
    onChange={handleInputChange} // Call the handler
  />
</label>

            {/* Start Date */}
            <label className="mt-4 block w-full" htmlFor="auctionStartDate">
              <p className="mb-1 text-sm text-gray-600">Start Date</p>
              <input
                className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                type="date"
                name="auctionStartDate"
                value={auctionDetails.auctionStartDate?.split('T')[0]} // Format date
                onChange={handleInputChange}
              />
            </label>

            {/* End Date */}
            <label className="mt-4 block w-full" htmlFor="auctionEndDate">
              <p className="mb-1 text-sm text-gray-600">End Date</p>
              <input
                className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                type="date"
                name="auctionEndDate"
                value={auctionDetails.auctionEndDate?.split('T')[0]} // Format date
                onChange={handleInputChange}
              />
            </label>

            {/* Country */}
            <label className="mt-4 block w-full" htmlFor="country">
              <p className="mb-1 text-sm text-gray-600">Country</p>
              <input
                className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                type="text"
                name="country"
                placeholder="Country"
                value={auctionDetails.country}
                onChange={handleInputChange}
              />
            </label>

            {/* City */}
            <label className="mt-4 block w-full" htmlFor="city">
              <p className="mb-1 text-sm text-gray-600">City</p>
              <input
                className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                type="text"
                name="city"
                placeholder="City"
                value={auctionDetails.city}
                onChange={handleInputChange}
              />
            </label>

            {/* Category */}
            <label className="mt-4 block w-full" htmlFor="category">
              <p className="mb-1 text-sm text-gray-600">Category</p>
              <input
                className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                type="text"
                name="category"
                placeholder="Category"
                value={auctionDetails.category}
                onChange={handleInputChange}
              />
            </label>

            {/* Image Upload */}
            <div className="image-section">
              <label className="mt-4 block w-full" htmlFor="auctionImage">
                <p className="mb-1 text-sm text-gray-600">Auction Image</p>

                {/* Display current image */}
                {auctionDetails.auctionImage && (
                  <div className="image-container mb-4 h-40 w-40">
                    <img
                      src={auctionDetails.auctionImage} // Display the Base64 image from backend
                      alt="Auction"
                      className="h-full w-full object-contain" // Ensure the image covers the entire div
                    />
                  </div>
                )}

                {/* File input to change the image */}
                <input
                  className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                  type="file"
                  name="auctionImage"
                  placeholder="Change Image"
                  onChange={handleInputChange}
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <button className="whitespace-nowrap rounded-md bg-blue-500 px-4 py-3 font-medium text-white" onClick={handleFormSubmit}>
                Edit Auction
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditAuction;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from './Axios';

const AddAuctions = () => {
  const [auctionDetails, setAuctionDetails] = useState({
    auctionName: '',
    description: '',
    startDate: '',
    endDate: '',
    country: '',
    city: '',
    categoryId: '',
    photo: null,
  });

  const [categories, setCategories] = useState([]);

  // Fetch categories from API when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/Category/getCategoryList');
        console.log('res',response.data)
        setCategories(response.data); // Assuming data is a list of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'photo') {
      setAuctionDetails({ ...auctionDetails, [name]: files[0] });
    } else {
      setAuctionDetails({ ...auctionDetails, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send file and other inputs
    const formData = new FormData();
    formData.append('AuctionName', auctionDetails.auctionName);
    formData.append('Description', auctionDetails.description);
    formData.append('StartDate', auctionDetails.startDate);
    formData.append('EndDate', auctionDetails.endDate);
    formData.append('Country', auctionDetails.country);
    formData.append('City', auctionDetails.city);
    formData.append('CategoryId', auctionDetails.categoryId);
    formData.append('Photo', auctionDetails.photo);

    try {
      console.log(auctionDetails)
      const response = await axiosInstance.post('/Auction/addAuction', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Auction added successfully!');
      } else {
        toast.error(response.data.message || 'Failed to add auction.');
      }
    } catch (error) {
      console.error('Error adding auction:', error);
      toast.error('An error occurred while adding the auction.');
    }
  };

  return (
    <main className='main-container'>
      <div className="relative m-10 rounded-md border text-gray-800 shadow-lg adduser">
        <p className="mt-4 pl-4 text-xl font-bold">Add new Auction</p>
        <div className="flex flex-col items-center px-8 py-10">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Auction Name */}
            <label className="block w-full">
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
            <label className="mt-4 block w-full">
              <p className="mb-1 text-sm text-gray-600">Description</p>
              <input
                className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                type="text"
                name="description"
                placeholder="Description"
                value={auctionDetails.description}
                onChange={handleInputChange}
              />
            </label>

            {/* Start Date */}
            <label className="mt-4 block w-full">
              <p className="mb-1 text-sm text-gray-600">Start Date</p>
              <input
                className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                type="date"
                name="startDate"
                value={auctionDetails.startDate}
                onChange={handleInputChange}
              />
            </label>

            {/* End Date */}
            <label className="mt-4 block w-full">
              <p className="mb-1 text-sm text-gray-600">End Date</p>
              <input
                className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                type="date"
                name="endDate"
                value={auctionDetails.endDate}
                onChange={handleInputChange}
              />
            </label>

            {/* Country */}
            <label className="mt-4 block w-full">
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
            <label className="mt-4 block w-full">
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

            {/* Category Dropdown */}
            <label className="mt-4 block w-full">
  <p className="mb-1 text-sm text-gray-600">Category</p>
  <select
    className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
    name="categoryId"
    value={auctionDetails.categroyId}
    onChange={handleInputChange} // Ensure this function updates auctionDetails.categoryId
  >
    <option value="">Select a Category</option>
    {categories.map(category => (
      <option key={category.categroyId} value={category.categroyId}>
        {category.categoryName}
      </option>
    ))}
  </select>
</label>
            {/* Auction Image */}
            <label className="mt-4 block w-full">
              <p className="mb-1 text-sm text-gray-600">Auction Image</p>
              <input
                className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                type="file"
                name="photo"
                onChange={handleInputChange}
              />
            </label>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="rounded-md bg-blue-500 px-4 py-3 font-medium text-white"
              >
                Add Auction
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer />
    </main>
  );
};

export default AddAuctions;

import React, { useEffect, useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Auctions.css'
import { colors } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import EditAuction from './EditAuction';
import axiosInstance from './Axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material'


const Auctions = () => {
  const [auctionList, setAuctionList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('')
  const navigate = useNavigate();
  const redirectToEdit = async (auctionId) => {
    navigate(`/editAuction/${auctionId}`)
  }
  useEffect(() => {
    const fetchAuctionList = async () => {
      try {
        const response = await axiosInstance.get('/Auction/getAuctionListQueryForAdmin', {
          params: {
            auctionName: searchTerm,
            status: statusFilter,
          },
        });
        console.log('Type of response.data:', Array.isArray(response.data.auctionList));

        setAuctionList(response.data.auctionList);
      } catch (error) {
        console.error('Error fetching auction list:', error);
      }
    };

    fetchAuctionList();
  }, [searchTerm, statusFilter]);

  const publishAuction = async (id) => {
    try {
      const response = await axiosInstance.post(`/Auction/publishAuction/${id}`);
      if (response.data.success) {
        toast.success('Auction published successfully!');
        window.location.reload();
        // Update local state to reflect the published auction
        setAuctionList((prevAuctions) =>
          prevAuctions.map((auction) =>
            auction.id === id ? { ...auction, status: 'Published' } : auction
          )
        );
      } else {
        toast.error(response.data.message || 'Failed to publish auction.');
      }
    } catch (error) {
      console.error('Error publishing auction:', error);
      toast.error('An error occurred while publishing the auction.');
    }
  };
  const DeleteAuction = async (auctionId) => {
    try {
      const response = await axiosInstance.delete(`/Auction/deleteAuction/${auctionId}`); // Send auctionId in the route
      
      if (response.data.success) {
        // Display toastr with success message from the backend
        toast.success(response.data.message || 'Auction deleted successfully!');
        console.log('Auction deleted successfully:', response.data);
      } else {
        // If the backend sends a failure message
        toast.error(response.data.message || 'Failed to delete the auction.');
      }
      toast.success('Auction deleted successfully!');
  
      // Optionally, you can handle any state updates or redirections here
    } catch (error) {
      console.error('Error deleting auction:', error);
      toast.error('An error occurred while deleting the auction.');
    }
  };
  return (
    <>
      <main className='main-container'>
        {/* Search Input */}
        <div className="search-container" style={{ margin: '20px 0', display: 'flex', alignItems: 'center' }}>
  {/* Search Input */}
  <TextField
    label="Search by Auction Name..."
    variant="outlined"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{ marginRight: '10px', width: '200px' }} // Add width and margin similar to original
  />

  {/* Status Filter Dropdown */}
  <FormControl variant="outlined" style={{ width: '200px' }}>
    <InputLabel id="status-filter-label">Filter by Status</InputLabel>
    <Select
      labelId="status-filter-label"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      label="Filter by Status"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value="1">Unpublished</MenuItem>
      <MenuItem value="2">Published</MenuItem>
    </Select>
  </FormControl>
</div>
        <div className='addAuction' style={{ width: '100%', display: 'flex', justifyContent: 'end', textAlign: 'center' }}>
          <a className='addAuctionButton' href='/addAuction'>
            <AddIcon /> Add Auction
          </a>
        </div>
        <div class="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
          <table class="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
            <thead class="hidden border-b lg:table-header-group">
              <tr class="">
                <td class="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                  Created Date
                  <svg xmlns="http://www.w3.org/2000/svg" class="float-right mt-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </td>

                <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Auction Id</td>
                <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Auction Name</td>
                <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3"> Start Date</td>

                <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3"> End Date</td>

                <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Location</td>

                <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Status</td>
                <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Action</td>

              </tr>
            </thead>

            <tbody class="bg-white lg:border-gray-300">
              {auctionList.map((auction) => (
                <tr key={auction.auctionId} class="">
                  <td class="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                  {new Date(auction.createdOn).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                    <div class="mt-1 flex flex-col text-xs font-medium lg:hidden">
                      <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>

                      </div>
                      <div class="">24 x 10 x 5 cm</div>
                      <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                        1 Kg
                      </div>
                    </div>
                  </td>

                  <td class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell"> {auction.auctionId}
                  </td>

                  <td class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{auction.auctionName}</td>


                  <td class="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left"> {new Date(auction.auctionStartDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</td>
                  <td class="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">{new Date(auction.auctionEndDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</td>
                  <td class="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">{auction.country}, {auction.city} </td>
                  <td class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                  <span
        className={`mr-3 whitespace-nowrap rounded-full px-2 py-0.5 text-white ${auction.status === "Published" 
            ? "bg-green-500" 
            : "bg-red-500"
          }`}
      >
        {auction.status}
      </span>

      {auction.status === "Unpublished" && (
        <span
          onClick={() => publishAuction(auction.auctionId)} // Assuming auction.id contains the ID of the auction
          className="cursor-pointer text-blue-500 hover:underline"
        >
          Publish Now
        </span>)}
                  </td>

                  <td style={{display:'flex',justifyContent:'space-between'}} class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                    <span  class="ml-2 mr-3 whitespace-nowrap rounded-full  px-2 py-0.5 text-purple-800"><ModeEditIcon onClick={() => redirectToEdit(auction.auctionId)} style={{ color: '#808080', cursor: 'pointer' }} />  <DeleteIcon onClick={()=>DeleteAuction(auction.auctionId)} style={{ color: '#EA5B60', cursor: 'pointer' }} /></span>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>



      </main>

    </>
  )
}
export default Auctions;
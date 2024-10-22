import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './Axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast, ToastContainer } from 'react-toastify';
const ArtItemDetails = () => {
  const { artItemId } = useParams();
  const [artItemDetails, setArtItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRefuseModal, setShowRefuseModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState('');
  const [refusalReason, setRefusalReason] = useState('');

  useEffect(() => {
    const fetchArtItemDetails = async () => {
      try {
        const response = await axiosInstance.post(`/ArtItem/getArtItemDetails/${artItemId}`);
        setArtItemDetails(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtItemDetails();
  }, [artItemId]);

  
  const handleApproveClick = async () => {
    try {
      const response = await axiosInstance.post('/ArtItem/approveArtAuction', {
        artAuctionId: artItemId, // Use the appropriate variable for the art auction ID
        status: 1, // Status for approval
      });
      
      if(response.data.success){
      // Optionally, handle success response
      toast.success('Art auction approved successfully!');
      }else{
      toast.error('Something went wrong, please try again later!');
        
      }

    } catch (error) {
      console.error('Error approving art auction:', error);
      toast.error('Failed to approve the art auction. Please try again.');
    }
  };


  const handleRefuseSaveClick = async () => {
    try {
      setShowRefuseModal(false);
      const response = await axiosInstance.post('/ArtItem/approveArtAuction', {
        artAuctionId: artItemId, 
        status: 2,
        reason:refusalReason,
      });
      setShowRefuseModal(false);
      
      if(response.data.success){
      toast.success('Art auction Refused!');
      }

    } catch (error) {
      console.error('Error refusing art auction:', error);
      toast.error('Failed to refuse the art auction. Please try again.');
    }
  };

  const handleRefuseClick = () => setShowRefuseModal(true);
  const handleCloseRefuseModal = () => setShowRefuseModal(false);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!artItemDetails) return null;

  return (
    <main className='main-container'>
        <ToastContainer></ToastContainer>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {artItemDetails.images && artItemDetails.images.map((image, index) => (
            <img
              key={index}
              src={"https://localhost:44340/"+image.photoFormat} // Assuming image.url contains the image URL
              alt={`Art image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </div>
            <hr></hr>
            <hr></hr>

        {/* Artist and Art Details Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Art Name</label>
            <input
              type="text"
              value={artItemDetails.artName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={artItemDetails.description}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Buy Immediately Price</label>
            <input
              type="text"
              value={artItemDetails.buyimmediatelyPrice || 'N/A'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Bid Price</label>
            <input
              type="text"
              value={artItemDetails.bidPrice || 'N/A'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Start Price</label>
            <input
              type="text"
              value={artItemDetails.startPrice || 'N/A'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Artist</label>
            <input
              type="text"
              value={artItemDetails.firstArtist}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={artItemDetails.categoryName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Framed Height</label>
            <input
              type="text"
              value={artItemDetails.framedHeight}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Framed Width</label>
            <input
              type="text"
              value={artItemDetails.framedWidth}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Framed Depth</label>
            <input
              type="text"
              value={artItemDetails.framedDepth}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              value={artItemDetails.year}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Note</label>
            <input
              type="text"
              value={artItemDetails.note || 'N/A'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Unit</label>
            <input
              type="text"
              value={artItemDetails.Unit || 'N/A'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
  
  <button
    onClick={()=>handleApproveClick()}
    className="flex items-center space-x-2 bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-blue-500 hover:text-white"
  >
    <span className="text-green-500"><CheckCircleIcon/></span> {/* Check Icon */}
    <span>Approve</span>
  </button>

  <button
    onClick={handleRefuseClick}
    className="flex items-center space-x-2 bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-blue-500 hover:text-white"
  >
    <span className="text-red-500">&#10060;</span> {/* Cross Icon */}
    <span>Reject</span>
  </button>

</div>
       

        {/* Refusal Modal */}
        {showRefuseModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-2xl"> {/* Increase modal size */}
      <h2 className="text-lg font-semibold">Reason for Refusal</h2>
      <textarea style={{padding:'29px'}}
        value={refusalReason}
        onChange={(e) => setRefusalReason(e.target.value)}
        className="mt-4 block w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-transparent focus:ring-0"
        required  // Make textarea required
      />
       {refusalReason === '' && (
        <p className="text-red-500">Reason for refusal is required.</p>
      )}
      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={handleCloseRefuseModal}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (refusalReason.trim() === '') {
              toast.error('Please provide a reason for refusal.');
            } else {
              handleRefuseSaveClick();
            }
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </main>
  );
};

export default ArtItemDetails;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Order.css';
import './index.css';
import Footer from './Footer';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'; // Import Axios
import axiosInstance from './Axios';
import Preloader from './Preloader';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const TruncatedText = styled('div')`
  max-width: 150px; /* Adjust the width as needed */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArtItems = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [artItems, setArtItems] = useState([]); // State to store fetched art items
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStatus, setselectedStatus] = useState(null);

  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState('');
  const [open, setOpen] = useState(false);


  const [categories, setCategories] = useState([])
  const [selectedRows, setSelectedRows] = useState([]); // Initialize state to hold selected IDs


  const handleOpen = () => {
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };
  const assignArtItemsToAuction = async () => {
    try {
      if (selectedRows.length < 1) {
        toast.error('Please make sure Art Items are selected!');
        return;
      }
      var response = await axiosInstance.post('/ArtItem/assignArtItemToAuction', {
        auctionId: selectedAuction,
        artItemId: selectedRows,
      });
      console.log('ttt', response);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error('Please make sure Art Items are selected!');

      }
      // Optionally, refresh the art items or perform additional actions here
    } catch (error) {
      console.error('Error assigning art items:', error);
      toast.error('Failed to assign art items to auction. Please try again.');
    } finally {
      setOpen(false);
    }
  };


  const handleRowClick = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
    console.log(selectedRows)
  };
  const handleViewClick = (id) => {
    navigate(`/artitemdetails/${id}`); // Navigate to ArtItemDetails with the item's ID
  };
  useEffect(() => {
    const fetchArtItems = async () => {
      try {
        const response = await axiosInstance.get('/artItem/getArtItemListForAdmin', {
          params: {
            categoryName: searchTerm, // Send the search term as a query parameter
            categoryId: selectedCategory, // Send the selected category ID
            statusId:selectedStatus,
          },
        });
        setArtItems(response.data); // Assuming the response data is the array of art items
        setLoading(false)
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
      }
    };

    fetchArtItems();
  }, [searchTerm, selectedCategory, selectedStatus]);


  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axiosInstance.get('/Auction/getAuctionListQueryForAdmin');
        console.log('aaaa', response);
        setAuctions(response.data.auctionList);
      } catch (error) {
        console.error('Error fetching auction list:', error);
      } finally {
      }
    };

    fetchAuctions();
  }, []);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/Category/getCategoryList');
        setCategories(response.data); // Assuming data is a list of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // Update selected category
  };

  const handleStatusChange = (e) => {
    setselectedStatus(e.target.value); // Update selected category
  };
  // If loading, show a loading message
  if (loading) {
    return (<div className="preloader-container" style={{ width: '250%' }}>
      <Preloader />
    </div>)
  }

  // If there's an error, show an error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className='main-container'>
      <ToastContainer></ToastContainer>
      <div className='searchContainer' style={{ display: 'flex', gap: '20px', margin: '20px' }}>
        <TextField value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} id="outlined-basic" label="Search By Name" variant="outlined" />
        <FormControl style={{ width: '200px' }}>
          <InputLabel id="category-select-label">Select Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            label="Select Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">
              <em>Select Category</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.categroyId} value={category.categroyId}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if needed */}
        </FormControl>

        <FormControl style={{ width: '200px' }}>
          <InputLabel id="category-select-label">Select Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={selectedStatus}
            label="Select Status"
            onChange={handleStatusChange}
          >
            <MenuItem value="">
              <em>Select Status</em>
            </MenuItem>
              <MenuItem value="1">
              <em>Approved</em>

              </MenuItem>
              <MenuItem value="2">
              <em>Refused</em>

              </MenuItem>
          </Select>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if needed */}
        </FormControl>


        <div className='ml-auto' style={{alignContent:'end'}}><Button style={{fontWeight:'bold',background:'#d3d3d3',color:'white'}} onClick={() => handleOpen()}><AddIcon></AddIcon> Assign To Auction</Button></div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ backgroundColor: '#f1eee4', color: 'black' }}>
            <TableRow>
              <StyledTableCell>Art Name</StyledTableCell>
              <StyledTableCell>Art Description</StyledTableCell>
              <StyledTableCell>Client</StyledTableCell>
              <StyledTableCell>Start Price</StyledTableCell>
              <StyledTableCell>First Artist</StyledTableCell>
              <StyledTableCell>Year</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {artItems.map((item) => (
              <StyledTableRow
                key={item.id}
                onClick={() => handleRowClick(item.id)}
                style={{
                  backgroundColor: selectedRows.includes(item.id) ? '#D3D3D3' : 'transparent', // Highlight selected row
                  cursor: 'pointer',
                }}
              >
                <StyledTableCell component="th" scope="row">
                  {item.artName}
                </StyledTableCell>
                <StyledTableCell>
                  <TruncatedText>{item.description}</TruncatedText>
                </StyledTableCell>
                <StyledTableCell>{item.clientName}</StyledTableCell>
                <StyledTableCell>{item.startPrice}</StyledTableCell>
                <StyledTableCell>{item.firstArtist}</StyledTableCell>
                <StyledTableCell>{item.year}</StyledTableCell>
                <StyledTableCell>{item.categoryName}</StyledTableCell>
                <StyledTableCell
                  style={{
                    cursor: 'pointer',
                    fontWeight: 'bolder',
                    borderBottom: '1px solid #D1FFBD',
                    textAlign: 'center',
                  }}
                  onClick={() => handleViewClick(item.id)}
                >
                  View
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: '20px', backgroundColor: 'white', margin: '100px auto', width: '600px' }}>
          <h2 style={{ marginBottom: '20px' }}>Select Auction</h2> {/* Added margin to separate title from dropdown */}

          <FormControl fullWidth style={{ marginBottom: '20px' }}> {/* Added margin to separate dropdown from button */}
            <InputLabel id="auction-select-label"></InputLabel>
            <Select
              labelId="auction-select-label"
              value={selectedAuction}
              onChange={(e) => setSelectedAuction(e.target.value)}
            >
              {auctions.map((auction) => (
                <MenuItem key={auction.auctionId} value={auction.auctionId}>
                  {auction.auctionName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={assignArtItemsToAuction}
            disabled={!selectedAuction}
            style={{ marginTop: '10px' }} // Added margin to separate button from dropdown
          >
            Assign
          </Button>
        </div>
      </Modal>
    </main>
  );
};

export default ArtItems;

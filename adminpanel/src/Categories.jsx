import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from './Axios';
import { toast } from 'react-toastify';





const Categories = () => {
  
const [categories, setCategories] = useState([]);

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
const navigate=useNavigate();

  const redirectToEdit = async (id) => {
    navigate(`/editCategory/${id}`)
}
    return (
        <main className='main-container'>
    <div className='addAuction' style={{ width: '100%', display: 'flex', justifyContent: 'end', textAlign: 'center' }}>
  <a className='addAuctionButton' href='/addCategory'>
    <AddIcon /> Add Category
  </a>
</div>
        <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{backgroundColor:'#f1eee4'}}>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell >Category Description</TableCell>
                <TableCell >Created On</TableCell>
                <TableCell align='right' >Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((row) => (
                  <TableRow
                  key={row.categroyId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell >
                    {row.categoryName}
                  </TableCell>
                  <TableCell >{row.categoryDescription}</TableCell>
                  <TableCell >{new Date(row.createdOn).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })} </TableCell>
                  <TableCell align='right'><ModeEditIcon onClick={()=>redirectToEdit(row.categroyId)} style={{color:'#808080',cursor:'pointer'}}  />  <DeleteIcon style={{color:'#EA5B60',cursor:'pointer'}} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
              </main>
      );
}
  export default Categories;
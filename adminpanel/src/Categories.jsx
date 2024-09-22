import * as React from 'react';
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),

];



const Categories = () => {
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
                <TableCell align="right">Category Description</TableCell>
                <TableCell align="right">Created On</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                  <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell >
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right"><ModeEditIcon style={{color:'blue'}} />  <DeleteIcon style={{color:'red'}}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
              </main>
      );
}
  export default Categories;
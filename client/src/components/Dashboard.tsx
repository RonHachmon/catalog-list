import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { CatalogContext } from '../context/catalogContext';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const Dashboard = () => {
  const { catalogs,removeCatalog } = useContext(CatalogContext);
  const navigate = useNavigate();

  useEffect(() => {

  }, [catalogs]);

  const convertDateJsonToLocaleString = (date: string) => {
    return new Date(date).toLocaleString();
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Vertical</TableCell>
            <TableCell align="right">Locales&nbsp;</TableCell>
            <TableCell align="right">Prime&nbsp;</TableCell>
            <TableCell align="right">Multi locale&nbsp;</TableCell>
            <TableCell align="right">Index At&nbsp;</TableCell>
            <TableCell align="right">Update&nbsp;</TableCell>
            <TableCell align="right">Delete&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {catalogs.map((catalog) => (
            <TableRow
              key={catalog.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {catalog.name}
              </TableCell>
              <TableCell align="right">{catalog.vertical}</TableCell>
              <TableCell align="right">{catalog.locales? catalog.locales.join(", ") :"none"} </TableCell>
              <TableCell align="right">{catalog.isPrime ? "true" : "false"}</TableCell>
              <TableCell align="right"> {catalog.locales?.length > 1 ? "true" : "false"}</TableCell>
              <TableCell align="right"> {catalog.indexedAt? convertDateJsonToLocaleString(catalog.indexedAt) :"N/A"}</TableCell>

              <TableCell align="right">
                <IconButton sx={{color: 'black'}} aria-label="update"  onClick={() => navigate(`/catalog/edit/${catalog._id}`)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton sx={{color: 'black'}} aria-label="delete"  onClick={() => removeCatalog(catalog._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      
      
    <Box marginTop={2}> 
      <Button  variant="contained" color="primary" onClick={() => {navigate('/catalog/create')}}>
        create catalog
      </Button>
    </Box>
    </>
  );
}
export default Dashboard;

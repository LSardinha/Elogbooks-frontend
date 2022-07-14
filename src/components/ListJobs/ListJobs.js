import React, { Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './ListJobs.scss';

const ListJobs = ({jobs}) => {
  return (
    <Fragment>
      {Object.keys(jobs).length > 0 &&
        <div style={{overflowX: 'auto'}} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className='jobs-table'>
            <TableHead>
              <TableRow>
                <TableCell><b>Id</b></TableCell>
                <TableCell align="right"><b>Summary</b></TableCell>
                <TableCell align="right"><b>Status</b></TableCell>
                <TableCell align="right"><b>Property Name</b></TableCell>
                <TableCell align="right"><b>Raised By</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.summary}</TableCell>
                  <TableCell align="right">{row.status_name}</TableCell>
                  <TableCell align="right">{row.property_name}</TableCell>
                  <TableCell align="right">User 1</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      } 
    </Fragment>
  )

};

export default ListJobs;

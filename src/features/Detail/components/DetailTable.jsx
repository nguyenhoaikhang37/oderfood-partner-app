import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert } from '@mui/material';

export default function DetailTable({ listChoose, onDeleteChoose, onPopupListChoose }) {
  const handleDeleteListChoose = (listChooseId) => {
    onDeleteChoose?.(listChooseId);
  };

  const handleUpdateListChoose = (listChoose) => {
    onPopupListChoose?.(listChoose);
  };

  return (
    <TableContainer component={Paper}>
      {listChoose.length !== 0 ? (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Tên chi tiết đặc điểm</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Giá
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listChoose.map((row) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                  <a
                    onClick={() => {
                      handleUpdateListChoose(row);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit <ion-icon name="create-outline"></ion-icon>
                  </a>
                  <a
                    onClick={() => {
                      handleDeleteListChoose(row._id);
                    }}
                    className="text-red-600  hover:text-red-900 ml-5"
                  >
                    Remove <ion-icon name="trash-outline"></ion-icon>
                  </a>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Alert severity="error">Hiện tại chưa có list đặc điểm!</Alert>
      )}
    </TableContainer>
  );
}

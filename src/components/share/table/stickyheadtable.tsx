import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


// @Doc
// Add id to the obhect of data array --> used for key
// Add minWith to object of columns array -> Default will be 20
// Pagination will be displayed if data size is more than 50

type Props = {
  columns: Array<any>,
  data: Array<any>
}
export default function StickyHeadTable(props: Props) {

  const { columns, data } = props
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: { lg: '60%', xs: '90%' }, overflow: 'hidden' }}>
      <TableContainer sx={{  }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth || 20 }}
                >
                 <div style={{ fontWeight: 600}}>{column.label}</div> 
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                const rowData = row
                return (
                  <TableRow hover key={row.id}>
                    {columns.map((column: any, index: number) => {
                      const { value } = column
                      return (
                        <TableCell key={row.id} align={column.align}>
                           {rowData[value]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length > 50 && <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />}
    </Paper>
  );
}

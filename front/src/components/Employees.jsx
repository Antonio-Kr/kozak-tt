import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  Icon,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { fetchEmployees } from '../redux/action';
import ModalEmployee from './ModalEmployee';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  cursor: {
    cursor: 'pointer',
  },
});

function Employees({ employees, fetchEmployees }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const []

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (!employees) return <>Loading...</>;

  function handleDeleteAction(e) {
    console.log(this);
  }

  function handleEditAction(e) {
    console.log(this);
  }

  return (
    <div>
      <button onClick={handleClickOpen}>ADD</button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Sex</TableCell>
              <TableCell align='center'>Constact Info</TableCell>
              <TableCell align='center'>Salary</TableCell>
              <TableCell align='center'>Position</TableCell>
              <TableCell align='center'>Birthday</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((empl) => (
              <TableRow key={empl._id}>
                <TableCell align='center'>{empl.name}</TableCell>
                <TableCell align='center'>{empl.sex}</TableCell>
                <TableCell align='center'>{empl.contactInfo}</TableCell>
                <TableCell align='center'>{empl.salary}</TableCell>
                <TableCell align='center'>{empl.position}</TableCell>
                <TableCell align='center'>
                  {new Date(empl.birthday).toLocaleDateString()}
                </TableCell>
                <TableCell align='center'>
                  <EditIcon
                    className={classes.cursor}
                    onClick={handleEditAction.bind(empl._id)}
                  />
                  <DeleteIcon
                    className={classes.cursor}
                    onClick={handleDeleteAction.bind(empl._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalEmployee open={open} handleClose={handleClose} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  employees: state.appData.employees,
});

const mapDispatchToProps = { fetchEmployees };

export default connect(mapStateToProps, mapDispatchToProps)(Employees);

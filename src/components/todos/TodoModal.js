import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Checkbox } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth:"500px",
    minWidth:"500px",
    whiteSpace:"pre-line",
    minHeight:"250px"
  },
}));

export default function TransitionsModal({todo,handleClose,open}) {
  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title"> {todo.title}</h2>
            <p id="transition-modal-description">{todo.description}</p>
            <p id="transition-modal-description">{todo.dueDate}</p>
            <Checkbox checked={todo.state} tabIndex={-1} disableRipple/>
            {todo.state?"Completed":"In Progress"}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Checkbox, Grid, TextField } from '@material-ui/core';
import { useForm } from '../../util/hooks';
import { FETCH_TODOS_QUERY, UPDATE_TODO_DETAILS } from "../../util/graphql";
import { useMutation } from '@apollo/react-hooks';


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
    whiteSpace:"pre-line"
  },
}));

export default function UpdateTodoDetails({todo,handleClose,open}) {
  const classes = useStyles();
  const initialState = {
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate,
    state: todo.state,
  };

  const { onChange, onSubmit, toastMsg, values } = useForm(
    updateTodoDetails,
    initialState
  );

  const [updateTodo] = useMutation(UPDATE_TODO_DETAILS,  {
    update(){
        setTimeout(()=>{
          toastMsg("✅ Status Updated Successfully");
      },1200)
      },
    variables:{
        id:todo.id,
        title:todo.title,
        description:todo.description,
        state:todo.state
    },
    refetchQueries: [
        FETCH_TODOS_QUERY,
      ],
  });

  function updateTodoDetails() {
      updateTodo();
  }


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
            {/* <h2 id="transition-modal-title"> {todo.title}</h2>
            <p id="transition-modal-description">{todo.description}</p>
            <Checkbox checked={todo.state} tabIndex={-1} disableRipple/>
            {todo.state?"Completed":"In Progress"} */}
            <form onSubmit={onSubmit} noValidate>
            <Grid container>
              <Grid item xs={11}>
                <Grid
                  container
                  spacing={1}
                  alignItems={grid_items.alignItems}
                  direction={grid_items.direction}
                  justifyContent={grid_items.justify}
                >
                  <Grid item >
                    <TextField
                      id="title"
                      label="Title"
                      margin="normal"
                      value={values.title}
                      onChange={onChange}
                      name="title"
                      required
                    />
                  </Grid>
                  <Grid item>
                  <TextField
                      id="description"
                      label="Description"
                      multiline
                      minRows={1}
                      maxRows={4}
                      margin="normal"
                      value={values.description}
                      onChange={onChange}
                      name="description"
                      required
                    />
                  </Grid>
                  <Grid item>
                  <TextField
                      id="dueDate"
                      label="Due Date"
                      type="date"
                      margin="normal"
                      value={values.dueDate}
                      onChange={onChange}
                      name="dueDate"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      type="submit"
                    >
                      Update Todo
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const grid_items = {
    direction: "row",
    justify: "center",
    alignItems: "center"
  };
import React, { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Checkbox, Grid, TextField } from '@material-ui/core';
import { useForm } from '../../util/hooks';
import { UPDATE_TODO_DETAILS } from "../../util/graphql";
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

export default function UpdateTodoDetails({todo,handleClose,open,FETCH_QUERY}) {
  const classes = useStyles();
  const [initialState,setInitialState]=useState({
        title:'',
        description:'',
        dueDate:'',
        state:false
  });
  useEffect(() => {
      if(open){
        setInitialState(todo)
      }
}, [open])

  const {onSubmit, toastMsg } = useForm(
    updateTodoDetails, 
  );

  const [updateTodo] = useMutation(UPDATE_TODO_DETAILS,  {
    update(){
        setTimeout(()=>{
          toastMsg("✅ Todo Updated Successfully");
      },1200)
      console.log(initialState.state,"sstaaaaaate");
      console.log(typeof initialState.state);
      handleClose(true);
      },
      variables:{
        id:initialState.id,
        title:initialState.title,
        description:initialState.description,
        dueDate:initialState.dueDate,
        state:initialState.state==="false"?true:false
    },
    refetchQueries: [
      FETCH_QUERY,
      ],
  });

  function updateTodoDetails() {
      updateTodo();
  }


  const onChange = (event) => {
    if(event.target.name==="dueDate"){
      event.target.value = event.target.value.split('/').reverse().join('-');
    }
    setInitialState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };


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
                      value={initialState.title}
                      onChange={onChange}
                      name="title"
                      required
                    />
                  </Grid>
                  <hr/>
                  <Grid item>
                  <TextField
                      id="description"
                      label="Description"
                      multiline
                      minRows={1}
                      maxRows={4}
                      margin="normal"
                      value={initialState.description}
                      onChange={onChange}
                      name="description"
                      required
                    />
                  </Grid>
                  <hr/>
                  <Grid item>
                  <TextField
                      id="dueDate"
                      label="Due Date"
                      type="date"
                      margin="normal"
                      value={initialState.dueDate}
                      onChange={onChange}
                      name="dueDate"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  </Grid>
                  <hr/>
                  <Grid item>
                  <Checkbox
                        name="state"
                        value={initialState.state}
                        tabIndex={-1}
                        disableRipple
                        onChange={onChange}
                        />
                  </Grid>
                  <hr/>
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
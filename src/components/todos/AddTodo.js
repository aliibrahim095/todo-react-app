import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';

import { useMutation } from "@apollo/react-hooks";

import { ADD_TODO } from "../../util/graphql";
import { FETCH_TODOS_QUERY } from "../../util/graphql";

import { useForm } from "../../util/hooks";
import { ToastContainer } from "react-toastify";

function AddTodo() {
    const initialState = {
      title: "",
      description: "",
      dueDate: "",
    };
  
    const { onChange, onSubmit, toastMsg, values } = useForm(
      addTodo,
      initialState
    );
  
    const [createTodo, { loading }] = useMutation(ADD_TODO, {
      update() {
        setTimeout(()=>{
          toastMsg("✅ Todo Added Successfully");
      },1200)
      },
      variables: values,
      refetchQueries: [
        FETCH_TODOS_QUERY,
      ],
    });
  
    function addTodo() {
        createTodo();
    }

    return (
        <>
        <ToastContainer/>
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
                      Add Todo
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        {loading && <CircularProgress/>}

      </>
    );
}

const grid_items = {
  direction: "row",
  justify: "center",
  alignItems: "center"
};

export default AddTodo;

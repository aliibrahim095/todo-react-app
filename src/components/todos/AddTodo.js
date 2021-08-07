import React,{useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';

import { useMutation } from "@apollo/react-hooks";

import { ADD_TODO } from "../../util/graphql";
import { useForm } from "../../util/hooks";
import { ToastContainer } from "react-toastify";

function AddTodo() {
    const [errors, setErrors] = useState({});  
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
        toastMsg("✅ Todo Added Successfully");
        
      },
      onError(err) {
        setErrors(err.graphQLErrors[0]?.extensions.errors);
      },
      variables: values,
    });
  
    function addTodo() {
        createTodo();
    }

    return (
        <>
        <ToastContainer/>
        {loading && <CircularProgress/>}
        {errors&&<p>Error</p>}
          <form onSubmit={onSubmit} noValidate>
            <Grid container>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={10}
                  alignItems={grid_items.alignItems}
                  direction={grid_items.direction}
                  justifyContent={grid_items.justify}
                >
                  <Grid item>
                    <TextField
                      id="title"
                      label="Title"
                      margin="normal"
                      value={values.title}
                      onChange={onChange}
                      name="title"
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
      </>
    );
}

const grid_items = {
  direction: "row",
  justify: "center",
  alignItems: "center"
};

export default AddTodo;

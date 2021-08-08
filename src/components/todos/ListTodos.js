import React,{useState,useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from '@material-ui/core/CircularProgress';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

import BoxLayout from '../../layout/BoxLayout'
import TransitionsModal from './TodoModal'


import RemoveTodo from './RemoveTodo'
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import UpdateTodo from "./UpdateTodo";
import { ToastContainer } from "react-toastify";
import UpdateTodoDetails from "./UpdateTodoDetails";

function ListTodos({todos,error,loading,setCounter,FETCH_QUERY}){
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [currentTodo, setCurrentTodo] = useState({});
    const [currentTodoToUpdate, setCurrentTodoToUpdate] = useState({});
  
  const handleOpen = (todo) => {
    setCurrentTodo(todo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };


  const handleUpdateOpen=(todo)=>{
    setCurrentTodoToUpdate(todo);
    setOpenUpdate(true);
  }
          
        return (
            <>
            <ToastContainer/>
            {loading && <CircularProgress/>}
            {error && <p>Error :(</p>}

            <List>
              {todos.map(todo => (
                <BoxLayout key={todo.id}>
                  <ListItem dense>
                  <UpdateTodo todo={todo} FETCH_QUERY={FETCH_QUERY}/>
                    <ListItemText primary={todo.title} />
                    <ListItemSecondaryAction>
                    <IconButton onClick={()=>{handleOpen(todo)}}>
                        <VisibilityIcon ></VisibilityIcon>
                    </IconButton>
                    <IconButton onClick={()=>{handleUpdateOpen(todo)}}>
                        <EditIcon></EditIcon>
                    </IconButton>
                    <IconButton aria-label="Remove Todo">
                        <RemoveTodo todo={todo} FETCH_QUERY={FETCH_QUERY} />
                    </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </BoxLayout>
              ))}
            </List>
            <TransitionsModal todo={currentTodo} open={open} handleClose={handleClose}/>
            <UpdateTodoDetails todo={currentTodoToUpdate} open={openUpdate} handleClose={handleCloseUpdate} FETCH_QUERY={FETCH_QUERY}/>
          </>
        );
}
    
export default ListTodos;

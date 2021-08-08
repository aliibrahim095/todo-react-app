import React,{useState , useEffect} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from '@material-ui/core/CircularProgress';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { useQuery } from "@apollo/react-hooks";
import BoxLayout from '../../layout/BoxLayout'
import TransitionsModal from './TodoModal'

import { FETCH_TODOS_QUERY } from "../../util/graphql";

import RemoveTodo from './RemoveTodo'
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import UpdateTodo from "./UpdateTodo";
import { ToastContainer } from "react-toastify";

function ListTodos(){
    const [open, setOpen] = React.useState(false);
    const [todos, setTodos] = useState([]);
    const [currentTodo, setCurrentTodo] = useState({});

    const {data, loading, error } = useQuery(FETCH_TODOS_QUERY);
    useEffect(() => {
        if (data) {
          const { todos } = data;
          setTodos(todos);
        }
        if (error) {
          return "error";
        }
      },[data,todos,error]);


  const handleOpen = (todo) => {
    setCurrentTodo(todo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
          
        return (
            <>
            <ToastContainer/>
            {loading && <CircularProgress/>}
            {error && <p>Error :(</p>}

            <List>
              {todos.map(todo => (
                <BoxLayout key={todo.id}>
                  <ListItem dense>
                  <UpdateTodo todo={todo} />
                    <ListItemText primary={todo.title} />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Remove Todo">
                         <RemoveTodo todo={todo} />
                      </IconButton>
                      <IconButton onClick={()=>{handleOpen(todo)}}>
                           <VisibilityIcon ></VisibilityIcon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </BoxLayout>
              ))}
            </List>
            <TransitionsModal todo={currentTodo} open={open} handleClose={handleClose}/>
          </>
        );
}
    
export default ListTodos;

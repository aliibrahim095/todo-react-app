import React,{useState , useEffect} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from '@material-ui/core/CircularProgress';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

import { useQuery } from "@apollo/react-hooks";
import BoxLayout from '../../layout/BoxLayout'
import TransitionsModal from './TodoModal'

import { FETCH_TODOS_QUERY } from "../../util/graphql";

import RemoveTodo from './RemoveTodo'
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import UpdateTodo from "./UpdateTodo";
import { ToastContainer } from "react-toastify";
import UpdateTodoDetails from "./UpdateTodoDetails";

function ListTodos(){
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [todos, setTodos] = useState([]);
    const [currentTodo, setCurrentTodo] = useState({});

    // const[isUpdateClicked,setIsUpdateClicked]=useState(false);

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

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };


  const handleUpdateOpen=(todo)=>{
    setCurrentTodo(todo);
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
                  <UpdateTodo todo={todo} />
                    <ListItemText primary={todo.title} />
                    <ListItemSecondaryAction>
                    <IconButton onClick={()=>{handleOpen(todo)}}>
                        <VisibilityIcon ></VisibilityIcon>
                    </IconButton>
                    <IconButton onClick={()=>{handleUpdateOpen(todo)}}>
                        <EditIcon></EditIcon>
                    </IconButton>
                    <IconButton aria-label="Remove Todo">
                        <RemoveTodo todo={todo} />
                    </IconButton>
                      
                      
                    </ListItemSecondaryAction>
                  </ListItem>
                </BoxLayout>
              ))}
            </List>
            <TransitionsModal todo={currentTodo} open={open} handleClose={handleClose}/>
            <UpdateTodoDetails todo={currentTodo} open={openUpdate} handleClose={handleCloseUpdate}/>
          </>
        );
}
    
export default ListTodos;

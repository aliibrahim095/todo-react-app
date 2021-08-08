import React,{useState , useEffect} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from "@apollo/react-hooks";
import BoxLayout from '../../layout/BoxLayout'

import { FETCH_TODOS_QUERY } from "../../util/graphql";

import RemoveTodo from './RemoveTodo'
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import UpdateTodo from "./UpdateTodo";
import { ToastContainer } from "react-toastify";
function ListTodos(){
    const [todos, setTodos] = useState([]);
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
          
        return (
            <>
            <ToastContainer/>
            {loading && <CircularProgress/>}
            {error && <p>Error :(</p>}

            <List>
              {todos.map(todo => (
                <BoxLayout key={todo.id}>
                  <ListItem dense>
                  <UpdateTodo todos={todos} setTodos={setTodos} todo={todo} />
                    <ListItemText primary={todo.title} />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Remove Todo">
                         <RemoveTodo todos={todos} todo={todo} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </BoxLayout>
              ))}
            </List>
          </>
        );
}
    
export default ListTodos;

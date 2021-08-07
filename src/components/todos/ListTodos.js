import React,{useState , useEffect} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from "@apollo/react-hooks";

import { FETCH_TODOS_QUERY } from "../../util/graphql";

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
      }, [data]);
          
        return (
            <>
            {loading && <CircularProgress/>}
        {error && <p>Error :(</p>}
          <List>
            {todos.map(todo => (
              <ListItem key={todo.id} dense>
                <ListItemText primary={todo.title} />
              </ListItem>
            ))}
          </List>
          </>
        );
}
    
export default ListTodos;

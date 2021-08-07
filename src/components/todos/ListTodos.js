import React,{useState , useEffect} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from "@apollo/react-hooks";
import BoxLayout from '../../layout/BoxLayout'

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
      },[data,error]);
          
        return (
            <>
            {loading && <CircularProgress/>}
        {error && <p>Error :(</p>}

            <List>
              {todos.map(todo => (
                <BoxLayout key={todo.id}>
                  <ListItem dense>
                    <ListItemText primary={todo.title} />
                  </ListItem>
                </BoxLayout>
              ))}
            </List>
          </>
        );
}
    
export default ListTodos;

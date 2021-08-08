import { useQuery } from '@apollo/react-hooks';
import React ,{useState, useEffect,useContext} from 'react'
import AddTodo from '../../components/todos/AddTodo'
import ListTodos from '../../components/todos/ListTodos'
import { FETCH_TODOS_QUERY } from '../../util/graphql';
import CounterContext from '../../App'
function Home() {
    const counterObj = useContext(CounterContext);
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
      },[data,counterObj?.counter]);
    return (
        <div>
            <AddTodo/>
            <ListTodos todos={todos} error={error} loading={loading} FETCH_QUERY={FETCH_TODOS_QUERY}/>
        </div>
    )
}

export default Home

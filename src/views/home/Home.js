import { useQuery } from '@apollo/react-hooks';
import React ,{useState, useEffect} from 'react'
import AddTodo from '../../components/todos/AddTodo'
import ListTodos from '../../components/todos/ListTodos'
import { FETCH_TODOS_QUERY } from '../../util/graphql';
function Home() {
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
        <div>
            <AddTodo/>
            <ListTodos todos={todos} error={error} loading={loading}/>
        </div>
    )
}

export default Home

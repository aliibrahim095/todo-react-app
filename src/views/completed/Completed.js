import { useQuery } from '@apollo/react-hooks';
import React ,{useState, useEffect} from 'react'
import ListTodos from '../../components/todos/ListTodos'
import { FETCH_COMPLETED_TODOS } from '../../util/graphql';
function Completed() {
    const [todos, setTodos] = useState([]);
    const {data, loading, error } = useQuery(FETCH_COMPLETED_TODOS);
    useEffect(() => {
        if (data) {
          const { todos } = data;
          setTodos(todos);
        }
        if (error) {
          return "error";
        }
      },[todos,todos,error]);
    return (
        <div>
            <ListTodos todos={todos} error={error} loading={loading}/>
        </div>
    )
}

export default Completed

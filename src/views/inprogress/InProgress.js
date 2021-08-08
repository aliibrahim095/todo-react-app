import { useQuery } from '@apollo/react-hooks';
import React ,{useState, useEffect} from 'react'
import ListTodos from '../../components/todos/ListTodos'
import { FETCH_INPROGRESS_TODOS } from '../../util/graphql';
function InProgress() {
    const [todos, setTodos] = useState([]);
    const {data, loading, error } = useQuery(FETCH_INPROGRESS_TODOS);
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

export default InProgress

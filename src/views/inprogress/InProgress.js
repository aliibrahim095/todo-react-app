import { useQuery } from '@apollo/react-hooks';
import React ,{useState, useEffect,useContext} from 'react'
import ListTodos from '../../components/todos/ListTodos'
import { FETCH_INPROGRESS_TODOS } from '../../util/graphql';
import CounterContext from '../../App'

function InProgress() {
    const counterObj = useContext(CounterContext);
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
      },[data,counterObj?.counter]);
    return (
        <div>
            <ListTodos todos={todos} error={error} loading={loading} FETCH_QUERY={FETCH_INPROGRESS_TODOS}/>
        </div>
    )
}

export default InProgress

import React,{useState} from "react";
import { useMutation } from "@apollo/react-hooks";
import Checkbox from "@material-ui/core/Checkbox";
import { UPDATE_TODO } from "../../util/graphql";
// import { GET_TODOS } from "../../graphql/queries";

function UpdateTodo(props){
    const [errors, setErrors] = useState({});  
    const [isActive,setIsActive]=useState(false)
    const [updateTodo, { loading }] = useMutation(UPDATE_TODO, {
        update() {
        },
        onError(err) {
          setErrors(err.graphQLErrors[0]?.extensions.errors);
        },
        variables:{
            id:props.todo.id,
            state:!props.todo.state
        }
      });
  return (
        <Checkbox
          checked={props.todo.state}
          tabIndex={-1}
          disableRipple
          onClick={() =>
            updateTodo({
              variables: {
                id: props.todo.id,
                state: !props.todo.state
              }
            })
          }
        />
      )}
export default UpdateTodo;

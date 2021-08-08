import React,{useContext} from "react";
import { useMutation } from "@apollo/react-hooks";
import Checkbox from "@material-ui/core/Checkbox";
import { UPDATE_TODO } from "../../util/graphql";

import { FETCH_TODOS_QUERY } from "../../util/graphql";
import { useForm } from "../../util/hooks";
import CounterContext from '../../App'

function UpdateTodo(props){
    const counterObj = useContext(CounterContext);
    const {toastMsg} = useForm();
    const [updateTodo] = useMutation(UPDATE_TODO, {
        update(){
            setTimeout(()=>{
              toastMsg("✅ Status Updated Successfully");
          },1200)
          counterObj?.setCounter(counterObj?.counter+1)
          },
        variables:{
            id:props.todo.id,
            state:!props.todo.state
        },
        refetchQueries: [
          props.FETCH_QUERY,
          ],
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
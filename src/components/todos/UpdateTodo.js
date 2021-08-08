import React from "react";
import { useMutation } from "@apollo/react-hooks";
import Checkbox from "@material-ui/core/Checkbox";
import { UPDATE_TODO } from "../../util/graphql";

import { FETCH_TODOS_QUERY } from "../../util/graphql";
import { useForm } from "../../util/hooks";

function UpdateTodo(props){
    const {toastMsg} = useForm();
    const [updateTodo] = useMutation(UPDATE_TODO, {
        update(){
            setTimeout(()=>{
              toastMsg("✅ Status Updated Successfully");
          },1200)
          },
        variables:{
            id:props.todo.id,
            state:!props.todo.state
        },
        refetchQueries: [
            FETCH_TODOS_QUERY,
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

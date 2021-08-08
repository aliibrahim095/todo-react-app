import React from "react";
import CloseIcon from "@material-ui/icons/Close";

import { useMutation } from "@apollo/react-hooks";
import { REMOVE_TODO } from "../../util/graphql";
import { useForm } from "../../util/hooks";

function RemoveTodo (props){
  const { toastMsg} = useForm();
    const [deleteTodo] = useMutation(REMOVE_TODO, {
        update(){
          setTimeout(()=>{
            toastMsg("✅ Todo Deleted Successfully");
        },1200)
        },
        variables:props.todo.id,
        refetchQueries: [
          props.FETCH_QUERY,
        ],
      });

  return (
        <CloseIcon
          onClick={() =>
            deleteTodo({
              variables: {
                id: props.todo.id
              }
            })
          }
        />
  );
};

export default RemoveTodo;

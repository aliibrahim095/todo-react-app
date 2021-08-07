import React,{useState} from "react";
import CloseIcon from "@material-ui/icons/Close";

import { useMutation } from "@apollo/react-hooks";
import { REMOVE_TODO } from "../../util/graphql";


function RemoveTodo (props){
    const [errors, setErrors] = useState({});  
    const [deleteTodo, { loading }] = useMutation(REMOVE_TODO, {
        update() {
        //   toastMsg("✅ Todo Removed Successfully");
        //   setTimeout(()=>{history.push('/')},1500)
        },
        onError(err) {
          setErrors(err.graphQLErrors[0]?.extensions.errors);
        },
        variables:props.todo.id
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

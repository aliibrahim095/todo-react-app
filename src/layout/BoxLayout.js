import React from "react";
import Paper from "@material-ui/core/Paper";

export default function BoxLayout(props){
    return (
      <div style={{ display: "flex" }}>
        <div style={{ margin: "auto", width: "400px" }}>
          <Paper style={{ marginTop: "20px", padding: "20px" }}>
            {props.children}
          </Paper>
        </div>
      </div>
    ); 
}
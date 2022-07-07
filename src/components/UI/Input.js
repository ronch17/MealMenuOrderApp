import React from "react";

import classes from "./Card.module.css";

const Input = React.forwardRef((props, ref) => {
  console.log(props.input);

  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id} className>
        {props.label}
      </label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;

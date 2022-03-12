import React from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.type}</button>;
};

export default Button;

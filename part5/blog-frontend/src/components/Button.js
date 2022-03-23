import React from "react";

const Button = ({ visible, setVisible }) => {
  const setVisibility = () => {
    setVisible(!visible);
  };

  return (
    <button style={{ marginLeft: "10px" }} onClick={setVisibility}>
      {visible ? "hide" : "show details"}
    </button>
  );
};

export default Button;

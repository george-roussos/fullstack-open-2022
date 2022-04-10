import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Select from "react-select";

import { EDIT_BORN_YEAR, ALL_AUTHORS } from "../queries";

const BornYearForm = ({ authors }) => {
  const [setBornTo, setBornYear] = useState("");
  const [option, setOption] = useState(null);
  const options = [];

  authors.forEach((element) => {
    options.push({ value: element.name, label: element.name });
  });

  const [changeBorn] = useMutation(EDIT_BORN_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (e) => {
    e.preventDefault();

    const name = option.value;
    changeBorn({ variables: { name, setBornTo } });
    setOption(null);
    setBornYear("");
  };

  return (
    <div>
      <h2>change author birth year</h2>
      <form onSubmit={submit}>
        <Select defaultValue={option} onChange={setOption} options={options} />
        <div>
          year
          <input
            value={setBornTo}
            onChange={({ target }) => setBornYear(parseInt(target.value))}
          />
        </div>
        <button type="submit">change year</button>
      </form>
    </div>
  );
};

export default BornYearForm;

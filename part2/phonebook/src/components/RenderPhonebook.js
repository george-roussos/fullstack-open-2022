import React from "react";
import personService from "../services/persons";

const RenderPhonebook = (props) => {
  return (
    <div>
      {props.matches.map((entry) => (
        <p key={entry.id}>
          {entry.name}:&nbsp; {entry.number}
          <button
            onClick={() => {
              personService
                .remove(entry.id)
                .then((phonebook) => {
                  if (window.confirm("Delete entry?")) {
                    props.setPersons(phonebook);
                    props.setMessage(`${entry.name} was deleted`);
                    props.setType("notification");
                    setTimeout(() => {
                      props.setMessage(null);
                      props.setType(null);
                    }, 1000);
                  }
                })
                .catch((error) => {
                  props.setMessage("Operation failed; data is missing.");
                  props.setType("error");
                  setTimeout(() => {
                    props.setMessage(null);
                    props.setType(null);
                  }, 1000);
                });
            }}
            className="ui button"
            style={{ marginLeft: "10px" }}
          >
            Delete entry
          </button>
        </p>
      ))}
    </div>
  );
};

export default RenderPhonebook;

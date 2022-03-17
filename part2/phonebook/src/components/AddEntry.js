import React from "react";
import Message from "./Message";
import personService from "../services/persons";

const AddEntry = (props) => {
  const addEntry = (event) => {
    event.preventDefault();
    if (
      props.persons.filter((person) => person.name === props.entry.name)
        .length < 1
    ) {
      const phonebookObject = {
        name: props.entry.name,
        number: props.entry.number,
        id: Math.floor(Math.random() * 1000),
      };

      personService.create(phonebookObject).then((returnedPerson) => {
        props.setPersons(props.persons.concat(returnedPerson));
        props.setNewEntry({ name: "", number: "", id: "" });
        props.setMessage(`${returnedPerson.name} was added to phonebook`);
        props.setType("notification");
        setTimeout(() => {
          props.setMessage(null);
          props.setType(null);
        }, 3000);
      });
    } else {
      if (
        window.confirm(
          `${props.entry.name} is already added to phonebook. Update number with new one?`
        )
      ) {
        const entry = props.persons.find(
          (person) => person.name === props.entry.name
        );
        const changedEntry = { ...entry, number: props.entry.number };
        personService
          .update(changedEntry.id, changedEntry)
          .then((response) =>
            props.setPersons(
              props.persons.map((person) =>
                person.id !== changedEntry.id ? person : response
              )
            )
          );
        props.setMessage(`${changedEntry.name} was modified`);
        props.setType("notification");
        setTimeout(() => {
          props.setMessage(null);
          props.setType(null);
        }, 3000);
      }
    }
  };

  const handleNewEntry = (event) => {
    const value = event.target.value;
    props.setNewEntry({
      ...props.entry,
      [event.target.name]: value,
    });
  };

  return (
    <div>
      <Message message={props.message} type={props.type} />
      <form onSubmit={addEntry}>
        <div className="ui button">
          Name:&nbsp;
          <input
            value={props.entry.name}
            name="name"
            onChange={handleNewEntry}
          />
        </div>
        <div className="ui button">
          Number:&nbsp;
          <input
            value={props.entry.number}
            name="number"
            onChange={handleNewEntry}
          />
        </div>
        <div>
          <button
            className="ui button"
            type="submit"
            style={{ marginTop: "10px" }}
          >
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEntry;

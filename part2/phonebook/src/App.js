import React from "react";
import { useState, useEffect } from "react";
import AddEntry from "./components/AddEntry";
import RenderPhonebook from "./components/RenderPhonebook";
import Search from "./components/Search";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newEntry, setNewEntry] = useState({ name: "", number: "", id: "" });
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const matches = !search
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().split(" ")[0].includes(search.toLowerCase())
      );

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <br></br>
      <AddEntry
        entry={newEntry}
        setNewEntry={setNewEntry}
        persons={persons}
        setPersons={setPersons}
        message={message}
        setMessage={setMessage}
        type={type}
        setType={setType}
      />
      <h2>Numbers</h2>
      <RenderPhonebook
        matches={matches}
        persons={persons}
        setPersons={setPersons}
        message={message}
        setMessage={setMessage}
        type={type}
        setType={setType}
      />
    </div>
  );
};

export default App;

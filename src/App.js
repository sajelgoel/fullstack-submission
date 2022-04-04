import axios from "axios";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const changeName = (event) => {
    setNewName(event.target.value);
  };

  const changeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const present = persons.filter((val) => val.name === newName);
    if (present.length === 0) {
      setPersons(persons.concat([{ name: newName, number: newNumber }]));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  const changeFilter = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const contacts = persons
    .filter((value) => {
      return value.name.toLowerCase().includes(filter.toLowerCase());
    })
    .map((val, index) => <Person key={index} val={val} />);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={changeFilter} />
      <h3>add a new</h3>
      <PersonForm
        handleSubmit={submitForm}
        newName={newName}
        changeName={changeName}
        newNumber={newNumber}
        changeNumber={changeNumber}
      />
      <h3>Numbers</h3>
      {contacts}
    </div>
  );
};

export default App;

const Person = ({ val }) => (
  <p>
    {val.name} {val.number}
  </p>
);

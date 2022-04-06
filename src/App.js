import contactService from "./contactService";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import "./style.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [alert, setAlert] = useState({ message: "", error: false });

  const changeName = (event) => {
    setNewName(event.target.value);
  };

  const changeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const setTimer = () => {
    setTimeout(() => {
      setAlert({ message: ``, error: false });
    }, 5000);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const present = persons.filter((val) => val.name === newName);
    if (present.length === 0) {
      const obj = {
        name: newName,
        number: newNumber,
      };
      contactService.createContact(obj).then((response) => {
        setPersons(persons.concat([{ ...response }]));
        setNewName("");
        setNewNumber("");
        setAlert({ message: `${response.name} added`, error: false });
        setTimer();
      });
    } else {
      const ans = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      const obj = {
        name: newName,
        number: newNumber,
        id: present[0].id,
      };
      if (ans) {
        contactService.updateContact(obj.id, obj).then((response) => {
          const contacts = persons.filter((value) => value.id !== response.id);
          setPersons(contacts.concat([{ ...response }]));
          setNewName("");
          setNewNumber("");
          setAlert({
            message: `${response.name} number is changed`,
            error: false,
          });
          setTimer();
        });
      }
    }
  };

  const changeFilter = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    contactService.getAllContact().then((response) => {
      setPersons(response);
    });
  }, []);

  const deleteContact = (id) => {
    const contact = persons.filter((value) => value.id === id);
    if (window.confirm(`Delete ${contact[0].name}`)) {
      contactService
        .deleteContact(id)
        .then(() => {
          const personsArray = persons.filter((value) => value.id !== id);
          setPersons(personsArray);
        })
        .catch((value) => {
          setAlert({
            message: `Information of ${contact[0].name} has already removed from server`,
            error: true,
          });
          setTimer();
        });
    }
  };

  const contacts = persons
    .filter((value) => {
      return value.name.toLowerCase().includes(filter.toLowerCase());
    })
    .map((val, index) => (
      <Person key={index} val={val} clickHandle={deleteContact} />
    ));

  return (
    <div>
      <h2>Phonebook</h2>
      {alert.message ? (
        <Alert message={alert.message} error={alert.error} />
      ) : null}
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

const Person = ({ val, clickHandle }) => (
  <p>
    {val.name} {val.number}{" "}
    <button onClick={() => clickHandle(val.id)}>delete</button>
  </p>
);

const Alert = ({ message, error = false }) => {
  const errorMessage = error ? "error" : "success";
  return <div className={errorMessage}>{message}</div>;
};

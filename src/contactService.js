import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllContact = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createContact = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const updateContact = (id, object) => {
  const request = axios.put(`${baseUrl}/${id}`, object);
  return request.then((response) => response.data);
};

const constactService = {
  getAllContact,
  createContact,
  deleteContact,
  updateContact
};
export default constactService;

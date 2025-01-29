import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [record, setRecord] = useState({ name: "", age: "", city: "" });
  const getAllUsers = async () => {
    try {
      await axios.get("http://localhost:8000/users").then((res) => {
        setUsers(res.data);
        setFilterUser(res.data);
      });
    } catch (error) {
      console.log("Error Caught", error.message);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  //Searching Function
  const searchHandler = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredText = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText) ||
        user.city.toLowerCase().includes(searchText)
    );
    setFilterUser(filteredText);
  };

  //Delete Funciton
  const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:8000/users/${id}`).then((res) => {
      setUsers(res.data);
      setFilterUser(res.data);
    });
  };

  //Adding function
  const addUserHandler = () => {
    setRecord({ name: "", age: "", city: "" });
    setIsModelOpen(true);
  };

  const dataHandler = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (record.id) {
      await axios.patch(`http://localhost:8000/users/${record.id}`, record).then((res) => {
      });
    } else {
      await axios.post("http://localhost:8000/users", record).then((res) => {
      });
    }
    getAllUsers();
    setIsModelOpen(false);
    setRecord({ name: "", age: "", city: "" });
  };

  //update funciton
  const updateHandler = (user) => {
    setRecord(user);
    setIsModelOpen(true);
  };
  return (
    <>
      <div className="container">
        <h1>CRUD Application</h1>
        <div className="input-search">
          <input
            type="search"
            placeholder="Search here"
            onChange={searchHandler}
          />
          <button className="btn" onClick={addUserHandler}>
            Add
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterUser &&
              filterUser.map((user, index) => {
                return (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td>
                      <button
                        className="btn green"
                        onClick={() => updateHandler(user)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn red"
                        onClick={() => {
                          deleteHandler(user.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isModelOpen && (
          <div className="model">
            <div className="model-content">
              <span
                className="close"
                onClick={() => {
                  setIsModelOpen(false);
                }}
              >
                &times;
              </span>
              <h2>Add User</h2>
              <div className="input-field">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  value={record.name}
                  name="name"
                  id="name"
                  onChange={dataHandler}
                />
              </div>

              <div className="input-field">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  value={record.age}
                  name="age"
                  id="age"
                  onChange={dataHandler}
                />
              </div>

              <div className="input-field">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  value={record.city}
                  name="city"
                  id="city"
                  onChange={dataHandler}
                />
              </div>
              <button className="btn green" onClick={submitHandler}>
                Add User
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

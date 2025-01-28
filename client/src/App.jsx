import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filterUser,setFilterUser] = useState([]);
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
  const searchHandler = (e)=>{
    const searchText = e.target.value.toLowerCase();
    const filteredText = users.filter((user)=>
    user.name.toLowerCase().includes(searchText) || user.city.toLowerCase().includes(searchText)
    );
    setFilterUser(filteredText);
  }

  //Delete Funciton
  const deleteHandler = async (id)=>{
    await axios.delete(`http://localhost:8000/users/${id}`).then((res)=>{
      setUsers(res.data);
      setFilterUser(res.data);
    })
  }
  return (
    <>
      <div className="container">
        <h1>CRUD Application</h1>
        <div className="input-search">
          <input type="search" placeholder="Search here" onChange={searchHandler}/>
          <button className="btn">Add</button>
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
              filterUser.map((user,index) => {
                return (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td>
                      <button className="btn green">Edit</button>
                    </td>
                    <td>
                      <button className="btn red" onClick={()=>{deleteHandler(user.id)}}>Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;

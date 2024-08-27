import axios from "axios";
import { useEffect, useState } from "react";
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [filtereduser, setFilteruser] =useState([]);
  const [isModalOpen,setisModalOpen]=useState(false);
  const [userData, setuserData]=useState({name: "", age: "",
  city: "",});

  const getAllUsers = async () => {
    await axios.get("http://localhost:8000/users").then
    ((res) => {
      console.log(res.data);
      setUsers(res.data);
      setFilteruser(res.data);
    });
  };
  useEffect(() =>{
    getAllUsers();
  }, []);

  // Search Function

  const handleSearchChange = (e) => {
    const searchText=e.target.value.toLowerCase();
    const filteredusers=users.filter((user) => user.name.toLowerCase().includes(searchText) || user.city.toLowerCase().includes(searchText));
    setFilteruser(filteredusers);

  };

  //Delete user function

  const handleDelete = async (id) =>{
    const isConfirmed = window.confirm("Are you sure you want to delete this user?")
    if(isConfirmed){
    await axios.delete(`http://localhost:8000/users/${id}`).then((res) =>{
      setUsers(res.data);
      setFilteruser(res.data);
    });
  }
  };

  // close modal

  const closeModal = () =>{
    setisModalOpen(false);
    getAllUsers();
  };

  // Add details

  const handleAllRecord=() =>{
    setuserData({name: "", age: "", city: "",});
    setisModalOpen(true);
  };


  const handleData = (e) =>{
    setuserData({...userData,[e.target.name]:e.target.value });

  };

  //Submit function

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(userData.id) 
      {
      await axios.patch(`http://localhost:8000/users/${userData.id}`,userData).then((res)=>{
      console.log(res);

      });
    } else {
    await axios.post("http://localhost:8000/users",userData).then((res)=>{
    console.log(res);
    });
  }
  closeModal();
  setuserData({name: "", age: "", city: "",});
  };

  // Update Usre Function

  const handleUpdateRecord = (user) =>{
    setuserData(user);
    setisModalOpen(true);
  }


  return (
    <>
    <div className="container">
        <h3>CRUD Appliction with React.js Frontend Node.js Backend</h3>
      
      <div className="input-search">
      <input type="search" placeholder="Search..." onChange={handleSearchChange} />
      <button className="btn green" onClick={handleAllRecord}>Add Record</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Name</th>    
            <th>Age</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filtereduser && filtereduser.map((user, index)=>{
            return(
            <tr key={user.id}>
              <td>{index +1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
              <td><button  className="btn green" onClick={() => handleUpdateRecord(user)}>Edit</button></td>
              <td><button className="btn red" onClick={() => handleDelete(user.id)} >Delete</button></td>
            </tr>)
          })}
        </tbody>
      </table>
      {isModalOpen &&(
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{userData.id ? "update Record" : "Add Record"}</h2>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" value={userData.name} name="name" id="name"  onChange={handleData}/>
            </div>
            <div className="input-group">
              <label htmlFor="name">Age</label>
              <input type="number" value={userData.age} name="age" id="age" onChange={handleData}/>
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <input type="text" value={userData.city} name="city" id="city" onChange={handleData}/>
            </div>
            <button className="btn green" onClick={handleSubmit}>{userData.id ? "update Record" : "Add Record"}</button>
          </div>
        </div>
      )}
      </div>
    </>
  )
}

export default App

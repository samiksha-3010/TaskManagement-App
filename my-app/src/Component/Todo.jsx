




import React, { useState, useEffect } from "react";
 import "./style/Todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import api from "./Api.config";
import axios from "axios";
let toUpdateArray = []


const Todo = () => {
  const id = sessionStorage.getItem("id")
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);
  const dis = () => {
    // alert("heyyyyy")
    document.getElementById("todo-update").style.display = "block";
  };
  const disclose = () => {
    document.getElementById("todo-update").style.display = "none";
  };

  const Show = () => {
    document.getElementById("text-area").style.display = "block";
  };
  const update = (value) => {
    toUpdateArray= Array[value];
  }

  const change = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    try {
      if (inputs.title === "" || inputs.body === "") {
        toast.error("Title or body should not be empty");
      } else {
        const storedId = sessionStorage.getItem("id");
        if (storedId) {
          const response = await api.post("/add-task", {
            title: inputs.title,
            body: inputs.body,
            id: storedId,
          });
         
          // console.log(response); /
          setInputs({ title: "", body: "" });
          toast.success("Task added successfully");
        } else {
          setArray([...Array, inputs]);
          setInputs({ title: "", body: "" });
          toast.error("Task is added but will not save please login first");
        }
      }
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };



  const del = async (Cardid) => {
    try {
      const userId = sessionStorage.getItem("id");
      if (!userId) {
        toast.error("User not logged in");
        return;
      }
  
      const response = await axios.delete(`http://localhost:8000/delete-task/${Cardid}`, {
        data: { id: userId }  // Sending the userId in the request body
      });

  
      if (response.status === 200) {
        toast.success(response.data.message);
        setArray((prevArray) => prevArray.filter(task => task._id !== Cardid));
      } else 
      toast(response.data.message);
      
  
      {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("An error occurred while deleting the task");
    }
  };
  
  // const del = async(Cardid) => {

  //   await api
  //   .delete(`/delete-task/${Cardid}`,{data:{id:id} }).then((response)=>{
       
  //     toast(response.data.message);
  //   })
    
  // };

  

  


  
  useEffect(() => {
    
    if(id){
      const fetch = async () => {
        await api
          .get(`/get-task/${id}`)
          .then((response) => {
            setArray(response.data.list);
          });
      };
      fetch();
    }
    
  }, [submit]);

  return (
    <div className="todo">
      <ToastContainer />
      <div className="todo-main container d-flex justify-content-center align-items-center flex-column">
        <div className="d-flex flex-column todo-inputs-div w-100 my-4">
          <input
            type="text"
            placeholder="Title"
            className="my-2 p-2 todo-inputs"
            onClick={Show}
            name="title"
            value={inputs.title}
            onChange={change}
          />
          <textarea
            id="text-area"
            type="text"
            placeholder="Body"
            value={inputs.body}
            className="my-2 p-2 todo-inputs"
            onChange={change}
            name="body"
          />
        </div>
        <div className="w-lg-50 w-100 d-flex justify-content-end m-3">
          <button onClick={submit} className="home-button px-2 py-1">
            ADD
          </button>
        </div>
      </div>

        <div className="todo-body">
        <div className="container-fluid">
          <div className="row">
            {Array &&
              Array.map((item, index) => (
                <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2" key={index}>
                  <TodoCards
                    title={item.title}
                    body={item.body}
                    id={item._id}
                    delId={del}
                    display={dis}
                    upadetedId={index}
                    tobeUpdate={update}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="todo-update" id="todo-update">
          <div className="container update" >
            <Update display={dis} closeUpdate={disclose} update={toUpdateArray}/>
          </div>

          <div   >Delite</div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
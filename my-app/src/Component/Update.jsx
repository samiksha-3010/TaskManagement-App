import axios from "axios";
import React, { useEffect } from "react";
import "./style/Todo.css";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import api from "../Api.config";

const Update = ({ closeUpdate, update }) => {
  const [inputs, setInputs] = useState({
    title: update.title,
    body: update.body,
  });

  useEffect(() => {
    setInputs({
      title: update.title,
      body: update.body,
    });
  }, [update]);

  const change = (e) => {
    const { name, value } = e.target; // Fix: use e.target.value
    setInputs({ ...inputs, [name]: value });
  };
  
  const submit = async () => {
   
    closeUpdate("none");

    await axios
      .put(`/update-task/${update._id}`, inputs)
      .then((response) => {
        // console.log(response, "here is update response");
        toast.success(response.data.message)
      });
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
     
      <h3>Update</h3>
      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        value={inputs.title}
        onChange={change}
        name="title"
      />
      <textarea
        className="todo-inputs w-100 p-3"
        value={inputs.body}
        onChange={change}
        name="body"
      />
      <div>
        <button className="btn btn-dark my-4" onClick={submit}>
          UPDATE
        </button>
        <button
          className="btn btn-danger my-4 mx-3"
          id="todo-update"
          onClick={() => closeUpdate("none")}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default Update;
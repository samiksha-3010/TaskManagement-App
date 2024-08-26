import React, { useState } from "react";
import "./Signup.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import api from "../Api.config";

const Signup = () => {
  const router = useNavigate()
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/register", inputs);
      console.log(response.data);

      if (response.data.success) {
        // Registration successful, handle accordingly
        toast.success("User registered successfully");
        router("/Login")

      } else {
        // Registration failed, display error message
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }

    setInputs({
      email: "",
      password: "",
      name: ""
    });
  };

  return (
    <div className="signup">
      <ToastContainer/>
      <div className="container">
        <div className="row">
          <div className="login-image d-none d-lg-block col-lg-4 height d-lg-flex justify-content-center align-items-center heading ">
            <h1 className="text-center ">
              Sign <br />
              Up
            </h1>
          </div>
          <div className="col-lg-8 height d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-5">
              <input
                type="email"
                className="input p-2 my-2"
                name="email"
                placeholder="Enter Your Email"
                onChange={change}
                value={inputs.email}
              />
              <input
                type="text"
                className="input p-2 my-2"
                name="name"
                placeholder="Enter Your Username"
                onChange={change}
                value={inputs.name}
              />
              <input
                type="password"
                className="input p-2 my-2"
                name="password"
                placeholder="Enter Your Password"
                onChange={change}
                value={inputs.password}
              />
              <button className="signup-button" onClick={handleSubmit}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
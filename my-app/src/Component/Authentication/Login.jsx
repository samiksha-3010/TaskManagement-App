// import React, { useState } from 'react';
// import "./Signup.css";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux';
// import { authAction } from '../store';
// import api from '../Api.config';

// const Login = () => {
//   const dispatch = useDispatch()
//   const router = useNavigate();
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: ""
//   });
 

//   const change = (e) => {
//     const { name, value } = e.target;
//     setInputs({ ...inputs, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // const response = await axios.post("/login", inputs);
//       const response = await api.post("/login", inputs);
//       // console.log(response.data.user._id);
//       sessionStorage.setItem("id",response.data.user._id)
//       dispatch(authAction.login())


//       if (response.data.success) {
//         // Login successful, handle accordingly
//         toast.success("Login successful");
//         router("/todo"); // Redirect to home or another page
//       } else {
//         // Login failed, display error message
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }

//     setInputs({
//       email: "",
//       password: "",
//       username: ""
//     });
//   };

//   return (
//     <div className='signup'>
//       <ToastContainer />
//       <div className='container'>
//         <div className='row'>
//           <div className='d-none d-lg-block login-image col-lg-4 height d-lg-flex justify-content-center align-items-center '>
//             <h1 className='text-center heading'>
//               Log <br />
//               In
//             </h1>
//           </div>
//           <div className='col-lg-8 height d-flex justify-content-center align-items-center'>
//             <div className='d-flex flex-column w-100 p-5'>
//               <input type="email" className='input p-2 my-2' name='email' placeholder='Enter Your Email' onChange={change} value={inputs.email} />
              
//               <input type="password" className='input p-2 my-2' name='password' placeholder='Enter Your Password' onChange={change} value={inputs.password} />
//               <button className='signup-button' onClick={handleSubmit}>Log In</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import "./Signup.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAction } from '../store';
import api from '../Api.config';

const Login = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", inputs);
      // console.log(response.data);

      if (response.data.success) {
        sessionStorage.setItem("id", response.data.user._id);
        dispatch(authAction.login());

        toast.success("Login successful");
        router("/todo"); // Redirect after successful login
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    }

    // Clear inputs after submission
    setInputs({
      email: "",
      password: ""
    });
  };

  return (
    <div className='signup'>
      <ToastContainer />
      <div className='container'>
        <div className='row'>
          <div className='d-none d-lg-block login-image col-lg-4 height d-lg-flex justify-content-center align-items-center '>
            <h1 className='text-center heading'>
              Log <br />
              In
            </h1>
          </div>
          <div className='col-lg-8 height d-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column w-100 p-5'>
              <input 
                type="email" 
                className='input p-2 my-2' 
                name='email' 
                placeholder='Enter Your Email' 
                onChange={change} 
                value={inputs.email} 
              />
              
              <input 
                type="password" 
                className='input p-2 my-2' 
                name='password' 
                placeholder='Enter Your Password' 
                onChange={change} 
                value={inputs.password} 
              />
              <button className='signup-button' onClick={handleSubmit}>
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

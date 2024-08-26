import React from 'react';
import '../Navbar/Navbar.css'
import { VscAccount } from "react-icons/vsc";
import { GrBook } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authAction } from '../store';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)

  const dispatch = useDispatch()
  // console.log(isLoggedIn,"here  ");
  const router = useNavigate()
  const logout = () =>{
    sessionStorage.clear("id")
    dispatch(authAction.logout())
    router("/Login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-light-pink">
        <div className="container">
          <a className="navbar-brand" href="#">
            <b>LOGO <GrBook /> </b> 
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" onClick={()=>router("/")}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page"  onClick={()=>router("/About-us")}>
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" onClick={()=>router("/todo")}>
                  Todo
                </a>
              </li>
              {!isLoggedIn &&(
              <>
              <li className="nav-item nav-button mx-lg-2 ">
                <a className="nav-link active" aria-current="page" onClick={()=>router("/SignUp")}>
                  Sign Up
                </a>
              </li>
              
              <li className="nav-item nav-button mx-lg-2 my-lg-0  my-2 ">
                <a className="nav-link active" aria-current="page" onClick={()=>router("/Login")}>
                  Login
                </a>
              </li>
              </>
               )}
              {isLoggedIn && <>
                <li className="nav-item nav-button mx-lg-2" onClick={logout}>
                <a className="nav-link active" aria-current="page" href="#">
                  Logout
                </a>
              </li>

              </>}
              
              
              
              
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
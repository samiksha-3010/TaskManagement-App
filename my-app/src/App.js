import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Todo from './Component/Todo';
import Signup from './Component/Authentication/Signup';
import Login from './Component/Authentication/Login';
import Home from './Component/Home/Home';
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Footer/Footer';

function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/todo" element={<Todo/>} />
      <Route exact path="/SignUp" element={<Signup />} />
      <Route exact path="/Login" element={<Login />} />
      </Routes>
      <Footer/>

    
    </div>
  );
}

export default App;

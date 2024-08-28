import './App.css';
import { Route, Routes } from 'react-router-dom';
import Todo from './Component/Todo';
import Signup from './Component/Authentication/Signup';
import Login from './Component/Authentication/Login';
import Home from './Component/Home/Home';
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Footer/Footer';
import SubPaisaSubscriptionForm from './Component/Subcrption/SubPaisaSubscriptionForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentMetod from './Component/Subcrption/PymentMetod';

const stripePromise = loadStripe('your-publishable-key-here');

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/todo" element={<Todo/>} />
      <Route exact path="/SignUp" element={<Signup />} />
      <Route exact path="/Login" element={<Login />} />
      <Route exact path="/payment" element={< PaymentMetod/>} />

     
      {/* <Route exact path="/Subscription-Form" element={<SubPaisaSubscriptionForm/>} /> */}

      </Routes>
      <Elements stripe={stripePromise}>
            <SubPaisaSubscriptionForm />
        </Elements>
      <Footer/>

    
    </div>
  );
}

export default App;

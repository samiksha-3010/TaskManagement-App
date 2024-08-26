import React from 'react'
import '../Home/Home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const router = useNavigate()
  return (
    <div className='home d-flex justify-content-center align-items-center'>
        
        <div className='container'>
            <h1>ORGANIZE YOUR WORK <br /> let"s go</h1>
            <p>Amateurs sit and wait for inspiration, <br />the rest of us just get up and go to work....' <br /> <b>- Stephen King</b></p>
            <button className='home-button' onClick={()=>router("/todo")}>CREATE YOUR LIST</button>
        </div>
       
    </div>
  )
}

export default Home
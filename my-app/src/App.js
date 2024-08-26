import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Todo from './Component/Todo';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/todo" element={<Todo/>} />
      </Routes>

    
    </div>
  );
}

export default App;

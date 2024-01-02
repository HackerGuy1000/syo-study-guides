import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Reset from './components/Reset/Reset';
import Dashboard from './components/Dashboard/Dashboard';
import Admin from './components/Admin/Admin';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route extact path ="/admin-dashboard" element={<Admin/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;

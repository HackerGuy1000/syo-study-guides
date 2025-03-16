import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
import Reset from './components/Reset/Reset';
import Dashboard from './components/Dashboard/Dashboard';
import { default as Viewer } from './components/Viewer/Viewer';
import Missing from './Pages/404/Missing';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="*" element={<Missing />} />
          <Route exact path="/viewer-test" element={<Viewer />} />

          {/* Protected Routes  */}
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/viewer" element={<Viewer />} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserTable from './components/UserTable';
import Toolbar from './components/Toolbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

const UserPage = () => {
  const handleBlock = () => {
    console.log("Block user");
  };

  const handleUnblock = () => {
    console.log("Unblock user");
  };

  const handleDelete = () => {
    console.log("Delete user");
  };

  return (
    <>
      <Toolbar onBlock={handleBlock} onUnblock={handleUnblock} onDelete={handleDelete} />
      <UserTable />
    </>
  );
};

export default App;

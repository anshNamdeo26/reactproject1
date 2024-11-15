import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import Dashboard from './Components/DashBoard';
import Profile from './Components/Profile';
import { UserProvider } from './Components/UserContext';
import './App.css';

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;



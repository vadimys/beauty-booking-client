import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import SignIn from './components/signIn/SignIn';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userTypeFromStorage = localStorage.getItem('userType');
        if (token && userTypeFromStorage) {
            setIsAuthenticated(true);
            setUserType(userTypeFromStorage);
        }
    }, []);

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
            <Router>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />
                    <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
};

export default App;

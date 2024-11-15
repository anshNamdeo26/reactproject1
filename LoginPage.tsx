import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';

function LoginPage() {
    const { setUserData } = useUser();  // Access setUserData from UserContext
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        const url = `https://localhost:7014/UserAdmin/users/${username}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'cors',
                },
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();
            setUserData(data); // Set userData in context

            if (username === data.email && password === data.password) {
                navigate('/dashboard');
                alert("Login successful!");
            } else {
                alert('Invalid email or password');
            }

        } catch (err) {
            console.error('Failed to fetch data:', err);
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="login-container p-4" style={{ border: '1px solid black', width: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            required
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            required
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-3">
                        Login
                    </button>
                </form>
                <div className="text-center mt-3">
                    <a href="/forgot-password">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

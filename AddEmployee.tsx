import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function AddEmployee() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [apiError, setApiError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const role = [
        { value: "0", label: "Select role" },
        { value: "1", label: "user" },
        { value: "2", label: "admin" }
    ];

    const [selectedOption, setSelectedOption] = useState(role[0]);

    const handleChange = (option) => {
        setSelectedOption(option);
    };


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Email validation regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        } else {
            setEmailError('');
        }

        if (password !== confirmPassword) {
            setPasswordError('Password not matched');
            return;
        } else {
            setPasswordError('');
        }

        const userData = {
            name: username,
            email: email,
            password: password,
            role: selectedOption.label
        };

        try {
            debugger;
            const response = await axios.post('https://localhost:7014/UserAdmin/user', userData);

            setSuccessMessage('User added successfully!');
            setApiError('');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setApiError('Failed to add user. Please try again.');
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="login-container p-4" style={{ border: '1px solid black', width: '400px' }}>
                <h2 className="text-center mb-4">Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Employee Name"
                            value={username}
                            required
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            required
                            onChange={handleEmailChange}
                        />
                        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
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
                    <br />
                    <div className="form-group">
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            required
                            onChange={handleConfirmPasswordChange}
                        />
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    </div>
                    <br />
                    <div className="form-group">
                        <Select
                            id="selRole"
                            className = "form-control"
                            value={selectedOption}
                            required
                            onChange={handleChange}
                            options={role}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Add Employee</button>
                    {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;

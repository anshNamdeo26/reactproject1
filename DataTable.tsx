import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser } from './UserContext';
import Select from 'react-select';

const DataTable = () => {
    const { userData } = useUser();  // Access userData from UserContext with local storage support
    const [data, setData] = useState([]);
    const [editIdx, setEditIdx] = useState(-1);
    const [formData, setFormData] = useState({});
    const role = [
        { value: "0", label: "Select role" },
        { value: "1", label: "User" },
        { value: "2", label: "Admin" }
    ];

    //const [selectedOption, setSelectedOption] = useState(userData.role);
    const initialSelectedOption = role.find(option => option.label.toLowerCase() === userData?.role?.toLowerCase()) || role[0];
    console.log(initialSelectedOption);
    const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

    const handleSelectChange = (option) => {
        setSelectedOption(option);
    };

    useEffect(() => {
        axios.get('https://localhost:7014/UserAdmin/users')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleEdit = (index) => {
        setEditIdx(index);
        setFormData(data[index]);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            axios.delete(`https://localhost:7014/UserAdmin/user/${id}`)
                .then(() => {
                    setData(data.filter((item) => item.id !== id));
                })
                .catch((error) => console.error('Error deleting data:', error));
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = (id) => {
        const updatedData = data.map((item) => (item.id === id ? formData : item));
        axios.put(`https://localhost:7014/UserAdmin/user/${id}`, formData)
            .then(() => {
                setData(updatedData);
            })
            .catch((error) => console.error('Error updating data:', error));

        setEditIdx(-1);
    };

    const handleCancel = () => {
        setEditIdx(-1);
        setFormData({});
    };

    return (
        <div className="container mt-4">
            <h3>User Data</h3>
            <table className="table table-bordered table-striped" style={{ width: '900px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        {userData?.role === "admin" && ( // displayed if the logged-in user role is admin
                            <th>Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                {editIdx === index ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    item.name
                                )}
                            </td>
                            <td>
                                {editIdx === index ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    item.email
                                )}
                            </td>
                            <td>
                                {editIdx === index ? (
                                    <Select
                                        type="selRole"
                                        name="role"
                                        value={selectedOption}
                                        onChange={handleSelectChange}
                                        options={role}
                                    />
                                ) : (
                                    item.role
                                )}
                            </td>
                            {userData?.role === "admin" && ( // only show edit, delete, update options if the logged-in user role is admin
                                <td>
                                    {editIdx === index ? (
                                        <>
                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() => handleUpdate(item.id)}
                                            >
                                                Update
                                            </button>
                                            <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-primary btn-sm me-2"
                                                onClick={() => handleEdit(index)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
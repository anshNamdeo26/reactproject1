import React, { useState } from 'react';
import DataTable from './DataTable';
import Header from './Header';
import AddEmployee from './AddEmployee';
import { useUser } from './UserContext';

function Dashboard() {
    const { userData } = useUser();
    const [showForm, setShowForm] = useState(false);

    const handleButtonClick = () => {
        setShowForm(!showForm);
    };

    return (
        <>
            <Header />
            <p>Welcome to the Dashboard Page</p>
            <DataTable />
            {userData?.role === "admin" && (
            <button onClick={handleButtonClick} style={{ backgroundColor: 'green' }}>
                {showForm ? 'Close Form' : 'Add Employee'}
                </button>
            )}
            {showForm && <AddEmployee />}
        </>
    );
}

export default Dashboard;

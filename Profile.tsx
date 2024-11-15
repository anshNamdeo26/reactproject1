import React from 'react';
import { useUser } from './UserContext';
import Header from './Header';
import './Profile.css';

const Profile = () => {
    debugger;
    const { userData } = useUser();

    return (
        <>
            <Header />
            <div className="profileContainer">
                <p><b>Name:</b> {userData?.name || 'No name available'}</p>
                <p><b>Role:</b> {userData?.role || 'No role available'}</p>
                <p><b>Email:</b> {userData?.email || 'No email available'}</p>
            </div>
        </>
    );
};

export default Profile;




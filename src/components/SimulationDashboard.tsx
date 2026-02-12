import React, { useState } from 'react';

const roles = {
    admin: { features: ['View Dashboard', 'Manage Users', 'Edit Settings'] },
    user: { features: ['View Dashboard'] },
    guest: { features: [] },
};

const SimulationDashboard = () => {
    const [currentRole, setCurrentRole] = useState('guest');

    const handleRoleChange = (event) => {
        setCurrentRole(event.target.value);
    };

    return (
        <div>
            <h1>Role-Based Simulation Dashboard</h1>
            <label>Select Role: </label>
            <select value={currentRole} onChange={handleRoleChange}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
            </select>
            <h2>Features Available:</h2>
            <ul>
                {roles[currentRole].features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </div>
    );
};

export default SimulationDashboard;
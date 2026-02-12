import React, { useState } from 'react';

const roleFeatures = {
    admin: ["Manage Users", "View Reports", "Change Settings"],
    user: ["View Content", "Comment on Posts"],
    guest: ["View Content"]
};

const SimulationDashboard = () => {
    const [selectedRole, setSelectedRole] = useState('guest');
    const [actionLog, setActionLog] = useState([]);

    const handleRoleChange = (role) => {
        setSelectedRole(role);
        setActionLog([...actionLog, `Switched to ${role} role`]);
    };

    return (
        <div>
            <h1>Role Switcher</h1>
            <div>
                <h2>Select Role</h2>
                {Object.keys(roleFeatures).map((role) => (
                    <button key={role} onClick={() => handleRoleChange(role)}>{role}</button>
                ))}
            </div>
            <h2>Features for {selectedRole} role:</h2>
            <ul>
                {roleFeatures[selectedRole].map((feature) => (
                    <li key={feature}>{feature}</li>
                ))}
            </ul>
            <h2>Action Log:</h2>
            <ul>
                {actionLog.map((log, index) => (
                    <li key={index}>{log}</li>
                ))}
            </ul>
        </div>
    );
};

export default SimulationDashboard;

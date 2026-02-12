// RolePermissions.ts

// Defining role-based permissions for the Greentrax application

enum Role {
    Visitor_Free = 'Visitor_Free',
    Visitor_Paid = 'Visitor_Paid',
    Analyst = 'Analyst',
    Ranger = 'Ranger',
    OpsCommand = 'OpsCommand',
}

const permissions = {
    [Role.Visitor_Free]: {
        viewMedia: true,
        controlDrones: false,
        cameraControl: false,
        transmit: false,
        deployUnits: false,
    },
    [Role.Visitor_Paid]: {
        viewMedia: true,
        controlDrones: false,
        cameraControl: true,
        transmit: false,
        deployUnits: false,
    },
    [Role.Analyst]: {
        viewMedia: true,
        controlDrones: true,
        cameraControl: true,
        transmit: true,
        deployUnits: false,
    },
    [Role.Ranger]: {
        viewMedia: true,
        controlDrones: true,
        cameraControl: true,
        transmit: true,
        deployUnits: true,
    },
    [Role.OpsCommand]: {
        viewMedia: true,
        controlDrones: true,
        cameraControl: true,
        transmit: true,
        deployUnits: true,
    },
};

export { Role, permissions };
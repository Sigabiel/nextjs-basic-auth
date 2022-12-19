import Role from "./Role";

const admin:Role = {id: 0, name: "Administrator"};
const staff:Role = {id: 1, name: "Staff"};
const user:Role = {id: 10, name: "User"};

const roles:Role[] = [admin, staff, user];

const idToRole = (id:number) => {
    switch (id) {
        case admin.id:
            return admin;
            break;
        case staff.id:
            return staff;
            break;
        case user.id:
            return user;
            break;
    }
}

const validateRoleId = (id:number) => {
    return roles.find(role => role.id === id) !== undefined;
}

export default {
    idToRole, validateRoleId,
    admin, staff, user, roles
}

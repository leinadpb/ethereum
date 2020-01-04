"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Role {
    constructor(id, roleName) {
        this.mapObject = (object) => {
            return new Role(object.role_id, object.role_name);
        };
        this.mapObjects = (objects) => {
            let rs = [];
            objects.forEach((object) => {
                rs.push(new Role(object.role_id, object.role_name));
            });
            return rs;
        };
        this.setName = (roleName) => {
            this.role_name = roleName;
        };
        this.setId = (id) => {
            this.role_id = id;
        };
        this.getName = () => {
            return this.role_name;
        };
        this.getId = () => {
            return this.role_id;
        };
        this.role_id = id;
        this.role_name = roleName;
    }
}
exports.default = Role;

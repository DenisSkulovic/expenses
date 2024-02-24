"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
var UserDTO = /** @class */ (function () {
    function UserDTO(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
    UserDTO.build = function (obj) {
        return new UserDTO(obj.id, obj.username, obj.password);
    };
    return UserDTO;
}());
exports.UserDTO = UserDTO;

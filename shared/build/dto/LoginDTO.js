"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDTO = void 0;
var LoginDTO = /** @class */ (function () {
    function LoginDTO(email, password) {
        this.email = email;
        this.password = password;
    }
    LoginDTO.validate = function (data) {
        if (!data.email)
            throw new Error("LoginDTO validation error: 'email' is required");
        if (!data.password)
            throw new Error("LoginDTO validation error: 'password' is required");
    };
    LoginDTO.build = function (data) {
        LoginDTO.validate(data);
        return new LoginDTO(data.email || "", data.password || "");
    };
    return LoginDTO;
}());
exports.LoginDTO = LoginDTO;

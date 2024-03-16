"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenDTO = void 0;
var RefreshTokenDTO = /** @class */ (function () {
    function RefreshTokenDTO(userId, token, expiresAt, createdAt, isValid) {
        this.userId = userId;
        this.token = token;
        this.expiresAt = expiresAt;
        this.createdAt = createdAt;
        this.isValid = isValid;
    }
    RefreshTokenDTO.validate = function (obj) {
        if (!obj.userId)
            throw new Error("RefreshTokenDTO validation error: 'userId' is required");
        if (!obj.token)
            throw new Error("RefreshTokenDTO validation error: 'token' is required");
        if (!obj.expiresAt || isNaN(Date.parse(obj.expiresAt)))
            throw new Error("RefreshTokenDTO validation error: 'expiresAt' is not a valid date");
        if (!obj.createdAt || isNaN(Date.parse(obj.createdAt)))
            throw new Error("RefreshTokenDTO validation error: 'createdAt' is not a valid date");
        if (typeof obj.isValid !== 'boolean')
            throw new Error("RefreshTokenDTO validation error: 'isValid' must be a boolean");
    };
    RefreshTokenDTO.build = function (obj) {
        RefreshTokenDTO.validate(obj);
        return new RefreshTokenDTO(obj.userId, obj.token, new Date(obj.expiresAt), new Date(obj.createdAt), obj.isValid);
    };
    return RefreshTokenDTO;
}());
exports.RefreshTokenDTO = RefreshTokenDTO;

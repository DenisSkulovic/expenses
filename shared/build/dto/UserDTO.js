"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
var UserDTO = /** @class */ (function () {
    function UserDTO(_id, email, password, username, address, phone, firstName, lastName, dateOfBirth, profilePictureUrl, bio, joinDate, settings) {
        this._id = _id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.address = address;
        this.phone = phone;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.profilePictureUrl = profilePictureUrl;
        this.bio = bio;
        this.joinDate = joinDate;
        this.settings = settings;
    }
    UserDTO.validate = function (obj) {
        if (!obj._id)
            throw new Error("UserDTO validation error: '_id' is required");
        if (!obj.email)
            throw new Error("UserDTO validation error: 'email' is required");
        if (!obj.username)
            throw new Error("UserDTO validation error: 'username' is required");
        if (!obj.firstName)
            throw new Error("UserDTO validation error: 'firstName' is required");
        if (!obj.lastName)
            throw new Error("UserDTO validation error: 'lastName' is required");
        if (!obj.dateOfBirth || isNaN(Date.parse(obj.dateOfBirth)))
            throw new Error("UserDTO validation error: 'dateOfBirth' is not a valid date");
        if (obj.joinDate && isNaN(Date.parse(obj.joinDate)))
            throw new Error("UserDTO validation error: 'joinDate' is not a valid date");
    };
    UserDTO.build = function (obj) {
        UserDTO.validate(obj);
        return new UserDTO(obj._id, obj.email, obj.password, obj.username, obj.address || '', obj.phone || '', obj.firstName, obj.lastName, new Date(obj.dateOfBirth), obj.profilePictureUrl || '', obj.bio || '', obj.joinDate ? new Date(obj.joinDate) : new Date(), obj.settings);
    };
    return UserDTO;
}());
exports.UserDTO = UserDTO;

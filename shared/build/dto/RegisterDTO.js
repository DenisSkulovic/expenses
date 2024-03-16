"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDTO = void 0;
var RegisterDTO = /** @class */ (function () {
    function RegisterDTO(email, password1, password2, username, firstName, lastName, dateOfBirth, address, phone, profilePictureUrl, bio) {
        if (address === void 0) { address = ''; }
        if (phone === void 0) { phone = ''; }
        if (profilePictureUrl === void 0) { profilePictureUrl = ''; }
        if (bio === void 0) { bio = ''; }
        this.email = email;
        this.password1 = password1;
        this.password2 = password2;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.phone = phone;
        this.profilePictureUrl = profilePictureUrl;
        this.bio = bio;
    }
    RegisterDTO.validate = function (data) {
        if (!data.email)
            throw new Error("RegisterDTO validation error: 'email' is required");
        if (!data.password1)
            throw new Error("RegisterDTO validation error: 'password1' is required");
        if (!data.password2)
            throw new Error("RegisterDTO validation error: 'password2' is required");
        if (!data.username)
            throw new Error("RegisterDTO validation error: 'username' is required");
        if (!data.firstName)
            throw new Error("RegisterDTO validation error: 'firstName' is required");
        if (!data.lastName)
            throw new Error("RegisterDTO validation error: 'lastName' is required");
        if (!data.dateOfBirth || isNaN(Date.parse(data.dateOfBirth)))
            throw new Error("RegisterDTO validation error: 'dateOfBirth' is not a valid date");
    };
    RegisterDTO.build = function (data) {
        RegisterDTO.validate(data);
        return new RegisterDTO(data.email || "", data.password1 || "", data.password2 || "", data.username || "", data.firstName || "", data.lastName || "", data.dateOfBirth || new Date(), data.address || "", data.phone || "", data.profilePictureUrl || "", data.bio || "");
    };
    RegisterDTO.getEmpty = function () {
        return new RegisterDTO("", "", "", "", "", "", new Date(), "", "", "", "");
    };
    return RegisterDTO;
}());
exports.RegisterDTO = RegisterDTO;

import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { UserDTO } from "shared-dtos"
import { Settings } from "../model/Settings"

export const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: String,
    phone: String,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    profilePictureUrl: String,
    bio: String,
    joinDate: {
        type: Date,
        default: Date.now
    },
    settings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Settings
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }
    next();
});

userSchema.virtual('userDTO').get(function (): UserDTO {
    return UserDTO.build({
        id: this._id,
        email: this.email,
        username: this.username,
        address: this.address,
        phone: this.phone,
        firstName: this.firstName,
        lastName: this.lastName,
        dateOfBirth: this.dateOfBirth,
        profilePictureUrl: this.profilePictureUrl,
        bio: this.bio,
        joinDate: this.joinDate,
        // Include settings reference in DTO if needed
    });
});

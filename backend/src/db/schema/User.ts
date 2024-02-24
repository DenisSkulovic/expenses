import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { UserDTO } from "shared-dtos"

export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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
    return new UserDTO(
        this.id,
        this.username,
        this.password,
    );
});
import mongoose from 'mongoose';
import { User } from '../model/User';

export const refreshTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '7d' }
    },
    isValid: {
        type: Boolean,
        required: true,
        default: true
    },
});

refreshTokenSchema.index({ userId: 1, token: 1 }, { unique: true });
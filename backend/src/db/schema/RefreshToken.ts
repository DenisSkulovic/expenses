import mongoose from 'mongoose';

export const refreshTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming you have a User model
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
        index: { expires: '7d' } // Automatically delete the document after 7 days
    },
    isValid: {
        type: Boolean,
        required: true,
        default: true
    },
});

refreshTokenSchema.index({ userId: 1, token: 1 }, { unique: true });
import mongoose from "mongoose";

export const settingsSchema = new mongoose.Schema({
    theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light'
    },
    dashboard: {
        showWelcomeMessage: { type: Boolean, default: true }
        // TODO add more settings
    }
});

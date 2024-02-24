"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.refreshTokenSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.refreshTokenSchema.index({ userId: 1, token: 1 }, { unique: true });
//# sourceMappingURL=RefreshToken.js.map
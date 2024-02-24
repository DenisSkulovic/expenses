"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RefreshToken_1 = require("../schema/RefreshToken");
exports.RefreshToken = mongoose_1.default.model('RefreshToken', RefreshToken_1.refreshTokenSchema);
//# sourceMappingURL=RefreshToken.js.map
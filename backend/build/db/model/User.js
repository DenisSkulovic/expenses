"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../schema/User");
exports.User = mongoose_1.default.model('User', User_1.userSchema);
//# sourceMappingURL=User.js.map
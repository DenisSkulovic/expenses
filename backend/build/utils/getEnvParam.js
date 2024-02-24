"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvParam = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnvParam = (paramName, isMandatory = true) => {
    const param = process.env[paramName];
    if (isMandatory && !param) {
        throw new Error(`${paramName} is a mandatory ENV param`);
    }
    return param || '';
};
exports.getEnvParam = getEnvParam;
//# sourceMappingURL=getEnvParam.js.map
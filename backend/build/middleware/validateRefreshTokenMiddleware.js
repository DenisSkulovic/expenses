"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRefreshTokenMiddleware = void 0;
const AuthService_1 = require("../service/AuthService");
const getEnvParam_1 = require("../utils/getEnvParam");
const jwtRefreshSecret = (0, getEnvParam_1.getEnvParam)('JWT_REFRESH_SECRET', true);
function validateRefreshTokenMiddleware(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Assuming the token is sent in the Authorization header
        if (!refreshToken) {
            return res.status(401).json({ error: 'No refresh token provided' });
        }
        try {
            const userId = yield AuthService_1.AuthService.verifyRefreshToken(refreshToken, jwtRefreshSecret);
            if (!userId) {
                return res.status(401).json({ error: 'Invalid refresh token' });
            }
            // Validate the refresh token with the AuthService
            const isValid = yield AuthService_1.AuthService.validateRefreshToken(userId, refreshToken);
            if (!isValid) {
                return res.status(401).json({ error: 'Invalid or expired refresh token' });
            }
            // Append userId to the request object
            req.userId = userId;
            next();
        }
        catch (error) {
            console.error('Error validating refresh token:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
}
exports.validateRefreshTokenMiddleware = validateRefreshTokenMiddleware;
//# sourceMappingURL=validateRefreshTokenMiddleware.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const shared_dtos_1 = require("shared-dtos");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = require("../repository/UserRepository");
const RefreshTokenRepository_1 = require("../repository/RefreshTokenRepository");
class AuthService {
    static loginUser(username, password, jwtSecret, jwtRefreshSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            let accessToken = null;
            let refreshToken = null;
            try {
                const user = yield UserRepository_1.UserRepository.findUser({ username });
                if (!user)
                    throw new Error('User not found');
                const userDTO = shared_dtos_1.UserDTO.build(user.toJSON());
                if (!userDTO.id)
                    throw new Error("no id was stored in the database");
                if (!userDTO.password)
                    throw new Error("no password was stored in the database");
                const isMatch = yield bcrypt_1.default.compare(password, userDTO.password);
                if (!isMatch)
                    throw new Error('Invalid credentials');
                accessToken = jsonwebtoken_1.default.sign({ username: userDTO.username }, jwtSecret, { expiresIn: '24h' });
                refreshToken = jsonwebtoken_1.default.sign({ username: userDTO.username }, jwtRefreshSecret, { expiresIn: '7d' });
                // Store refreshToken in a persistent storage (e.g., database) associated with the user
                yield RefreshTokenRepository_1.RefreshTokenRepository.storeRefreshToken(userDTO.id, refreshToken);
            }
            catch (err) {
                console.error(err);
            }
            return { accessToken, refreshToken };
        });
    }
    static registerUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let isSuccess = false;
            try {
                const userDto = shared_dtos_1.UserDTO.build({ username, password });
                isSuccess = yield UserRepository_1.UserRepository.createUser(userDto);
            }
            catch (err) {
                console.error(err);
            }
            return isSuccess;
        });
    }
    static generateRefreshToken(userId, jwtRefreshSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            let refreshToken = null;
            try {
                refreshToken = jsonwebtoken_1.default.sign({ id: userId }, jwtRefreshSecret, { expiresIn: '7d' });
                // Store refreshToken in a persistent storage (e.g., database) associated with the user
                yield RefreshTokenRepository_1.RefreshTokenRepository.storeRefreshToken(userId, refreshToken);
            }
            catch (err) {
                console.error(err);
            }
            return refreshToken;
        });
    }
    static refreshAccessToken(refreshToken, jwtSecret, jwtRefreshSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            let accessToken = null;
            try {
                const decoded = jsonwebtoken_1.default.verify(refreshToken, jwtRefreshSecret);
                const userId = decoded.id;
                if (!userId)
                    throw new Error('Invalid refresh token');
                // Verify if the refreshToken is stored and valid in the database
                const isValidRefreshToken = yield AuthService.validateRefreshToken(userId, refreshToken);
                if (!isValidRefreshToken)
                    throw new Error('Invalid or expired refresh token');
                accessToken = jsonwebtoken_1.default.sign({ id: userId }, jwtSecret, { expiresIn: '24h' });
            }
            catch (error) {
                console.error('Error refreshing access token:', error);
            }
            return accessToken;
        });
    }
    static validateRefreshToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield RefreshTokenRepository_1.RefreshTokenRepository.retrieveRefreshToken(userId, refreshToken);
                return !!token && token.isValid && new Date(token.expiresAt) > new Date();
            }
            catch (err) {
                console.error('Error validating refresh token:', err);
                return false;
            }
        });
    }
    static verifyRefreshToken(refreshToken, jwtRefreshSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, jwtRefreshSecret);
            const userId = decoded.id;
            return userId;
        });
    }
    static invalidateRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Assuming there's a method in RefreshTokenRepository to invalidate a refresh token
                yield RefreshTokenRepository_1.RefreshTokenRepository.invalidateRefreshToken(refreshToken);
                return true;
            }
            catch (err) {
                console.error('Error invalidating refresh token:', err);
                return false;
            }
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map
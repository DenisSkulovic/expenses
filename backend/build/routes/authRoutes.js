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
const express_1 = require("express");
const AuthService_1 = require("../service/AuthService");
const getEnvParam_1 = require("../utils/getEnvParam");
const router = (0, express_1.Router)();
const jwtSecret = (0, getEnvParam_1.getEnvParam)('JWT_SECRET', true);
const jwtRefreshSecret = (0, getEnvParam_1.getEnvParam)('JWT_REFRESH_SECRET', true);
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = { statusCode: 200, body: {} };
    try {
        const { username, password } = req.body;
        const tokens = yield AuthService_1.AuthService.loginUser(username, password, jwtSecret, jwtRefreshSecret);
        if (tokens.accessToken && tokens.refreshToken) {
            response.body = { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };
        }
        else {
            response.statusCode = 401;
            response.body = { error: 'Credentials are incorrect' };
        }
    }
    catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}));
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = { statusCode: 200, body: {} };
    try {
        const { username, password } = req.body;
        const isSuccess = yield AuthService_1.AuthService.registerUser(username, password);
        if (isSuccess) {
            response.statusCode = 201;
            response.body = { message: 'User created successfully' };
        }
        else {
            response.statusCode = 500;
            response.body = { error: 'Error creating user' };
        }
    }
    catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Error creating user' };
    }
    res.status(response.statusCode).json(response.body);
}));
router.post('/refresh', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = { statusCode: 200, body: {} };
    try {
        const { refreshToken } = req.body;
        const accessToken = yield AuthService_1.AuthService.refreshAccessToken(refreshToken, jwtSecret, jwtRefreshSecret);
        if (accessToken) {
            response.body = { accessToken };
        }
        else {
            response.statusCode = 401;
            response.body = { error: 'Invalid or expired refresh token' };
        }
    }
    catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}));
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = { statusCode: 200, body: {} };
    try {
        const { refreshToken } = req.body;
        const isSuccess = yield AuthService_1.AuthService.invalidateRefreshToken(refreshToken);
        if (!isSuccess) {
            response.statusCode = 500;
            response.body = { error: 'Error during logout' };
        }
    }
    catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}));
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
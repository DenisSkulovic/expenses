import { Request, Response } from 'express';
import { AuthService } from '../service/AuthService';
import { UserDTO } from 'shared-dtos';
import { getEnvParam } from '../utils/getEnvParam';

const jwtSecret: string = getEnvParam('JWT_SECRET', true);
const jwtRefreshSecret: string = getEnvParam('JWT_REFRESH_SECRET', true);


export const handleLogin = async (req: Request, res: Response) => {
    let response = { statusCode: 200, body: {} };
    try {
        const { username, password } = req.body;
        const tokens = await AuthService.loginUser(username, password, jwtSecret, jwtRefreshSecret);
        if (tokens.accessToken && tokens.refreshToken) {
            response.body = { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };
        } else {
            response.statusCode = 401;
            response.body = { error: 'Credentials are incorrect' };
        }
    } catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}

export const handleRegister = async (req: Request, res: Response) => {
    let response = { statusCode: 200, body: {} };
    try {
        const { username, password } = req.body;
        const isSuccess = await AuthService.registerUser(username, password);
        if (isSuccess) {
            response.statusCode = 201;
            response.body = { message: 'User created successfully' };
        } else {
            response.statusCode = 500;
            response.body = { error: 'Error creating user' };
        }
    } catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Error creating user' };
    }
    res.status(response.statusCode).json(response.body);
}

export const handleRefresh = async (req: Request, res: Response) => {
    let response = { statusCode: 200, body: {} };
    try {
        const { refreshToken } = req.body;
        const accessToken = await AuthService.refreshAccessToken(refreshToken, jwtSecret, jwtRefreshSecret);
        if (accessToken) {
            response.body = { accessToken };
        } else {
            response.statusCode = 401;
            response.body = { error: 'Invalid or expired refresh token' };
        }
    } catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}

export const handleLogout = async (req: Request, res: Response) => {
    let response = { statusCode: 200, body: {} };
    try {
        const { refreshToken } = req.body;
        const isSuccess = await AuthService.invalidateRefreshToken(refreshToken);
        if (!isSuccess) {
            response.statusCode = 500;
            response.body = { error: 'Error during logout' };
        }
    } catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}

export const handleEditUser = async (req: Request, res: Response) => {
    let response = { statusCode: 200, body: {} };
    try {
        const { userId } = req.params;
        const userDetails: Partial<UserDTO> = req.body;
        const updatedUser = await AuthService.editUser(userId, userDetails);
        if (updatedUser) {
            response.body = { message: 'User updated successfully', user: updatedUser };
        } else {
            response.statusCode = 404;
            response.body = { error: 'User not found' };
        }
    } catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}
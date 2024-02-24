import { NextFunction, Request, Response } from "express";
import { AuthService } from "../service/AuthService";
import { getEnvParam } from "../utils/getEnvParam";

const jwtRefreshSecret: string = getEnvParam('JWT_REFRESH_SECRET', true);

export async function validateRefreshTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.headers['authorization']?.split(' ')[1]; // Assuming the token is sent in the Authorization header
    if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token provided' });
    }

    try {
        const userId: string | null | undefined = await AuthService.verifyRefreshToken(refreshToken, jwtRefreshSecret)
        if (!userId) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }

        // Validate the refresh token with the AuthService
        const isValid = await AuthService.validateRefreshToken(userId, refreshToken);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid or expired refresh token' });
        }

        // Append userId to the request object
        req.userId = userId;
        next();
    } catch (error) {
        console.error('Error validating refresh token:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
import { UserDTO } from "shared-dtos";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { UserRepository } from "../repository/UserRepository";
import { RefreshTokenRepository } from "../repository/RefreshTokenRepository";

export class AuthService {

    public static async loginUser(username: string, password: string, jwtSecret: string, jwtRefreshSecret: string): Promise<{ accessToken: string | null, refreshToken: string | null }> {
        let accessToken: string | null = null;
        let refreshToken: string | null = null;
        try {
            const user = await UserRepository.findUser({ username });
            if (!user) throw new Error('User not found');
            const userDTO: UserDTO = UserDTO.build(user.toJSON());
            if (!userDTO.id) throw new Error("no id was stored in the database");
            if (!userDTO.password) throw new Error("no password was stored in the database");

            const isMatch = await bcrypt.compare(password, userDTO.password);
            if (!isMatch) throw new Error('Invalid credentials');

            accessToken = jwt.sign({ username: userDTO.username }, jwtSecret, { expiresIn: '24h' });
            refreshToken = jwt.sign({ username: userDTO.username }, jwtRefreshSecret, { expiresIn: '7d' });
            // Store refreshToken in a persistent storage (e.g., database) associated with the user
            await RefreshTokenRepository.storeRefreshToken(userDTO.id, refreshToken);
        } catch (err) {
            console.error(err);
        }
        return { accessToken, refreshToken };
    }

    public static async registerUser(username: string, password: string): Promise<boolean> {
        let isSuccess = false
        try {
            const userDto = UserDTO.build({ username, password });
            isSuccess = await UserRepository.createUser(userDto);
        } catch (err) {
            console.error(err)
        }
        return isSuccess
    }

    public static async generateRefreshToken(userId: string, jwtRefreshSecret: string): Promise<string | null> {
        let refreshToken: string | null = null
        try {
            refreshToken = jwt.sign({ id: userId }, jwtRefreshSecret, { expiresIn: '7d' });
            // Store refreshToken in a persistent storage (e.g., database) associated with the user
            await RefreshTokenRepository.storeRefreshToken(userId, refreshToken);
        } catch (err) {
            console.error(err)
        }
        return refreshToken
    }

    public static async refreshAccessToken(refreshToken: string, jwtSecret: string, jwtRefreshSecret: string): Promise<string | null> {
        let accessToken: string | null = null
        try {
            const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as jwt.JwtPayload;
            const userId = decoded.id;
            if (!userId) throw new Error('Invalid refresh token');

            // Verify if the refreshToken is stored and valid in the database
            const isValidRefreshToken: boolean = await AuthService.validateRefreshToken(userId, refreshToken);
            if (!isValidRefreshToken) throw new Error('Invalid or expired refresh token');

            accessToken = jwt.sign({ id: userId }, jwtSecret, { expiresIn: '24h' });
        } catch (error) {
            console.error('Error refreshing access token:', error);
        }
        return accessToken;
    }

    public static async validateRefreshToken(userId: string, refreshToken: string): Promise<boolean> {
        try {
            const token = await RefreshTokenRepository.retrieveRefreshToken(userId, refreshToken);
            return !!token && token.isValid && new Date(token.expiresAt) > new Date();
        } catch (err) {
            console.error('Error validating refresh token:', err);
            return false;
        }
    }

    public static async verifyRefreshToken(refreshToken: string, jwtRefreshSecret: string): Promise<string | null | undefined> {
        const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as jwt.JwtPayload;
        const userId: string | null | undefined = decoded.id;
        return userId
    }

    public static async invalidateRefreshToken(refreshToken: string): Promise<boolean> {
        try {
            // Assuming there's a method in RefreshTokenRepository to invalidate a refresh token
            await RefreshTokenRepository.invalidateRefreshToken(refreshToken);
            return true;
        } catch (err) {
            console.error('Error invalidating refresh token:', err);
            return false;
        }
    }
}
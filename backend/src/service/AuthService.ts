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
            const user: UserDTO | null | undefined = await UserRepository.findUser({ username });
            if (!user) throw new Error('User not found');

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error('Invalid credentials');

            accessToken = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: '24h' });
            refreshToken = jwt.sign({ username: user.username }, jwtRefreshSecret, { expiresIn: '7d' });
            await RefreshTokenRepository.storeRefreshToken(user, refreshToken);
        } catch (err) {
            console.error(err);
        }
        return { accessToken, refreshToken };
    }

    public static async registerUser(username: string, password: string): Promise<boolean> {
        let isSuccess = false
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userDto = UserDTO.build({ username, password: hashedPassword });
            isSuccess = await UserRepository.createUser(userDto);
        } catch (err) {
            console.error(err)
        }
        return isSuccess
    }

    public static async editUser(userId: string, userDetails: Partial<UserDTO>): Promise<UserDTO | null> {
        try {
            const user = await UserRepository.getUserById(userId);
            if (!user) throw new Error('User not found');

            const updatedUserDetails = { ...user.toJSON(), ...userDetails };
            delete updatedUserDetails.password;
            await UserRepository.updateUser(userId, UserDTO.build(updatedUserDetails));
            return UserDTO.build(updatedUserDetails);
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    public static async changeUserPassword(user: UserDTO, newPassword: string): Promise<boolean> {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await UserRepository.changeUserPassword(user, hashedPassword);
            return true;
        } catch (err) {
            console.error('Error changing user password:', err);
            return false;
        }
    }

    public static async generateRefreshToken(user: UserDTO, jwtRefreshSecret: string): Promise<string | null> {
        let refreshToken: string | null = null
        try {
            refreshToken = jwt.sign({ id: user._id }, jwtRefreshSecret, { expiresIn: '7d' });
            await RefreshTokenRepository.storeRefreshToken(user, refreshToken);
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

            const isValidRefreshToken: boolean = await AuthService.validateRefreshToken(userId, refreshToken);
            if (!isValidRefreshToken) throw new Error('Invalid or expired refresh token');

            accessToken = jwt.sign({ id: userId }, jwtSecret, { expiresIn: '24h' });
        } catch (error) {
            console.error('Error refreshing access token:', error);
        }
        return accessToken;
    }

    public static async validateRefreshToken(user: UserDTO, refreshToken: string): Promise<boolean> {
        try {
            const token = await RefreshTokenRepository.retrieveRefreshToken(user, refreshToken);
            return !!token && token.isValid && new Date(token.expiresAt) > new Date();
        } catch (err) {
            console.error('Error validating refresh token:', err);
            return false;
        }
    }
    public static async verifyRefreshToken(refreshToken: string, jwtRefreshSecret: string): Promise<UserDTO | null> {
        const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as jwt.JwtPayload;
        if (!decoded.id) return null;
        const user = await UserRepository.getUserById(decoded.id);
        return user ? UserDTO.build(user.toJSON()) : null;
    }

    public static async invalidateRefreshToken(refreshToken: string): Promise<boolean> {
        try {
            await RefreshTokenRepository.invalidateRefreshToken(refreshToken);
            return true;
        } catch (err) {
            console.error('Error invalidating refresh token:', err);
            return false;
        }
    }
}
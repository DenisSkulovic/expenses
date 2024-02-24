import { RefreshToken } from "../db/model/RefreshToken"

export class RefreshTokenRepository {

    public static async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
        const newRefreshToken = new RefreshToken({
            userId,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Expires in 7 days
        });
        await newRefreshToken.save();
    }

    public static async retrieveRefreshToken(userId: string, refreshToken: string): Promise<any> {
        return await RefreshToken.findOne({ userId: userId, token: refreshToken });
    }

    public static async invalidateRefreshToken(refreshToken: string): Promise<void> {
        await RefreshToken.updateOne({ token: refreshToken }, { $set: { isValid: false } });
    }
}
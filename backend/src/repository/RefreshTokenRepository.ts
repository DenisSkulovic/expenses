import { RefreshToken } from "../db/model/RefreshToken"
import { RefreshTokenDTO, UserDTO } from "shared-dtos"

const oneDay = 24 * 60 * 60 * 1000

export class RefreshTokenRepository {

    public static async storeRefreshToken(user: UserDTO, refreshToken: string): Promise<void> {
        const newRefreshToken = new RefreshToken({
            userId: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * oneDay)
        });
        await newRefreshToken.save();
    }

    public static async retrieveRefreshToken(user: UserDTO, refreshToken: string): Promise<RefreshTokenDTO | null> {
        const refreshTokenDocument = await RefreshToken.findOne({ userId: user._id, token: refreshToken });
        return refreshTokenDocument ? RefreshTokenDTO.build(refreshTokenDocument.toJSON()) : null;
    }

    public static async invalidateRefreshToken(refreshToken: string): Promise<void> {
        await RefreshToken.updateOne({ token: refreshToken }, { $set: { isValid: false } });
    }
}
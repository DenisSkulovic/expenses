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
exports.RefreshTokenRepository = void 0;
const RefreshToken_1 = require("../db/model/RefreshToken");
class RefreshTokenRepository {
    static storeRefreshToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRefreshToken = new RefreshToken_1.RefreshToken({
                userId,
                token: refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Expires in 7 days
            });
            yield newRefreshToken.save();
        });
    }
    static retrieveRefreshToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RefreshToken_1.RefreshToken.findOne({ userId: userId, token: refreshToken });
        });
    }
    static invalidateRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield RefreshToken_1.RefreshToken.updateOne({ token: refreshToken }, { $set: { isValid: false } });
        });
    }
}
exports.RefreshTokenRepository = RefreshTokenRepository;
//# sourceMappingURL=RefreshTokenRepository.js.map
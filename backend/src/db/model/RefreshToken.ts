import mongoose from "mongoose"
import { refreshTokenSchema } from "../schema/RefreshToken"

export const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

import mongoose from "mongoose"
import { userSchema } from "../schema/User";

export const User = mongoose.model('User', userSchema);
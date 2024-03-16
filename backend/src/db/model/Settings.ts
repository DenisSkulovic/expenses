import mongoose from "mongoose"
import { settingsSchema } from "../schema/Settings";

export const Settings = mongoose.model('Settings', settingsSchema);
import { SettingsDTO, UserDTO } from "shared-dtos";
import { Settings } from "../db/model/Settings";
import mongoose from "mongoose";

export class SettingsRepository {

    public static async createSettingsForUser(settingsData: SettingsDTO): Promise<SettingsDTO> {
        const settings: mongoose.Document = new Settings(settingsData);
        const savedDocument: mongoose.Document<SettingsDTO> = await settings.save();
        return SettingsDTO.build(savedDocument.toJSON());
    }

    public static async updateSettingsForUser(user: UserDTO, settingsData: SettingsDTO): Promise<SettingsDTO> {
        const settings: mongoose.Document<SettingsDTO> | null = await Settings.findOne({ _id: user.settings });
        if (!settings) throw new Error('Settings not found');
        Object.assign(settings, settingsData);
        const savedDocument: mongoose.Document<SettingsDTO> = await settings.save();
        return SettingsDTO.build(savedDocument.toJSON());
    }

    public static async getSettingsForUser(user: UserDTO): Promise<mongoose.Document<SettingsDTO> | null> {
        const settings: mongoose.Document<SettingsDTO> | null = await Settings.findOne({ _id: user.settings });
        if (!settings) throw new Error('Settings not found');
        return settings;
    }

}

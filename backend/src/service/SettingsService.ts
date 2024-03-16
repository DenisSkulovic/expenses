import { SettingsRepository } from "../repository/SettingsRepository";
import { SettingsDTO, UserDTO } from "shared-dtos";
import { UserRepository } from "../repository/UserRepository";

export class SettingsService {

    private static async createDefaultSettingsForUser(user: UserDTO): Promise<SettingsDTO> {
        const defaultSettings: SettingsDTO = new SettingsDTO("");
        const createdSettings = await SettingsRepository.createSettingsForUser(defaultSettings);
        if (!createdSettings) throw new Error('Failed to create default settings');
        // Assuming there's a method to link the created settings to the user
        await UserRepository.linkSettingsToUser(user, createdSettings._id);
        return defaultSettings;
    }

    public static async getSettings(user: UserDTO): Promise<SettingsDTO | null> {
        try {
            const settingsDocument = await SettingsRepository.getSettingsForUser(user);
            if (!settingsDocument) {
                return this.createDefaultSettingsForUser(user);
            }
            return SettingsDTO.build(settingsDocument.toJSON());
        } catch (err) {
            console.error('Error retrieving settings:', err);
            return null;
        }
    }

    public static async updateSettings(user: UserDTO, settingsData: SettingsDTO): Promise<void> {
        try {
            await SettingsRepository.updateSettingsForUser(user, settingsData);
        } catch (err) {
            console.error('Error updating settings:', err);
        }
    }
}

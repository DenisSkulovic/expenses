import { Request, Response } from "express";
import { SettingsService } from "../service/SettingsService";

export const handleGetSettings = async (req: Request, res: Response) => {
    try {
        const user = req.user; // Assuming req.user is populated by previous middleware
        const settings = await SettingsService.getSettings(user);
        res.json(settings);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to retrieve settings', error: error.message });
    }
}

export const handleUpdateSettings = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id; // Assuming req.user is populated by previous middleware
        const settingsData = req.body;
        await SettingsService.updateSettings(userId, settingsData);
        res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to update settings', error: error.message });
    }
}
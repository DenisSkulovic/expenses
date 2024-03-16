import { Router } from 'express';
import { validateRefreshTokenMiddleware } from '../middleware/validateRefreshTokenMiddleware';
import { handleGetSettings, handleUpdateSettings } from '../handlers/settingsHandlers';

const router = Router();

export enum SettingsRoutes {
    GET = '/get',
    UPDATE = '/update'
}

router.get(SettingsRoutes.GET, validateRefreshTokenMiddleware, handleGetSettings);
router.put(SettingsRoutes.UPDATE, validateRefreshTokenMiddleware, handleUpdateSettings);

export default router

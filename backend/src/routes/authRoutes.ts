import { Router } from 'express';
import { validateRefreshTokenMiddleware } from '../middleware/validateRefreshTokenMiddleware';
import { handleEditUser, handleLogin, handleLogout, handleRefresh, handleRegister } from '../handlers/authHandlers';

const router = Router();

export enum AuthRoutes {
    LOGIN = '/login',
    REGISTER = '/register',
    REFRESH = '/refresh',
    LOGOUT = '/logout',
    EDIT_USER = '/edit-user/:userId'
}

router.post(AuthRoutes.LOGIN, handleLogin)
router.post(AuthRoutes.REGISTER, handleRegister);
router.post(AuthRoutes.REFRESH, handleRefresh);
router.post(AuthRoutes.LOGOUT, handleLogout);
router.put(AuthRoutes.EDIT_USER, validateRefreshTokenMiddleware, handleEditUser);

export default router
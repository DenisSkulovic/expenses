import { Router } from 'express';
import { validateRefreshTokenMiddleware } from '../middleware/validateRefreshTokenMiddleware';
import { handleCreate, handleDelete, handleFind, handleGet, handleUpdate } from '../handlers/expenseHandlers';

const router = Router();

export enum ExpenseRoutes {
    CREATE = '/create',
    UPDATE = '/update/:expenseId',
    DELETE = '/delete/:expenseId',
    GET = '/get/:expenseId',
    FIND = '/find'
}

router.post(ExpenseRoutes.CREATE, validateRefreshTokenMiddleware, handleCreate);
router.put(ExpenseRoutes.UPDATE, validateRefreshTokenMiddleware, handleUpdate);
router.delete(ExpenseRoutes.DELETE, validateRefreshTokenMiddleware, handleDelete);
router.get(ExpenseRoutes.GET, validateRefreshTokenMiddleware, handleGet);
router.get(ExpenseRoutes.FIND, validateRefreshTokenMiddleware, handleFind);

export default router
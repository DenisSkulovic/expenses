import { Request, Response } from 'express';
import { ExpenseService } from '../service/ExpenseService';


export const handleCreate = async (req: Request, res: Response) => {
    let response = { statusCode: 200, body: {} };
    try {
        const expenseData = req.body;
        const userId: string | undefined = req.userId
        if (!userId) throw new Error("cannot proceed without userId")
        const isSuccess = await ExpenseService.createExpense(userId, expenseData);
        if (isSuccess) {
            response.body = { message: 'Expense created successfully' };
        } else {
            response.statusCode = 400;
            response.body = { error: 'Error creating expense' };
        }
    } catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}

export const handleUpdate = async (req: Request, res: Response) => {
    let response = { statusCode: 200, body: {} };
    try {
        const { expenseId } = req.params;
        const expenseData = req.body;
        const userId: string | undefined = req.userId
        if (!userId) throw new Error("cannot proceed without userId")
        await ExpenseService.updateExpense(userId, expenseId, expenseData);
        response.body = { message: 'Expense updated successfully' };
    } catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}

export const handleDelete = async (req: Request, res: Response) => {
    let response = { statusCode: 200, body: {} };
    try {
        const { expenseId } = req.params;
        const userId: string | undefined = req.userId
        if (!userId) throw new Error("cannot proceed without userId")
        await ExpenseService.deleteExpense(userId, expenseId);
        response.body = { message: 'Expense deleted successfully' };
    } catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}

export const handleGet = async (req: Request, res: Response) => {
    let response = { statusCode: 200, body: {} };
    try {
        const { expenseId } = req.params;
        const userId: string | undefined = req.userId
        if (!userId) throw new Error("cannot proceed without userId")
        const expense = await ExpenseService.getExpenseById(userId, expenseId);
        if (expense) {
            response.body = { expense };
        } else {
            response.statusCode = 404;
            response.body = { error: 'Expense not found' };
        }
    } catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}

export const handleFind = async (req: Request, res: Response) => {
    let response = { statusCode: 200, body: {} };
    try {
        const userId: string | undefined = req.userId
        if (!userId) throw new Error("cannot proceed without userId")
        const query = req.query;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const expenses = await ExpenseService.findExpenses(userId, query, page, limit);
        response.body = { expenses };
    } catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}

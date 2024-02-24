"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ExpenseService_1 = require("../service/ExpenseService");
const validateRefreshTokenMiddleware_1 = require("../middleware/validateRefreshTokenMiddleware");
const router = (0, express_1.Router)();
router.post('/create', validateRefreshTokenMiddleware_1.validateRefreshTokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = { statusCode: 200, body: {} };
    try {
        const expenseData = req.body;
        const userId = req.userId;
        if (!userId)
            throw new Error("cannot proceed without userId");
        const isSuccess = yield ExpenseService_1.ExpenseService.createExpense(userId, expenseData);
        if (isSuccess) {
            response.body = { message: 'Expense created successfully' };
        }
        else {
            response.statusCode = 400;
            response.body = { error: 'Error creating expense' };
        }
    }
    catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}));
router.put('/update/:expenseId', validateRefreshTokenMiddleware_1.validateRefreshTokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = { statusCode: 200, body: {} };
    try {
        const { expenseId } = req.params;
        const expenseData = req.body;
        const userId = req.userId;
        if (!userId)
            throw new Error("cannot proceed without userId");
        yield ExpenseService_1.ExpenseService.updateExpense(userId, expenseId, expenseData);
        response.body = { message: 'Expense updated successfully' };
    }
    catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}));
router.delete('/delete/:expenseId', validateRefreshTokenMiddleware_1.validateRefreshTokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = { statusCode: 200, body: {} };
    try {
        const { expenseId } = req.params;
        const userId = req.userId;
        if (!userId)
            throw new Error("cannot proceed without userId");
        yield ExpenseService_1.ExpenseService.deleteExpense(userId, expenseId);
        response.body = { message: 'Expense deleted successfully' };
    }
    catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}));
router.get('/get/:expenseId', validateRefreshTokenMiddleware_1.validateRefreshTokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = { statusCode: 200, body: {} };
    try {
        const { expenseId } = req.params;
        const userId = req.userId;
        if (!userId)
            throw new Error("cannot proceed without userId");
        const expense = yield ExpenseService_1.ExpenseService.getExpenseById(userId, expenseId);
        if (expense) {
            response.body = { expense };
        }
        else {
            response.statusCode = 404;
            response.body = { error: 'Expense not found' };
        }
    }
    catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}));
router.get('/find', validateRefreshTokenMiddleware_1.validateRefreshTokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = { statusCode: 200, body: {} };
    try {
        const userId = req.userId;
        if (!userId)
            throw new Error("cannot proceed without userId");
        const query = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const expenses = yield ExpenseService_1.ExpenseService.findExpenses(userId, query, page, limit);
        response.body = { expenses };
    }
    catch (err) {
        console.error(err);
        response.statusCode = 500;
        response.body = { error: 'Internal server error' };
    }
    res.status(response.statusCode).json(response.body);
}));
//# sourceMappingURL=expensesRoutes.js.map
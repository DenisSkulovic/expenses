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
exports.ExpenseService = void 0;
const ExpenseRepository_1 = require("../repository/ExpenseRepository");
const shared_dtos_1 = require("shared-dtos");
class ExpenseService {
    static getExpenseForUserOrError(userId, expenseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = yield ExpenseRepository_1.ExpenseRepository.getExpenseById(expenseId);
            const expenseDTO = shared_dtos_1.ExpenseDTO.build(expense === null || expense === void 0 ? void 0 : expense.toJSON());
            if (expenseDTO.userId !== userId)
                throw new Error(`User ${userId} is not allowed to manipulate expense ${expenseId}`);
            return expense;
        });
    }
    static createExpense(userId, expenseData) {
        return __awaiter(this, void 0, void 0, function* () {
            return ExpenseRepository_1.ExpenseRepository.createExpense(Object.assign(Object.assign({}, expenseData), { userId }));
        });
    }
    static updateExpense(userId, expenseId, expenseData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ExpenseService.getExpenseForUserOrError(userId, expenseId);
            return ExpenseRepository_1.ExpenseRepository.updateExpense(expenseId, Object.assign(Object.assign({}, expenseData), { userId }));
        });
    }
    static deleteExpense(userId, expenseId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ExpenseService.getExpenseForUserOrError(userId, expenseId);
            return ExpenseRepository_1.ExpenseRepository.deleteExpense(expenseId);
        });
    }
    static getExpenseById(userId, expenseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = yield ExpenseService.getExpenseForUserOrError(userId, expenseId);
            return expense;
        });
    }
    static findExpenses(userId, query, page = 1, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return ExpenseRepository_1.ExpenseRepository.findExpenses(Object.assign(Object.assign({}, query), { userId }), page, limit);
        });
    }
}
exports.ExpenseService = ExpenseService;
//# sourceMappingURL=ExpenseService.js.map
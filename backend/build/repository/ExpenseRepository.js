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
exports.ExpenseRepository = void 0;
const Expense_1 = require("../db/model/Expense");
class ExpenseRepository {
    static createExpense(expenseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = new Expense_1.Expense(expenseData);
            const savedDocument = yield expense.save();
            return !!savedDocument;
        });
    }
    static updateExpense(expenseId, expenseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = yield Expense_1.Expense.findById(expenseId);
            if (!expense)
                throw new Error('Expense not found');
            Object.assign(expense, expenseData);
            yield expense.save();
        });
    }
    static deleteExpense(expenseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = yield Expense_1.Expense.findByIdAndDelete(expenseId);
            if (!expense)
                throw new Error('Expense not found');
        });
    }
    static getExpenseById(expenseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = yield Expense_1.Expense.findById(expenseId);
            if (!expense)
                throw new Error('Expense not found');
            return expense;
        });
    }
    static findExpenses(query, page = 1, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const expenses = yield Expense_1.Expense.find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .exec();
            return expenses;
        });
    }
}
exports.ExpenseRepository = ExpenseRepository;
//# sourceMappingURL=ExpenseRepository.js.map
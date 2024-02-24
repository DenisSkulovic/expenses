"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Expense_1 = require("../schema/Expense");
exports.Expense = mongoose_1.default.model('Expense', Expense_1.expenseSchema);
//# sourceMappingURL=Expense.js.map
import { ExpenseDTO } from "shared-dtos";
import { Expense } from "../db/model/Expense";
import mongoose from "mongoose";

export class ExpenseRepository {

    public static async createExpense(expenseData: ExpenseDTO): Promise<boolean> {
        const expense = new Expense(expenseData);
        const savedDocument = await expense.save();
        return !!savedDocument;
    }

    public static async updateExpense(expenseId: string, expenseData: ExpenseDTO): Promise<void> {
        const expense = await Expense.findById(expenseId);
        if (!expense) throw new Error('Expense not found');
        Object.assign(expense, expenseData);
        await expense.save();
    }

    public static async deleteExpense(expenseId: string): Promise<void> {
        const expense = await Expense.findByIdAndDelete(expenseId);
        if (!expense) throw new Error('Expense not found');
    }

    public static async getExpenseById(expenseId: string): Promise<mongoose.Document | null> {
        const expense = await Expense.findById(expenseId);
        if (!expense) throw new Error('Expense not found');
        return expense;
    }

    public static async findExpenses(query: Partial<ExpenseDTO>, page: number = 1, limit: number = 10): Promise<mongoose.Document[]> {
        const expenses: mongoose.Document[] = await Expense.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();
        return expenses;
    }
}
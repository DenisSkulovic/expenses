import mongoose from "mongoose";
import { ExpenseRepository } from "../repository/ExpenseRepository";
import { ExpenseDTO } from "shared-dtos";

export class ExpenseService {
    public static async getExpenseForUserOrError(userId: string, expenseId: string): Promise<mongoose.Document | null> {
        const expense = await ExpenseRepository.getExpenseById(expenseId);
        const expenseDTO: ExpenseDTO = ExpenseDTO.build(expense?.toJSON())
        if (expenseDTO.userId !== userId) throw new Error(`User ${userId} is not allowed to manipulate expense ${expenseId}`);
        return expense
    }

    public static async createExpense(userId: string, expenseData: ExpenseDTO): Promise<boolean> {
        return ExpenseRepository.createExpense({ ...expenseData, userId });
    }

    public static async updateExpense(userId: string, expenseId: string, expenseData: ExpenseDTO): Promise<void> {
        await ExpenseService.getExpenseForUserOrError(userId, expenseId)
        return ExpenseRepository.updateExpense(expenseId, { ...expenseData, userId });
    }

    public static async deleteExpense(userId: string, expenseId: string): Promise<void> {
        await ExpenseService.getExpenseForUserOrError(userId, expenseId)
        return ExpenseRepository.deleteExpense(expenseId);
    }

    public static async getExpenseById(userId: string, expenseId: string): Promise<mongoose.Document | null> {
        const expense = await ExpenseService.getExpenseForUserOrError(userId, expenseId)
        return expense
    }

    public static async findExpenses(userId: string, query: Partial<ExpenseDTO>, page: number = 1, limit: number = 10): Promise<mongoose.Document[]> {
        return ExpenseRepository.findExpenses({ ...query, userId }, page, limit);
    }
}
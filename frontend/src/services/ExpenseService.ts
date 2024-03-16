import axios from 'axios';
import { ExpenseDTO } from "shared-dtos";

export class ExpenseService {

    public static async createExpense(userId: string, expenseData: any): Promise<ExpenseDTO | null> {
        try {
            const response = await axios.post('/expenses/create', { userId, ...expenseData });
            return ExpenseDTO.build(response.data);
        } catch (error) {
            console.error("Error creating expense:", error);
            return null;
        }
    }

    public static async updateExpense(userId: string, expenseId: string, expenseData: any): Promise<ExpenseDTO | null> {
        try {
            const response = await axios.put(`/expenses/update/${expenseId}`, { userId, ...expenseData });
            return ExpenseDTO.build(response.data);
        } catch (error) {
            console.error("Error updating expense:", error);
            return null;
        }
    }

    public static async deleteExpense(userId: string, expenseId: string): Promise<boolean> {
        try {
            await axios.delete(`/expenses/delete/${expenseId}`, { data: { userId } });
            return true;
        } catch (error) {
            console.error("Error deleting expense:", error);
            return false;
        }
    }

    public static async getExpenseById(userId: string, expenseId: string): Promise<ExpenseDTO | undefined> {
        try {
            const response = await axios.get(`/expenses/get/${expenseId}`, { params: { userId } });
            return ExpenseDTO.build(response.data);
        } catch (error) {
            console.error("Error fetching expense by ID:", error);
            return undefined;
        }
    }

    public static async findExpenses(userId: string, query: any, page: number, limit: number): Promise<ExpenseDTO[] | undefined> {
        try {
            const response = await axios.get('/expenses/find', { params: { ...query, userId, page, limit } });
            return response.data.map((expense: any) => ExpenseDTO.build(expense));
        } catch (error) {
            console.error("Error finding expenses:", error);
            return undefined;
        }
    }

}
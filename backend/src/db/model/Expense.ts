import mongoose from "mongoose"
import { expenseSchema } from "../schema/Expense"

export const Expense = mongoose.model('Expense', expenseSchema);

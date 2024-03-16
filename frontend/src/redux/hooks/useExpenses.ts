import { useSelector } from 'react-redux';
import { addExpense, deleteExpense, updateExpense } from '../actions/expenseActions';
import { ExpenseDTO } from 'shared-dtos';
import { AppState } from '../reducers/rootReducer';

export const useExpenses = () => {

    const expenses = useSelector((state: AppState) => state.expenses.expenses);

    const addNewExpense = (expense: ExpenseDTO) => {
        addExpense(expense);
    };

    const updateExistingExpense = (expense: ExpenseDTO) => {
        updateExpense(expense)
    };

    const deleteExistingExpense = (expense: ExpenseDTO) => {
        deleteExpense(expense)
    };

    return {
        expenses,
        addNewExpense,
        updateExistingExpense,
        deleteExistingExpense,
    };
};
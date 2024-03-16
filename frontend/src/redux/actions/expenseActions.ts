import { ExpenseDTO } from 'shared-dtos';
import { ExpenseActionEnum } from './actionTypes';
import { ExpenseService } from '../../services/ExpenseService';
import { Dispatch } from 'redux';
import { AppState } from '../reducers/rootReducer';

export const addExpense = (expenseData: ExpenseDTO) => async (dispatch: Dispatch, getState: () => AppState) => {
    try {
        const userId = getState().auth.user?.id;
        if (!userId) throw new Error('userId cannot be undefined or null');
        const expense: ExpenseDTO | null = await ExpenseService.createExpense(userId, expenseData);
        if (expense) {
            dispatch({
                type: ExpenseActionEnum.ADD_EXPENSE,
                payload: { expense },
            });
        }
    } catch (error: any) {
        expenseError(error);
    }
};

export const updateExpense = (expenseData: ExpenseDTO) => async (dispatch: Dispatch, getState: () => AppState) => {
    try {
        const userId = getState().auth.user?.id;
        if (!userId) throw new Error('userId cannot be undefined or null');
        const expense: ExpenseDTO | null = await ExpenseService.updateExpense(userId, expenseData.id, expenseData);
        if (expense) {
            dispatch({
                type: ExpenseActionEnum.UPDATE_EXPENSE,
                payload: { expense },
            });
        }
    } catch (error: any) {
        expenseError(error);
    }
};

export const deleteExpense = (expenseData: ExpenseDTO) => async (dispatch: Dispatch, getState: () => AppState) => {
    try {
        const userId = getState().auth.user?.id;
        if (!userId) throw new Error('userId cannot be undefined or null');

        const success: boolean = await ExpenseService.deleteExpense(userId, expenseData.id);
        if (success) {
            dispatch({
                type: ExpenseActionEnum.DELETE_EXPENSE,
                payload: { id: expenseData.id },
            });
        }
    } catch (error: any) {
        expenseError(error);
    }
};

export const expenseError = (error: Error) => (dispatch: Dispatch) => {
    dispatch({
        type: ExpenseActionEnum.EXPENSE_ERROR,
        payload: { error },
    });
};
import { combineReducers } from 'redux';
import authReducer, { AuthState } from './authReducer';
import expenseReducer, { ExpenseState } from './expenseReducer';

export interface AppState {
    auth: AuthState;
    expenses: ExpenseState;
}

const rootReducer = combineReducers({
    auth: authReducer,
    expenses: expenseReducer,
});

export default rootReducer;
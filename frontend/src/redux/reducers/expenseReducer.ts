import { ExpenseDTO } from "shared-dtos";
import { ExpenseActionEnum } from "../actions/actionTypes";

export class ExpenseState {
    constructor(
        public expenses: ExpenseDTO[],
        public error: string | null
    ) { }
}

export type ExpenseReducer = (state: ExpenseState | undefined, action: {
    type: ExpenseActionEnum;
    payload?: any;
}) => ExpenseState

const initialState = new ExpenseState([], null)

const expenseReducer: ExpenseReducer = (
    state = initialState,
    action: { type: ExpenseActionEnum; payload?: any },
): ExpenseState => {
    switch (action.type) {

        case (ExpenseActionEnum.ADD_EXPENSE): {
            const newExpense: ExpenseDTO = ExpenseDTO.build(action.payload.expense)
            const newState: ExpenseState = {
                ...state,
                expenses: [...state.expenses, newExpense],
            }
            return newState;
        }

        case (ExpenseActionEnum.UPDATE_EXPENSE): {
            const expenses: ExpenseDTO[] = state.expenses.map((expense: ExpenseDTO) => {
                if (expense.id === action.payload.expense.id) {
                    return ExpenseDTO.build(action.payload.expense)
                }
                return expense
            });
            const newState: ExpenseState = {
                ...state,
                expenses,
            };
            return newState;
        }

        case (ExpenseActionEnum.DELETE_EXPENSE): {
            const expenses: ExpenseDTO[] = state.expenses.filter((expense: ExpenseDTO) => {
                const deletedExpense: ExpenseDTO = ExpenseDTO.build(action.payload.expense)
                return expense.id !== deletedExpense.id
            })
            const newState: ExpenseState = {
                ...state,
                expenses,
            };
            return newState;
        }

        case (ExpenseActionEnum.EXPENSE_ERROR): {
            return {
                ...state,
                error: action.payload.error,
            };
        }

        default:
            return state;
    }
};

export default expenseReducer;
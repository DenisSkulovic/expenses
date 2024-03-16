import { UserDTO } from "shared-dtos";
import { AuthActionEnum } from "../actions/actionTypes";

export class AuthState {
    constructor(
        public isAuthenticated: boolean,
        public user: UserDTO | null,
        public error: string | null,
    ) { }
}

export type AuthReducer = (
    state: AuthState,
    action: { type: AuthActionEnum; payload?: any }
) => AuthState

const initialState = new AuthState(false, null, null)

const authReducer: AuthReducer = (
    state: AuthState = initialState,
    action: { type: AuthActionEnum; payload?: any }
): AuthState => {
    switch (action.type) {
        case (AuthActionEnum.LOGIN_SUCCESS): {
            const user: UserDTO = UserDTO.build(action.payload.user)
            const newState: AuthState = {
                ...state,
                isAuthenticated: true,
                user,
                error: null,
            }
            return newState;
        }
        case (AuthActionEnum.LOGOUT): {
            const newState: AuthState = {
                ...state,
                isAuthenticated: false,
                user: null,
            };
            return newState
        }
        case (AuthActionEnum.AUTH_ERROR): {
            const error: Error | null = action.payload.error
            if (!error) throw new Error(`auth error occured, but no error object was received`)
            const newState: AuthState = {
                ...state,
                error: action.payload.error,
            }
            return newState;
        }
        default:
            return state;
    }
};

export default authReducer;
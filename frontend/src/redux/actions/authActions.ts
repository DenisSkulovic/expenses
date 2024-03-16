import { AuthActionEnum } from './actionTypes';
import { AuthService } from '../../services/AuthService';
import { LoginDTO, RegisterDTO } from 'shared-dtos';
import { Dispatch } from 'redux';

export const login = (credentials: LoginDTO) => async (dispatch: Dispatch) => {
    try {
        const data = await AuthService.login(credentials);
        dispatch({ type: AuthActionEnum.LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: AuthActionEnum.AUTH_ERROR, payload: error });
    }
};

export const logout = () => async (dispatch: Dispatch) => {
    try {
        await AuthService.logout();
        dispatch({ type: AuthActionEnum.LOGOUT });
    } catch (error) {
        dispatch({ type: AuthActionEnum.AUTH_ERROR, payload: error });
    }
};

export const register = (credentials: RegisterDTO) => async (dispatch: Dispatch) => {
    try {
        const data = await AuthService.register(credentials);
        dispatch({ type: AuthActionEnum.REGISTER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: AuthActionEnum.REGISTER_ERROR, payload: error });
    }
};

export const authError = (error: Error) => (dispatch: Dispatch) => {
    dispatch({ type: AuthActionEnum.AUTH_ERROR, payload: { error } });
};
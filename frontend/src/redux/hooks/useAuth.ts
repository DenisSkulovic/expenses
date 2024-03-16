import { useDispatch, useSelector } from 'react-redux';
import { login, logout, register } from '../actions/authActions';
import { AppState } from '../reducers/rootReducer';
import { LoginDTO, RegisterDTO } from 'shared-dtos';

export const useAuth = () => {
    const authState = useSelector((state: AppState) => state.auth);

    const loginUser = (credentials: LoginDTO) => {
        login(credentials);
    };

    const logoutUser = () => {
        logout();
    };

    const registerUser = (credentials: RegisterDTO) => {
        register(credentials);
    };

    return {
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        loginUser,
        logoutUser,
        registerUser,
    };
};
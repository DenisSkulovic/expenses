import axios from 'axios';
import { LoginDTO, RegisterDTO, UserDTO } from "shared-dtos";

export class AuthService {

    public static async login(credentials: LoginDTO): Promise<{ accessToken: string, refreshToken: string }> {
        const response = await axios.post(
            '/api/auth/login',
            credentials,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        return response.data;
    }

    public static async register(credentials: RegisterDTO): Promise<{ message: string }> {
        const response = await axios.post(
            '/api/auth/register',
            credentials,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        return response.data;
    }

    public static async editUser(userId: string, userDetails: Partial<UserDTO>): Promise<UserDTO> {
        const response = await axios.put(
            `/api/users/${userId}`,
            userDetails,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        return UserDTO.build(response.data);
    }

    public static async logout(): Promise<void> {
        await axios.post('/api/auth/logout');
    }

}

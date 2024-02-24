import { UserDTO } from "shared-dtos";
import { User } from "../db/model/User";
import mongoose from "mongoose";


export class UserRepository {

    public static async createUser(userDto: UserDTO): Promise<boolean> {
        const user = new User({
            username: userDto.username,
            password: userDto.password,
        });
        const savedDocument = await user.save();
        if (savedDocument) return true;
        return false;
    }

    public static async updateUser(userId: string, userDto: UserDTO): Promise<void> {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');
        user.username = userDto.username;
        await user.save();
    }

    public static async deleteUser(userId: string) {
        const user = await User.findByIdAndDelete(userId);
        if (!user) throw new Error('User not found');
    }

    public static async getUserById(userId: string): Promise<mongoose.Document | null | undefined> {
        const user = await User.findById(userId, '-password');
        if (!user) throw new Error('User not found');
        return user;
    }

    public static async findUser(query: Partial<UserDTO>): Promise<mongoose.Document | null | undefined> {
        const user: mongoose.Document | null | undefined = await User.findOne(query);
        return user;
    }

    public static async findUsers(query: Partial<UserDTO>, page: number = 1, limit: number = 10): Promise<mongoose.Document[]> {
        const users: mongoose.Document[] = await User.find(query, '-password')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();
        return users;
    }

    public static async changeUserPassword(userId: string, newPassword: string): Promise<void> {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        user.password = newPassword;

        await user.save();
    }
}
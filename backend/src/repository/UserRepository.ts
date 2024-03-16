import { UserDTO } from "shared-dtos";
import { User } from "../db/model/User";
import mongoose, { Mongoose } from "mongoose";


export class UserRepository {

    public static async createUser(userDto: UserDTO): Promise<boolean> {
        const user = new User({
            email: userDto.email,
            username: userDto.username,
            password: userDto.password, // Assuming password handling is done elsewhere as it's not part of UserDTO but required in User schema
            address: userDto.address,
            phone: userDto.phone,
            firstName: userDto.firstName,
            lastName: userDto.lastName,
            dateOfBirth: userDto.dateOfBirth,
            profilePictureUrl: userDto.profilePictureUrl,
            bio: userDto.bio,
            joinDate: userDto.joinDate,
        });
        const savedDocument = await user.save();
        if (savedDocument) return true;
        return false;
    }

    public static async updateUser(userId: string, userDto: UserDTO): Promise<void> {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');
        user.email = userDto.email;
        user.username = userDto.username;
        user.address = userDto.address;
        user.phone = userDto.phone;
        user.firstName = userDto.firstName;
        user.lastName = userDto.lastName;
        user.dateOfBirth = userDto.dateOfBirth;
        user.profilePictureUrl = userDto.profilePictureUrl;
        user.bio = userDto.bio;
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

    public static async findUser(query: Partial<UserDTO>): Promise<UserDTO | null | undefined> {
        const user: mongoose.Document | null | undefined = await User.findOne(query);
        return user ? UserDTO.build(user.toJSON()) : null;
    }

    public static async findUsers(query: Partial<UserDTO>, page: number = 1, limit: number = 10): Promise<UserDTO[]> {
        const users: mongoose.Document[] = await User.find(query, '-password')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();
        return users.map((userDocument) => UserDTO.build(userDocument.toJSON()))
    }

    public static async changeUserPassword(user: UserDTO, newPassword: string): Promise<void> {
        const userDocument = await User.findById(user._id);
        if (!userDocument) throw new Error('User not found');

        user.password = newPassword;

        await userDocument.save();
    }

    public static async linkSettingsToUser(user: UserDTO, settingsId: string): Promise<void> {
        const userDocument = await User.findById(user._id);
        if (!userDocument) throw new Error('User not found');

        userDocument.settings = new mongoose.Types.ObjectId(settingsId);

        await userDocument.save();
    }
}
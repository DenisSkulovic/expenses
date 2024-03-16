export declare class UserDTO {
    _id: string;
    email: string;
    password: string;
    username: string;
    address: string;
    phone: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    profilePictureUrl: string;
    bio: string;
    joinDate: Date;
    settings?: string | undefined;
    constructor(_id: string, email: string, password: string, username: string, address: string, phone: string, firstName: string, lastName: string, dateOfBirth: Date, profilePictureUrl: string, bio: string, joinDate: Date, settings?: string | undefined);
    private static validate;
    static build(obj: any): UserDTO;
}

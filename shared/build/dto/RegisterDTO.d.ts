export declare class RegisterDTO {
    email: string;
    password1: string;
    password2: string;
    username: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    address: string;
    phone: string;
    profilePictureUrl: string;
    bio: string;
    constructor(email: string, password1: string, password2: string, username: string, firstName: string, lastName: string, dateOfBirth: Date, address?: string, phone?: string, profilePictureUrl?: string, bio?: string);
    private static validate;
    static build(data: Partial<RegisterDTO>): RegisterDTO;
    static getEmpty(): RegisterDTO;
}

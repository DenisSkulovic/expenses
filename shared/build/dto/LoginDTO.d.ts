export declare class LoginDTO {
    email: string;
    password: string;
    constructor(email: string, password: string);
    private static validate;
    static build(data: Partial<LoginDTO>): LoginDTO;
}

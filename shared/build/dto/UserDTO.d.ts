export declare class UserDTO {
    id: string;
    username: string;
    password: string;
    constructor(id: string, username: string, password: string);
    static build(obj: any): UserDTO;
}

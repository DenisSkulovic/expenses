export declare class RefreshTokenDTO {
    userId: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    isValid: boolean;
    constructor(userId: string, token: string, expiresAt: Date, createdAt: Date, isValid: boolean);
    private static validate;
    static build(obj: any): RefreshTokenDTO;
}

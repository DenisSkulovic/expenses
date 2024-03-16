export class RefreshTokenDTO {
    constructor(
        public userId: string,
        public token: string,
        public expiresAt: Date,
        public createdAt: Date,
        public isValid: boolean,
    ) { }

    private static validate(obj: any): void {
        if (!obj.userId) throw new Error("RefreshTokenDTO validation error: 'userId' is required");
        if (!obj.token) throw new Error("RefreshTokenDTO validation error: 'token' is required");
        if (!obj.expiresAt || isNaN(Date.parse(obj.expiresAt))) throw new Error("RefreshTokenDTO validation error: 'expiresAt' is not a valid date");
        if (!obj.createdAt || isNaN(Date.parse(obj.createdAt))) throw new Error("RefreshTokenDTO validation error: 'createdAt' is not a valid date");
        if (typeof obj.isValid !== 'boolean') throw new Error("RefreshTokenDTO validation error: 'isValid' must be a boolean");
    }

    public static build(obj: any): RefreshTokenDTO {
        RefreshTokenDTO.validate(obj);
        return new RefreshTokenDTO(
            obj.userId,
            obj.token,
            new Date(obj.expiresAt),
            new Date(obj.createdAt),
            obj.isValid,
        );
    }
}

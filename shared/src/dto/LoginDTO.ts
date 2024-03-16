export class LoginDTO {
    constructor(
        public email: string,
        public password: string
    ) { }

    private static validate(data: any): void {
        if (!data.email) throw new Error("LoginDTO validation error: 'email' is required");
        if (!data.password) throw new Error("LoginDTO validation error: 'password' is required");
    }

    public static build(data: Partial<LoginDTO>): LoginDTO {
        LoginDTO.validate(data);
        return new LoginDTO(
            data.email || "",
            data.password || ""
        );
    }
}

export class RegisterDTO {
    constructor(
        public email: string,
        public password1: string,
        public password2: string,
        public username: string,
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public address: string = '',
        public phone: string = '',
        public profilePictureUrl: string = '',
        public bio: string = ''
    ) { }

    private static validate(data: any): void {
        if (!data.email) throw new Error("RegisterDTO validation error: 'email' is required");
        if (!data.password1) throw new Error("RegisterDTO validation error: 'password1' is required");
        if (!data.password2) throw new Error("RegisterDTO validation error: 'password2' is required");
        if (!data.username) throw new Error("RegisterDTO validation error: 'username' is required");
        if (!data.firstName) throw new Error("RegisterDTO validation error: 'firstName' is required");
        if (!data.lastName) throw new Error("RegisterDTO validation error: 'lastName' is required");
        if (!data.dateOfBirth || isNaN(Date.parse(data.dateOfBirth))) throw new Error("RegisterDTO validation error: 'dateOfBirth' is not a valid date");
    }

    public static build(data: Partial<RegisterDTO>): RegisterDTO {
        RegisterDTO.validate(data);
        return new RegisterDTO(
            data.email || "",
            data.password1 || "",
            data.password2 || "",
            data.username || "",
            data.firstName || "",
            data.lastName || "",
            data.dateOfBirth || new Date(),
            data.address || "",
            data.phone || "",
            data.profilePictureUrl || "",
            data.bio || ""
        );
    }

    public static getEmpty() {
        return new RegisterDTO("", "", "", "", "", "", new Date(), "", "", "", "");
    }
}

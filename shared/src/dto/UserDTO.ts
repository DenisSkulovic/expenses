export class UserDTO {
    constructor(
        public _id: string,
        public email: string,
        public password: string,
        public username: string,
        public address: string,
        public phone: string,
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public profilePictureUrl: string,
        public bio: string,
        public joinDate: Date,
        public settings?: string,
    ) { }

    private static validate(obj: any): void {
        if (!obj._id) throw new Error("UserDTO validation error: '_id' is required");
        if (!obj.email) throw new Error("UserDTO validation error: 'email' is required");
        if (!obj.username) throw new Error("UserDTO validation error: 'username' is required");
        if (!obj.firstName) throw new Error("UserDTO validation error: 'firstName' is required");
        if (!obj.lastName) throw new Error("UserDTO validation error: 'lastName' is required");
        if (!obj.dateOfBirth || isNaN(Date.parse(obj.dateOfBirth))) throw new Error("UserDTO validation error: 'dateOfBirth' is not a valid date");
        if (obj.joinDate && isNaN(Date.parse(obj.joinDate))) throw new Error("UserDTO validation error: 'joinDate' is not a valid date");
    }

    public static build(obj: any): UserDTO {
        UserDTO.validate(obj);
        return new UserDTO(
            obj._id,
            obj.email,
            obj.password,
            obj.username,
            obj.address || '',
            obj.phone || '',
            obj.firstName,
            obj.lastName,
            new Date(obj.dateOfBirth),
            obj.profilePictureUrl || '',
            obj.bio || '',
            obj.joinDate ? new Date(obj.joinDate) : new Date(),
            obj.settings,
        );
    }
}
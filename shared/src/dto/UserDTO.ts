export class UserDTO {
    constructor(
        public id: string,
        public username: string,
        public password: string,
    ) { }

    public static build(obj: any): UserDTO {
        return new UserDTO(obj.id, obj.username, obj.password);
    }
}
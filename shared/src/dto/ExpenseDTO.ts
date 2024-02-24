export class ExpenseDTO {
    constructor(
        public userId: string,
        public category: string,
        public amount: number,
        public description?: string,
        public date?: Date
    ) { }

    public static build(obj: any): ExpenseDTO {
        return new ExpenseDTO(
            obj.userId,
            obj.category,
            obj.amount,
            obj.description,
            obj.date ? new Date(obj.date) : undefined
        );
    }
}

export class ExpenseDTO {
    constructor(
        public _id: string,
        public userId: string,
        public category: string,
        public amount: number,
        public description?: string,
        public date?: Date
    ) { }

    private static validate(obj: any): void {
        if (!obj._id) throw new Error("ExpenseDTO validation error: '_id' is required");
        if (!obj.userId) throw new Error("ExpenseDTO validation error: 'userId' is required");
        if (!obj.category) throw new Error("ExpenseDTO validation error: 'category' is required");
        if (typeof obj.amount !== 'number') throw new Error("ExpenseDTO validation error: 'amount' must be a number");
        if (obj.description && typeof obj.description !== 'string') throw new Error("ExpenseDTO validation error: 'description' must be a string");
        if (obj.date && isNaN(Date.parse(obj.date))) throw new Error("ExpenseDTO validation error: 'date' is not a valid date");
    }

    public static build(obj: any): ExpenseDTO {
        ExpenseDTO.validate(obj);
        return new ExpenseDTO(
            obj._id,
            obj.userId,
            obj.category,
            obj.amount,
            obj.description,
            obj.date ? new Date(obj.date) : undefined
        );
    }
}
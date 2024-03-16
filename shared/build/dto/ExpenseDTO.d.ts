export declare class ExpenseDTO {
    _id: string;
    userId: string;
    category: string;
    amount: number;
    description?: string | undefined;
    date?: Date | undefined;
    constructor(_id: string, userId: string, category: string, amount: number, description?: string | undefined, date?: Date | undefined);
    private static validate;
    static build(obj: any): ExpenseDTO;
}

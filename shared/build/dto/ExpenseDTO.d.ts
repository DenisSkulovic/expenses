export declare class ExpenseDTO {
    userId: string;
    category: string;
    amount: number;
    description?: string | undefined;
    date?: Date | undefined;
    constructor(userId: string, category: string, amount: number, description?: string | undefined, date?: Date | undefined);
    static build(obj: any): ExpenseDTO;
}

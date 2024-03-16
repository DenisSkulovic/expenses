"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseDTO = void 0;
var ExpenseDTO = /** @class */ (function () {
    function ExpenseDTO(_id, userId, category, amount, description, date) {
        this._id = _id;
        this.userId = userId;
        this.category = category;
        this.amount = amount;
        this.description = description;
        this.date = date;
    }
    ExpenseDTO.validate = function (obj) {
        if (!obj._id)
            throw new Error("ExpenseDTO validation error: '_id' is required");
        if (!obj.userId)
            throw new Error("ExpenseDTO validation error: 'userId' is required");
        if (!obj.category)
            throw new Error("ExpenseDTO validation error: 'category' is required");
        if (typeof obj.amount !== 'number')
            throw new Error("ExpenseDTO validation error: 'amount' must be a number");
        if (obj.description && typeof obj.description !== 'string')
            throw new Error("ExpenseDTO validation error: 'description' must be a string");
        if (obj.date && isNaN(Date.parse(obj.date)))
            throw new Error("ExpenseDTO validation error: 'date' is not a valid date");
    };
    ExpenseDTO.build = function (obj) {
        ExpenseDTO.validate(obj);
        return new ExpenseDTO(obj._id, obj.userId, obj.category, obj.amount, obj.description, obj.date ? new Date(obj.date) : undefined);
    };
    return ExpenseDTO;
}());
exports.ExpenseDTO = ExpenseDTO;

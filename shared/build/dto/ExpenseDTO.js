"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseDTO = void 0;
var ExpenseDTO = /** @class */ (function () {
    function ExpenseDTO(userId, category, amount, description, date) {
        this.userId = userId;
        this.category = category;
        this.amount = amount;
        this.description = description;
        this.date = date;
    }
    ExpenseDTO.build = function (obj) {
        return new ExpenseDTO(obj.userId, obj.category, obj.amount, obj.description, obj.date ? new Date(obj.date) : undefined);
    };
    return ExpenseDTO;
}());
exports.ExpenseDTO = ExpenseDTO;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../db/model/User");
class UserRepository {
    static createUser(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User({
                username: userDto.username,
                password: userDto.password,
            });
            const savedDocument = yield user.save();
            if (savedDocument)
                return true;
            return false;
        });
    }
    static updateUser(userId, userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findById(userId);
            if (!user)
                throw new Error('User not found');
            user.username = userDto.username;
            yield user.save();
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findByIdAndDelete(userId);
            if (!user)
                throw new Error('User not found');
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findById(userId, '-password');
            if (!user)
                throw new Error('User not found');
            return user;
        });
    }
    static findUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(query);
            return user;
        });
    }
    static findUsers(query, page = 1, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.User.find(query, '-password')
                .limit(limit)
                .skip((page - 1) * limit)
                .exec();
            return users;
        });
    }
    static changeUserPassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findById(userId);
            if (!user)
                throw new Error('User not found');
            user.password = newPassword;
            yield user.save();
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map
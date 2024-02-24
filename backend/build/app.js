"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_jwt_1 = require("express-jwt");
const getEnvParam_1 = require("./utils/getEnvParam");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const authRoutes_2 = __importDefault(require("./routes/authRoutes"));
const port = (0, getEnvParam_1.getEnvParam)('PORT', false) || 5000;
const jwtSecret = (0, getEnvParam_1.getEnvParam)('JWT_SECRET', true);
// create express app
const app = (0, express_1.default)();
// middleware to protect routes
const auth = (0, express_jwt_1.expressjwt)({ secret: jwtSecret, algorithms: ['HS256'] });
// use
app.use(auth);
app.use(express_1.default.json());
// routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/expenses", authRoutes_2.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=app.js.map
import express from 'express';
import { expressjwt } from 'express-jwt';
import { getEnvParam } from './utils/getEnvParam';
import authRoutes from './routes/authRoutes';
import expensesRoutes from './routes/authRoutes';
import settingsRoutes from './routes/settingsRoutes';

const port = getEnvParam('PORT', false) || 5000;
const jwtSecret: string = getEnvParam('JWT_SECRET', true);


// create express app
const app = express();

// middleware to protect routes
const auth = expressjwt({ secret: jwtSecret, algorithms: ['HS256'] });


// use
app.use(auth)
app.use(express.json());

// routes
app.use("/api/auth", authRoutes)
app.use("/api/expenses", expensesRoutes)
app.use("/api/settings", settingsRoutes)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
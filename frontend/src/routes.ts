import Dashboard from './pages/Dashboard';
import ExpensesList from './pages/ExpensesList';
import AddEditExpense from './pages/AddEditExpense';
import CategoriesManager from './pages/CategoriesManager';
import ProfileSettings from './pages/ProfileSettings';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';

interface Route {
    path: string;
    component: React.ComponentType<any>;
    exact?: boolean;
}

const routes: Route[] = [
    { path: '/dashboard', component: Dashboard, exact: true },
    { path: '/expenses', component: ExpensesList },
    { path: '/add-expense', component: AddEditExpense },
    { path: '/edit-expense/:id', component: AddEditExpense },
    { path: '/categories', component: CategoriesManager },
    { path: '/settings', component: ProfileSettings },
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
];

export default routes;
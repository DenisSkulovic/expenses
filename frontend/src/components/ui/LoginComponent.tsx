import React, { useState } from 'react';
import { useAuth } from '../../redux/hooks/useAuth';
import { LoginDTO } from 'shared-dtos';

const LoginComponent = () => {
    const { loginUser } = useAuth();
    const [credentials, setCredentials] = useState(new LoginDTO("", ""));

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser(credentials);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
    };

    return (
        <form onSubmit={handleLogin} className="container mt-3">
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input type="text" id="username" name="username" className="form-control" value={credentials.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input type="password" id="password" name="password" className="form-control" value={credentials.password} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Log In</button>
        </form>
    );
};

export default LoginComponent;

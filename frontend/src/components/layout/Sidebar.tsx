import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: "280px" }}>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/dashboard" className="nav-link active" aria-current="page">Dashboard</Link>
                </li>
                <li>
                    <Link to="/expenses" className="nav-link">Expenses List</Link>
                </li>
                <li>
                    <Link to="/categories" className="nav-link">Categories Management</Link>
                </li>
                <li>
                    <Link to="/profile" className="nav-link">Profile/Settings</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;

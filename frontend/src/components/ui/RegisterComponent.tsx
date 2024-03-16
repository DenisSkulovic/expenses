import { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../../redux/hooks/useAuth";
import { RegisterDTO } from "shared-dtos";

function RegisterComponent() {
    const { registerUser } = useAuth();
    const [credentials, setCredentials] = useState(RegisterDTO.getEmpty());

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newCredentials: RegisterDTO = { ...credentials, [name]: value }
        setCredentials(newCredentials);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        registerUser(credentials);
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <div className="row">
                <div className="col-md-6">
                    <input type="text" id="username" name="username" className="form-control mb-2" placeholder="Username" value={credentials.username} onChange={handleChange} />
                    <input type="email" id="email" name="email" className="form-control mb-2" placeholder="Email" value={credentials.email} onChange={handleChange} />
                    <input type="password" id="password1" name="password1" className="form-control mb-2" placeholder="Password" value={credentials.password1} onChange={handleChange} />
                    <input type="password" id="password2" name="password2" className="form-control mb-2" placeholder="Confirm Password" value={credentials.password2} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" id="firstName" name="firstName" className="form-control mb-2" placeholder="First Name" value={credentials.firstName} onChange={handleChange} />
                    <input type="text" id="lastName" name="lastName" className="form-control mb-2" placeholder="Last Name" value={credentials.lastName} onChange={handleChange} />
                    <input type="date" id="dateOfBirth" name="dateOfBirth" className="form-control mb-2" value={credentials.dateOfBirth.toISOString().split('T')[0]} onChange={handleChange} />
                    <input type="text" id="address" name="address" className="form-control mb-2" placeholder="Address" value={credentials.address} onChange={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <input type="text" id="phone" name="phone" className="form-control mb-2" placeholder="Phone" value={credentials.phone} onChange={handleChange} />
                    <input type="text" id="profilePictureUrl" name="profilePictureUrl" className="form-control mb-2" placeholder="Profile Picture URL" value={credentials.profilePictureUrl} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" id="bio" name="bio" className="form-control mb-2" placeholder="Bio" value={credentials.bio} onChange={handleChange} />
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Register</button>
        </form>
    )
}
export default RegisterComponent
import { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../api";

export default function Register() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        try {
            await register(name, password, role);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Username may already be taken.');
        }
    }

    return (
                <div className="create-form-wrapper" style={{ flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div className="create-form-card">
                <h2 style={{ marginBottom: '1.5rem', color: '#f5c518' }}>Register</h2>
                {error && <p className="error" style={{ marginBottom: '1rem' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Choose a username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Choose a password"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

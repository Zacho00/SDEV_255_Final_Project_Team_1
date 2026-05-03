import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../api';

export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        try {
            await login(name, password);
            navigate('/viewcourses');
        } catch (err) {
            setError('Invalid username or password');
        }
    }

    return (
        <div className="create-form-wrapper" style={{ flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div className="create-form-card">
                <h2 style={{ marginBottom: '1.5rem', color: '#f5c518' }}>Login</h2>
                {error && <p className="error" style={{ marginBottom: '1rem' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your username"
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
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>

            <div className="create-form-card" style={{ opacity: 0.75 }}>
                <h3 style={{ marginBottom: '1rem', color: '#f5c518', fontSize: '0.95rem', letterSpacing: '0.05em' }}>
                    DEMO CREDENTIALS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                        <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.25rem' }}>TEACHER</p>
                        <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Username: <span style={{ color: '#f0f0f0' }}>testteacher</span></p>
                        <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Password: <span style={{ color: '#f0f0f0' }}>password1</span></p>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem' }}>
                        <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.25rem' }}>STUDENT</p>
                        <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Username: <span style={{ color: '#f0f0f0' }}>teststudent</span></p>
                        <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Password: <span style={{ color: '#f0f0f0' }}>password2</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
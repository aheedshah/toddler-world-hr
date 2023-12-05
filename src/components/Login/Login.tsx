import React, {FormEvent, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss'
import { BASE_URL } from '../../apiConfig';

const Login: React.FC = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    const [error, setError] = useState<String>('');

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            navigate(data.redirectUrl);
        } else {
            setError('Wrong Email/Password')
        }
    };

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin}>
                <img src="/images/logo.webp" alt="Toddler World Logo" /> <br />
                <input type="email"
                       placeholder='Email'
                       onChange={(e) => setUsername(e.target.value)}
                       required
                /> <br />
                <input type="password"
                       placeholder='Password'
                       onChange={(e) => setPassword(e.target.value)}
                       required
                /> <br />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;

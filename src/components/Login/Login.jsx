import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss'

const Login = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Authentication successful:', data.message);
            navigate(data.redirectUrl);
        } else {
            const errorData = await response.json();
            console.error('Authentication failed:', errorData.message);
            setError('Wrong Email/Password')
        }
    };

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin}>
                <img src="/images/logo.webp" alt="Toddler World Logo" /> <br />
                <input type="email"
                       placeholder='Email'
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       required
                /> <br />
                <input type="password"
                       placeholder='Password'
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                /> <br />
                <button type="submit">Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;

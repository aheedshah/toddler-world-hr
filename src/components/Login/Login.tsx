import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { BASE_URL } from "../../apiConfig";

const Login: React.FC = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();

		const response = await fetch(`${BASE_URL}/authenticate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			const redirect: string = response.headers.get("redirectUrl") ?? "/dashboard";
			navigate(redirect);
		} else {
			setError("Wrong Email/Password");
		}
	};

	return (
		<div className='login-container'>
			<form onSubmit={handleLogin}>
				<img src='/images/logo.webp' alt='Toddler World Logo' /> <br />
				<input type='email' placeholder='Email' onChange={(e) => setUsername(e.target.value)} required />{" "}
				<br />
				<input
					type='password'
					placeholder='Password'
					onChange={(e) => setPassword(e.target.value)}
					required
				/>{" "}
				<br />
				<button type='submit'>Login</button>
				{error && <p>{error}</p>}
			</form>
		</div>
	);
};

export default Login;

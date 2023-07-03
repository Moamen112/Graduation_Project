import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import bg from "../images/b2.jpg";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		console.log("Email:", email);
		console.log("Password:", password);

		setEmail("");
		setPassword("");
	};

	return (
		<BackgroundContainer>
			<LoginContainer>
				<Form onSubmit={handleSubmit}>
					<Title>Login</Title>

					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						value={email}
						onChange={handleEmailChange}
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						value={password}
						onChange={handlePasswordChange}
						autoComplete="current-password"
					/>

					<Button type="submit">Log In</Button>
				</Form>
			</LoginContainer>
		</BackgroundContainer>
	);
}

export default Login;

const BackgroundContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-image: url(${bg});
	background-size: cover;
	background-position: center;
	height: 100vh;
`;

const LoginContainer = styled.div`
	width: max-content;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h2`
	margin-bottom: 1.5rem;
	color: #053344;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 300px;
	padding: 3rem;
	background-color: rgba(205, 222, 228, 0.8);
	backdrop-filter: blur(5px);
	border-radius: 10px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
`;

const Button = styled.button`
	padding: 1rem 2rem;
	width: 100%;
	background-color: #053344;
	color: #fff;
	border: none;
	border-radius: 5px;
	margin-top: 25px;
	cursor: pointer;
	font-size: 1rem;
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: #0369a1;
	}
`;

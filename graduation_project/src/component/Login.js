import React, { useState } from "react";
import styled from "styled-components";
import bg from "../images/b.jpg";

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
				<Title>Login</Title>
				<Form onSubmit={handleSubmit}>
					<Input
						type="text"
						name="email"
						placeholder="Email"
						value={email}
						onChange={handleEmailChange}
					/>
					<Input
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={handlePasswordChange}
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
	overflow: hidden;
`;

const LoginContainer = styled.div`
	width: max-content;
	padding: 0 3rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: rgba(255, 255, 255, 0.8);
`;

const Title = styled.h2`
	margin-bottom: 1.5rem;
	color: #333;
	// font-size: ;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Input = styled.input`
	padding: 1rem;
	margin-bottom: 1.5rem;
	width: 300px;
	font-size: 1rem;
	border: none;
	border-radius: 5px;
	background-color: #f9f9f9;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: box-shadow 0.2s ease-in-out;

	&:focus {
		outline: none;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
`;

const Button = styled.button`
	padding: 0.75rem 2rem;
	width: 100%;
	background-color: #053344;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 1rem;
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: #0369a1;
	}
`;

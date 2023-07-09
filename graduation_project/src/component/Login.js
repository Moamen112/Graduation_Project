import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import bg from "../images/b2.jpg";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "../Context/authProvider";
import { toast } from "react-toastify";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { auth, setAuth, handleLogin } = useContext(AuthContext);
	const currentPath = window.location.pathname.split("/");
	const navigate = useNavigate();

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (currentPath[currentPath.length - 1] === "staff") {
			axios
				.post("https://localhost:7097/api/auth/professors-login", {
					email: email,
					password: password,
				})
				.then((response) => {
					const role = response.data.role;
					const token = response.data.token;
					const userId = response.data.userId;
					handleLogin({ role, token, userId });
					Cookies.set("userId", response.data.userId);
					Cookies.set("universityId", response.data.universityId);
					Cookies.set("facultyId", response.data.facultyId);
					Cookies.set("departmentId", response.data.departmentId);
					Cookies.set("email", response.data.email);
					Cookies.set("role", response.data.role);
					Cookies.set("token", response.data.token);
					Cookies.set(
						"isAuthenticated",
						response.data.isAuthenticated,
					);

					if (Cookies.get("isAuthenticated") === "true") {
						if (Cookies.get("role") === "Professor") {
							navigate("/professor");
						}
					}
				})
				.catch((error) => {
					toast.error(error.response.data.Message);
				});
		} else if (currentPath[currentPath.length - 1] === "student") {
			axios
				.post("https://localhost:7097/api/auth/students-login", {
					email: email,
					password: password,
				})
				.then((response) => {
					const role = response.data.role;
					const token = response.data.token;
					const userId = response.data.userId;
					handleLogin(role, token, userId);
					console.log(auth);
					Cookies.set("userId", response.data.userId);
					Cookies.set("universityId", response.data.universityId);
					Cookies.set("facultyId", response.data.facultyId);
					Cookies.set("departmentId", response.data.departmentId);
					Cookies.set("email", response.data.email);
					Cookies.set("role", response.data.role);
					Cookies.set("token", response.data.token);
					Cookies.set(
						"isAuthenticated",
						response.data.isAuthenticated,
					);
					if (auth.role !== [] && auth.id !== "") {
						if (Cookies.get("isAuthenticated") === "true") {
							if (Cookies.get("role") === "Student") {
								navigate("/student");
							}
						}
					}
				})
				.catch((error) => {
					toast.error(error.response.data.Message);
				});
		} else if (currentPath[currentPath.length - 1] === "admin") {
			axios
				.post("https://localhost:7097/api/auth/admins-login", {
					email: email,
					password: password,
				})
				.then((response) => {
					console.log(response);
					const role = response.data.role;
					const token = response.data.token;
					const userId = response.data.userId;
					handleLogin(role, token, userId);
					console.log(auth);
					Cookies.set("userId", response.data.userId);
					Cookies.set("universityId", response.data.universityId);
					Cookies.set("facultyId", response.data.facultyId);
					Cookies.set("departmentId", response.data.departmentId);
					Cookies.set("email", response.data.email);
					Cookies.set("role", response.data.role);
					Cookies.set("token", response.data.token);
					Cookies.set(
						"isAuthenticated",
						response.data.isAuthenticated,
					);

					if (auth.role !== []) {
						if (Cookies.get("role") === "Department Admin") {
							navigate("/department", { replace: true });
						} else if (auth.role === "University Admin") {
							navigate("/university", { replace: true });
						} else if (Cookies.get("role") === "Faculty Admin") {
							navigate("/faculty", { replace: true });
						}
					}
				})
				.catch((error) => {
					toast.error(error.response.data.Message);
				});
		}
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
	width: 450px;
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

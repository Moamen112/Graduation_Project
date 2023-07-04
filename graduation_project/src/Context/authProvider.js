import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});

	useEffect(() => {
		// Check if authentication data exists in cookies
		const token = Cookies.get("token");
		const userId = Cookies.get("userId");
		const role = Cookies.get("role");

		if (token && userId && role) {
			setAuth({ token, userId, role });
		}
	}, [Cookies]);

	const handleLogout = () => {
		// Clear authentication data from cookies
		Cookies.remove("token");
		Cookies.remove("userId");
		Cookies.remove("role");

		// Reset the authentication context
		setAuth({});
	};

	const handleLogin = (role, token, userId) => {
		// Set authentication data in cookies
		Cookies.set("token", token);
		Cookies.set("userId", userId);
		Cookies.set("role", role);

		// Update the authentication context
		setAuth({ role, token, userId });
	};

	return (
		<AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };

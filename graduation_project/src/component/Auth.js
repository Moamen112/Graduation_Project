import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";

const Auth = ({ allowedRoles }) => {
	const location = useLocation();
	const role = Cookies.get("role");

	return allowedRoles.includes(role) ? (
		<Outlet />
	) : Cookies.get("userId") ? (
		<Navigate
			to="/unauthorized"
			state={{ from: location }}
			replace
		/>
	) : (
		<Navigate
			to="/"
			state={{ from: location }}
			replace
		/>
	);
};

export default Auth;

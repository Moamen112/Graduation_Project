import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const DepartmentAdminRedirect = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const currentPath = window.location.pathname.split("/");
		if (
			Cookies.get("role") === "Department Admin" &&
			currentPath[1] !== "department"
		) {
			navigate("/department");
		}
	}, []);

	return null;
};

export default DepartmentAdminRedirect;

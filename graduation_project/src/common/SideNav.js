import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Cookies, { remove, removeAll } from "js-cookie";
import { useState, useEffect, useLayoutEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BorderAllOutlinedIcon from "@mui/icons-material/BorderAllOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { AuthContext } from "../Context/authProvider";

const SideNav = (props) => {
	const navigate = useNavigate();
	const { handleLogout } = useContext(AuthContext);

	const logout = () => {
		handleLogout();
		// Additional logout actions (e.g., navigate to login page)
		Object.keys(Cookies.get()).forEach(function (cookieName) {
			var neededAttributes = {
				// Here you pass the same attributes that were used when the cookie was created
				// and are required when removing the cookie
			};
			Cookies.remove(cookieName, neededAttributes);
		});
		navigate("/", { replace: true });
	};
	return props.page !== "landing" ? (
		<>
			<Container
				style={
					props.reSize
						? sideNavFun
						: { transition: "all ease-in-out 0.5s" }
				}>
				<Logo>
					<img
						src="/imgs/logo1.svg"
						alt="logo"
					/>
				</Logo>
				<NavLinks
					style={
						props.reSize
							? noPadding
							: { transition: "all ease-in-out 0.5s" }
					}>
					{props.page === "faculty" || props.page === "" ? (
						<>
							<NavLink>
								<Link to={"/faculty"}>
									<HomeOutlinedIcon />
									{props.size[0] > 750 && !props.reSize
										? "Home"
										: ""}
								</Link>
							</NavLink>
							<NavLink>
								<Link to={"faculty/departments"}>
									<BorderAllOutlinedIcon />
									{props.size[0] > 750 && !props.reSize
										? "Departments"
										: ""}
								</Link>
							</NavLink>
							<NavLink>
								<Link to={"faculty/proffesors"}>
									<PermIdentityOutlinedIcon />
									{props.size[0] > 750 && !props.reSize
										? "Professors"
										: ""}
								</Link>
							</NavLink>
							<NavLink>
								<Link to={"faculty/admins"}>
									<SettingsOutlinedIcon />
									{props.size[0] > 750 && !props.reSize
										? "Manage Admin"
										: ""}
								</Link>
							</NavLink>
						</>
					) : props.page === "university" ? (
						<>
							<NavLink>
								<Link to={"/university"}>
									<HomeOutlinedIcon />
									{props.size[0] > 750 && !props.reSize
										? "Home"
										: ""}
								</Link>
							</NavLink>
							<NavLink>
								<Link to={"university/faculties"}>
									<PermIdentityOutlinedIcon />
									{props.size[0] > 750 && !props.reSize
										? "Faculties"
										: ""}
								</Link>
							</NavLink>
							<NavLink>
								<Link to={"university/admins"}>
									<SettingsOutlinedIcon />
									{props.size[0] > 750 && !props.reSize
										? "Manage Admin"
										: ""}
								</Link>
							</NavLink>
						</>
					) : props.page === "department" ? (
						<>
							<NavLink>
								<Link to={"/department"}>
									<HomeOutlinedIcon />
									{props.size[0] > 750 && !props.reSize
										? "Home"
										: ""}
								</Link>
							</NavLink>
							<NavLink>
								<Link to={"department/subjects"}>
									<LibraryBooksOutlinedIcon />
									{props.size[0] > 750 && !props.reSize
										? "Subjects"
										: ""}
								</Link>
							</NavLink>
							<NavLink>
								<Link to={"department/professors"}>
									<PermIdentityOutlinedIcon />
									{props.size[0] > 750 && !props.reSize
										? "Professors"
										: ""}
								</Link>
							</NavLink>
							<NavLink>
								<Link to={"department/questionnaire"}>
									<SettingsOutlinedIcon />
									{props.size[0] > 750 && !props.reSize
										? "Questionnaire"
										: ""}
								</Link>
							</NavLink>
						</>
					) : null}
				</NavLinks>
				{props.size[0] > 750 && !props.reSize ? (
					<LogoutButton onClick={logout}>Logout</LogoutButton>
				) : (
					<div
						className="logout-icon"
						onClick={logout}>
						<ExitToAppIcon />
					</div>
				)}
			</Container>
		</>
	) : (
		""
	);
};

export default SideNav;

const Container = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	width: 15%;
	height: 100%;
	background-color: #063443;
	color: #fff;
	gap: 40px;

	left: 0;

	.logout-icon {
		position: absolute;
		color: #fff;
		bottom: 50px;
		left: 25%;
	}

	@media only screen and (max-width: 600px) {
		width: 15%;
		align-items: center;
	}
`;

const Logo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 25%;
	font-size: 24px;
	font-weight: bold;
	background-color: #041f2a;

	img {
		width: 70%;
		height: 70%;
	}
`;

const NavLinks = styled.ul`
	list-style: none;
	padding: 0 20px;
	width: 100%;
	display: flex;
	gap: 10px;
	flex-direction: column;
	align-items: left;
	justify-content: center;

	@media only screen and (max-width: 600px) {
		padding: 0;
	}
`;

const NavLink = styled.li`
	display: flex;
	border-radius: 40px;
	align-items: center;
	padding: 8px 10px;
	text-align: center;
	transition: background-color 0.2s ease-in-out;
	cursor: pointer;

	&:hover {
		background-color: #041f2a;
	}

	a {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: #fff;
	}

	svg {
		margin-right: 10px;
	}
`;

const LogoutButton = styled.button`
	position: absolute;
	border: none;
	background-color: #fff;
	color: #000;
	padding: 8px 30px;
	border-radius: 15px;
	transition: background-color 0.2s ease-in-out;
	bottom: 50px;
	left: 25%;

	&:hover {
		background-color: #041f2a;
		color: #fff;
		cursor: pointer;
	}
`;

const sideNavFun = {
	width: "5%",
	transition: "all ease-in-out 0.5s",
};

const noPadding = {
	padding: "0 10px",
	marginRight: "0",
};

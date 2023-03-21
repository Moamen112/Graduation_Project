import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BorderAllOutlinedIcon from "@mui/icons-material/BorderAllOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const SideNav = () => {
	return (
		<>
			<Container>
				<Logo>Logo</Logo>
				<NavLinks>
					<NavLink>
						<HomeOutlinedIcon />
						Home
					</NavLink>
					<NavLink>
						<PermIdentityOutlinedIcon />
						Professors
					</NavLink>
					<NavLink>
						<BorderAllOutlinedIcon />
						Departments
					</NavLink>
					<NavLink>
						<LibraryBooksOutlinedIcon />
						Subject
					</NavLink>
					<NavLink>
						<SettingsOutlinedIcon />
						Manage Admin
					</NavLink>
				</NavLinks>
				<LogoutButton>Logout</LogoutButton>
			</Container>
		</>
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
	margin-right: 15%;
	left: 0;
`;

const Logo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 25%;
	font-size: 24px;
	font-weight: bold;
	background-color: #041f2a;
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

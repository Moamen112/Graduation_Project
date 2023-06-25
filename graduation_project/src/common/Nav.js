import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Cookies from "js-cookie";

function Nav(props) {
	const style = {
		width: "100%",
		marginLeft: "0",
		...props.resizeStyle,
		transition: "all ease-in-out 0.5s",
	};

	const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [prof, setProf] = useState([]);

	const handleChange = (event) => {
		setAuth(event.target.checked);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const myCookie = Cookies.get("id");

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/professors/706870e9-e373-11ed-b719-105badc84798
`,
			)
			.then((response) => {
				setProf(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return props.page !== "landing" ? (
		<>
			<Container
				style={
					props.page === "professor" || props.page === "student"
						? style
						: {
								...props.resizeStyle,
								transition: "all ease-in-out 0.5s",
						  }
				}>
				<Info>
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<IconButton
							size="large"
							aria-label="show 4 new mails"
							color="inherit">
							<Badge
								badgeContent={4}
								color="error">
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton
							size="large"
							aria-label="show 17 new notifications"
							color="inherit">
							<Badge
								badgeContent={1}
								color="error">
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							size="large"
							edge="end"
							aria-label="account of current user"
							aria-haspopup="true"
							color="inherit"
							onClick={handleMenu}>
							<AccountCircle sx={{ fontSize: "35px" }} />

							<Menu
								sx={{ zIndex: "9999999" }}
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}>
								<MenuItem onClick={handleClose}>
									Welcome, {prof.fullName}
								</MenuItem>
								<Link
									to={`professor/${myCookie}`}
									style={{
										textDecoration: "none",
										color: "#000",
									}}>
									<MenuItem onClick={handleClose}>
										Profile
									</MenuItem>
								</Link>
								<MenuItem onClick={handleClose}>
									Logout
								</MenuItem>
							</Menu>
						</IconButton>
					</Box>
				</Info>
				{props.page === "professor" || props.page === "student" ? (
					<h1>
						<Link
							to={props.page}
							style={{
								textDecoration: "none",
								color: "#000",
							}}>
							Logo
						</Link>
					</h1>
				) : (
					<HideNav onClick={props.handleClick}>
						<ArrowLeftOutlinedIcon
							sx={{
								padding: 0,
								position: "absolute",
								right: "52%",
								color: "#ff0000",
							}}
						/>
						<MenuOutlinedIcon />
					</HideNav>
				)}
			</Container>
		</>
	) : (
		""
	);
}

export default Nav;

const Container = styled.nav`
	width: 85%;
	padding: 0 50px;
	position: fixed;
	background-color: #fff;
	box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
	height: 10%;
	margin-left: 15%;
	display: flex;
	align-items: center;
	flex-direction: row-reverse;
	justify-content: space-between;
	z-index: 9999;

	h1 {
		padding: 20px;
	}
`;

const Info = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 100%;
	padding: 0 25px;
	display: flex;
	gap: 20px;
	opacity: 0.6;

	div {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;

		p {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
`;

const HideNav = styled.div`
	position: relative;
	width: 10%;
	height: 100%;
	display: flex;
	border-right: 1px solid rgb(188 179 179);
	align-items: center;
	justify-content: center;
	opacity: 0.6;
	cursor: pointer;

	@media only screen and (max-width: 600px) {
		display: none;
	}
`;

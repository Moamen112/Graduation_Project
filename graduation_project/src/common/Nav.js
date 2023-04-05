import React from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
function Nav(props) {
	return (
		<>
			<Container
				style={{
					...props.resizeStyle,
					transition: "all ease-in-out 0.5s",
				}}>
				<Info>
					<NotificationsNoneOutlinedIcon />
					<EmailOutlinedIcon />
					<div>
						<AccountCircleOutlinedIcon />
						<p>
							UserName <ArrowDropDownOutlinedIcon />
						</p>
					</div>
				</Info>
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
			</Container>
		</>
	);
}

export default Nav;

const Container = styled.nav`
	width: 85%;
	position: fixed;
	background-color: #fff;
	box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
	height: 10%;
	margin-left: 15%;
	display: flex;
	align-items: center;
	flex-direction: row-reverse;
	justify-content: space-between;
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

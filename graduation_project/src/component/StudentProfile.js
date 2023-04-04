import React from "react";
import styled from "styled-components";
import main from "../images/main.jpg";
import profile from "../images/profile.jpg";
import PersonIcon from "@mui/icons-material/Person";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function StudentProfile() {
	const Item = styled(Paper)(() => ({
		textAlign: "left",
	}));

	return (
		<div>
			<HeaderContainer>
				<Header>
					<img src={main} />
				</Header>
				<ProfileImageContainer>
					<ProfileImage src={profile} />
					<p>
						<PersonIcon />
						Update your photo
					</p>
				</ProfileImageContainer>
			</HeaderContainer>

			<Name>Youssef Ayman Aamer</Name>
			<ContentContainer>
				<Box sx={{ width: "50%" }}>
					<Grid
						container
						rowSpacing={3}
						columnSpacing={{ xs: 1, sm: 2, md: 20 }}>
						<Grid
							item
							xs={6}>
							<Item style={FontStyle}>University</Item>
							<Input />
						</Grid>
						<Grid
							item
							xs={6}>
							<Item style={FontStyle}>Email Address</Item>
							<Input />
						</Grid>
						<Grid
							item
							xs={6}>
							<Item style={FontStyle}>Faculty</Item>
							<Input />
						</Grid>
						<Grid
							item
							xs={6}>
							<Item style={FontStyle}>Phone Number</Item>
							<Input />
						</Grid>
					</Grid>
				</Box>
			</ContentContainer>
		</div>
	);
}

export default StudentProfile;

const FontStyle = {
	color: "#063443",
	fontSize: "1.5em",
};

const Item = styled("div")({
	marginBottom: "16px",
	"& input": {
		border: "none",
		borderBottom: "1px solid #ccc",
		width: "100%",
		padding: "8px 0",
		boxSizing: "border-box",
		fontSize: "16px",
	},
});

const Input = styled.input`
	width: 100%;
	padding: 8px;
`;

const ContentContainer = styled.div`
	margin-top: 8%;
	color: #063443;
	font-weight: bold;
	display: flex;
	align-items: right;
	justify-content: space-around;
`;

const HeaderContainer = styled.div`
	width: 100%;
`;

const Header = styled.header`
	img {
		width: 100%;
	}
`;

const ProfileImageContainer = styled.div`
	position: fixed;
	top: 20%;
	left: 8%;

	p {
		display: flex;
		justify-content: center;
		color: #063443;
		cursor: pointer;
	}
`;

const ProfileImage = styled.img`
	border-radius: 50%;
	width: 50%;
`;

const Name = styled.h1`
	color: #063443;
`;

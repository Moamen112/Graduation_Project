import React from "react";
import styled from "styled-components";
import main from "../images/main.jpg";
import profile from "../images/profile.jpg";
import PersonIcon from "@mui/icons-material/Person";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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
							<TextField
								style={FontStyle}
								id="fullWidth"
								label=""
								defaultValue="Damanhour University"
								variant="filled"
								InputProps={{
									readOnly: true,
								}}
							/>
						</Grid>
						<Grid
							item
							xs={6}>
							<Item style={FontStyle}>Faculty</Item>
							<TextField
								style={FontStyle}
								id="fullWidth"
								label=""
								defaultValue="Computer Science"
								variant="filled"
								InputProps={{
									readOnly: true,
								}}
							/>
						</Grid>
						<Grid
							item
							xs={6}>
							<Item style={FontStyle}>Email Address</Item>
							<TextField
								style={FontStyle}
								id="fullWidth"
								label=""
								defaultValue="email@gmail.com"
								variant="filled"
							/>
						</Grid>

						<Grid
							item
							xs={6}>
							<Item style={FontStyle}>Phone Number</Item>
							<TextField
								style={FontStyle}
								id="fullWidth"
								label=""
								defaultValue="0123456789"
								variant="filled"
							/>
						</Grid>
					</Grid>
				</Box>
			</ContentContainer>
			<StyledButton>Save</StyledButton>
		</div>
	);
}

export default StudentProfile;

const StyledButton = styled.button`
	margin-top: 2%;
	border: none;
	background-color: #063443;
	color: white;
	width: 10%;
	padding: 8px 15px;
	cursor: pointer;
`;

const FontStyle = {
	color: "#063443",
	fontSize: "1.2em",
};

const Input = styled.input`
	width: 100%;
	padding: 8px;
`;

const ContentContainer = styled.div`
	margin-top: 3%;
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
	margin-top: -10%;
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

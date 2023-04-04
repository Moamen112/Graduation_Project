import React from "react";
import styled from "styled-components";
import main from "../images/main.jpg";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function StudentQues() {
	const Item = styled(Paper)(() => ({
		textAlign: "center",
	}));

	return (
		<MainContainer>
			<HeaderContainer>
				<img src={main} />
				<h1>Student Questionnaires</h1>
			</HeaderContainer>
			<ContentContainer>
				<Box sx={{ width: "80%" }}>
					<Grid
						container
						rowSpacing={3}
						columnSpacing={{ xs: 3, sm: 5, md: 25 }}>
						<Grid
							item
							xs={6}>
							<Item style={FontStyle}>
								Computer Vision<span>01</span>
							</Item>
							<StyledButton>FILL IT</StyledButton>
						</Grid>
						<Grid
							item
							xs={6}>
							<Item style={FontStyle}>
								Network Analysis <span>02</span>
							</Item>
							<StyledButton>FILL IT</StyledButton>
						</Grid>
						<Grid
							item
							xs={6}>
							<Item style={FontStyle}>
								Embedded Systems <span>03</span>
							</Item>
							<StyledButton>FILL IT</StyledButton>
						</Grid>
						<Grid
							item
							xs={6}>
							<Item style={FontStyle}>
								Computer Graphics <span>04</span>
							</Item>
							<StyledButton>FILL IT</StyledButton>
						</Grid>
						<Grid
							item
							xs={6}>
							<Item style={FontStyle}>
								Mobile Computing <span>05</span>
							</Item>
							<StyledButton>FILL IT</StyledButton>
						</Grid>
					</Grid>
				</Box>
			</ContentContainer>
		</MainContainer>
	);
}

export default StudentQues;

const StyledButton = styled.button`
	border: none;
	background-color: #063443;
	color: white;
	width: 100%;
	padding: 8px 15px;
	cursor: pointer;
`;

const FontStyle = {
	color: "#063443",
	fontSize: "1.5em",
	display: "flex",
	alignItems: "right",
	justifyContent: "space-between",
};

const ContentContainer = styled.div`
	margin-top: 3%;
	color: #063443;
	display: flex;
	align-items: right;
	justify-content: space-around;
`;

const HeaderContainer = styled.div`
	color: #063443;
	height: 20%;
	overflow: hidden;

	img {
		width: 100%;
	}
`;

const MainContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

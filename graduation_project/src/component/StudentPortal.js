import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ques from "../images/ques.jpg";
import view from "../images/view.jpg";

function StudentPortal() {
	return (
		<MainContainer>
			<ContainerBox>
				<h1>Logo</h1>
				<h2>Student Portal</h2>
				<Portals>
					<Ques>
						<LeftSide style={imageStyle}>
							<h2>View Questionnaire</h2>
							<Link
								to={"questionnaires"}
								style={ButtonStyle}>
								Let's Go
							</Link>
						</LeftSide>
						<img
							style={imageStyle}
							src={ques}
							alt="ques"
						/>
					</Ques>
					<Profile>
						<LeftSide style={imageStyle}>
							<h2>View Your Profile</h2>
							<Link style={ButtonStyle}>Let's Go</Link>
						</LeftSide>
						<img
							style={imageStyle}
							src={view}
							alt="view"
						/>
					</Profile>
				</Portals>
			</ContainerBox>
		</MainContainer>
	);
}

export default StudentPortal;

const imageStyle = {
	width: "50%",
};

const LeftSide = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const ButtonStyle = {
	border: "none",
	backgroundColor: "#063443",
	color: "white",
	width: "35%",
	padding: "8px 15px",
	cursor: "pointer",
	textDecoration: "none",
};

const Profile = styled.div`
	background-color: white;
	box-shadow: 10px 10px 30px 0 rgba(0, 0, 0, 0.5);
	padding: 10px;
	color: #063443;
	width: 45%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	padding: 20px;
`;

const Ques = styled.div`
	background-color: white;
	box-shadow: 10px 10px 30px 0 rgba(0, 0, 0, 0.5);
	padding: 10px;
	color: #063443;
	width: 45%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	padding: 20px;
`;

const Portals = styled.div`
	width: 100%;
	margin-top: 10%;
	display: flex;
	gap: 5%;
`;

const ContainerBox = styled.div`
	color: white;
	background-color: #aac1e0;
	width: 80%;
	height: 80%;
	padding: 20px;
	margin-top: 4%;
	box-shadow: 15px 15px 10px 0 rgba(0, 0, 0, 0.5);
`;

const MainContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

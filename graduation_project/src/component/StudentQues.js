import React, { useEffect, useState } from "react";
import styled from "styled-components";
import main from "../images/main.jpg";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function StudentQues() {
	const [student, setStudent] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`https://localhost:7097/api/students/${studentId}/subjects`, {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			})
			.then((response) => {
				setStudent(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	let studentId = Cookies.get("userId");
	console.log(studentId);

	const CheckSubmission = (questionnaireId) => {
		console.log(questionnaireId);
		const endpoint = `https://localhost:7097/api/questionnaires/${questionnaireId}/students/${studentId}/check`;

		axios
			.get(endpoint, {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			})
			.then((response) => {
				/*if (response.response.status === 400) {
					console.log(response.response.message);
				} else {
					navigate(`/student/questionnaires/${questionnaireId}`); // Navigate to the form route
				}*/
			})
			.catch((error) => {
				if (error.response && error.response.status === 400) {
					// Handle specific error code (status 400)
					navigate(`/student/questionnaires/${questionnaireId}`);
					return;
				} else {
					console.log("Error checking submission");
				}
			});
	};

	return (
		<MainContainer>
			<HeaderContainer>
				<img
					src={main}
					alt="main"
				/>
				<h1>Student Questionnaires</h1>
			</HeaderContainer>
			<ContentContainer>
				<Box sx={{ width: "65%" }}>
					<Grid
						container
						rowSpacing={4}
						columnSpacing={{ xs: 3, sm: 5, md: 25 }}>
						{student.length > 0 ? (
							student.map((stu, index) => (
								<Grid
									item
									xs={6}
									key={stu.id}>
									<Item style={FontStyle}>
										{stu.fullName}
										<span>0{index + 1}</span>
									</Item>
									{stu.questionnaire != null ? (
										<StyledButton
											style={{
												backgroundColor: "#063443",
											}}
											onClick={() =>
												CheckSubmission(
													stu.questionnaire.id,
												)
											}>
											Fill It
										</StyledButton>
									) : (
										<StyledButton
											style={{
												color: "#fff",
												backgroundColor:
													"rgb(77 102 110)",
											}}
											disabled>
											No Questionnaire
										</StyledButton>
									)}
								</Grid>
							))
						) : (
							<Grid
								item
								xs={12}>
								No subjects
							</Grid>
						)}
					</Grid>
				</Box>
			</ContentContainer>
		</MainContainer>
	);
}

export default StudentQues;

const Item = styled(Paper)(() => ({
	textAlign: "center",
}));

const StyledButton = styled.button`
	border: none;
	color: white;
	width: 100%;
	padding: 8px 15px;
	cursor: pointer;
`;

const FontStyle = {
	color: "#063443",
	fontSize: "1.2em",
	padding: "10px 0",
	display: "flex",
	alignItems: "right",
	width: "100%",
	justifyContent: "space-between",
};

const ContentContainer = styled.div`
	margin-top: 3%;
	color: #063443;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const HeaderContainer = styled.div`
	color: #063443;
	height: 20%;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 30px;

	img {
		width: 100%;
	}
`;

const MainContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding-bottom: 30px;
`;

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import TagIcon from "@mui/icons-material/Tag";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const ProfessorSubject = () => {
	const { subjectId, questionnaireId } = useParams();
	console.log(subjectId, questionnaireId);
	const [subject, setSubject] = useState([]);
	const [questionnare, setQuestionnaire] = useState([]);
	const [expanded, setExpanded] = useState(false);
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
	const day = currentDate.getDate().toString().padStart(2, "0");
	const formattedDate = `${year}-${month}-${day}`;

	const analysisData = [
		{
			question:
				"To what extent was the instructor organized, well prepared, and use class time efficiently?",
			answer: "The instructor was highly organized, well-prepared, and effectively utilized class time.",
			recommendation:
				"Continuing to prioritize organization and efficient use of class time will enhance the learning experience for students.",
			isPositive: true, // Indicate whether the analysis is positive or negative
		},
		{
			question:
				"To what extent did the instructor present course material in a clear manner that facilitated understanding?",
			answer: "The instructor presented the course material in a clear and concise manner, making it easy to comprehend.",
			recommendation:
				"Maintaining the clarity in course material delivery will contribute to better student engagement and learning outcomes.",
			isPositive: true,
		},
		{
			question:
				"To what extent did the instructor treat students with respect?",
			answer: "The instructor consistently treated students with respect and created an inclusive learning environment.",
			recommendation:
				"Sustaining a respectful and inclusive approach towards students will foster a positive classroom atmosphere.",
			isPositive: true,
		},
		{
			question:
				"To what extent did exams and assignments reflect the course content?",
			answer: "The exams and assignments poorly reflected the course content, causing confusion among students.",
			recommendation:
				"Revising the exams and assignments to align more closely with the course content will improve student understanding and performance.",
			isPositive: false,
		},
		// Add more question objects here
	];

	const facultyID = "d0552b49-6e7d-4ced-8a30-62ce8066a2d4";
	const departmentId = "84796c48-d538-4954-a98a-622dc5c9325a";

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/faculities/${facultyID}/departments/${departmentId}/subjects/${subjectId}
`,
			)
			.then((response) => {
				setSubject(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	let data = {
		name: subject?.fullName?.split(" -")[0] || "",
		code: subject?.fullName?.split("- ")[1] || "",
	};

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/departments/${departmentId}/subjects/${subjectId}/questionnaires
`,
			)
			.then((response) => {
				setQuestionnaire(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(
				`https://localhost:7097/api/departments/${departmentId}/subjects/${subjectId}/questionnaires/${id}`,
			);
			if (response.status === 204) {
				const deletedQuestionnaire = questionnare.filter(
					(questionnare) => questionnare.id !== id,
				);
				setQuestionnaire(deletedQuestionnaire);
			}
		} catch (error) {
			console.log(error);
		}
	};

	let firstThreeQuestionnaire = questionnare.slice(0, 4);

	return (
		<>
			<Container>
				<Header>
					<HeaderDetails>
						<h1>{data.name}</h1>
						<p className="styled-p">{subject.description}</p>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								fontSize: "13px",
								gap: "5px",
							}}>
							<b>Subject Code: </b>
							{data.code} - <b>Credits: </b> 3 Credit -{" "}
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<StarIcon
									sx={{
										color: "#ffc700",
										fontSize: "20px",
									}}
								/>
								<p style={{ display: "inline-block" }}>
									{subject.rate}/5
								</p>
							</div>
						</div>
					</HeaderDetails>
					<HeaderRating>
						<div className="subject-rate">
							<h1>Subject Rating</h1>
							{subject ? (
								<div className="stars">
									{subject.rate > 4 && subject.rate <= 5 ? (
										<span style={{ color: "green" }}>
											Exellent
										</span>
									) : subject.rate > 3 &&
									  subject.rate <= 4 ? (
										<span style={{ color: "green" }}>
											Very Good
										</span>
									) : subject.rate > 2 &&
									  subject.rate <= 3 ? (
										<span style={{ color: "green" }}>
											Good
										</span>
									) : subject.rate > 1 &&
									  subject.rate <= 2 ? (
										<span style={{ color: "red" }}>
											Bad
										</span>
									) : subject.rate > 0 &&
									  subject.rate <= 1 ? (
										<span style={{ color: "red" }}>
											Poor
										</span>
									) : (
										<span style={{ color: "#000" }}>
											Nan
										</span>
									)}
								</div>
							) : (
								""
							)}
						</div>
					</HeaderRating>
				</Header>
				<AnalysisContainer>
					<Analysis>
						<div className="left-analysis">
							<iframe
								title="aa"
								width="100%"
								height="100%"
								overflow="scroll"
								scrolling="0"
								frameBorder="0"
								src="//plotly.com/~Muhammed_Zidan/80.embed"></iframe>
						</div>
						<RightContainer>
							<Conclusion>
								<h1>Conclusion</h1>
								{analysisData.length > 0 ? (
									<div className="container-content">
										{analysisData.map((data, index = 0) => (
											<div className="system-recommenditon">
												<ul>
													<li>
														<h4
															style={{
																color: data.isPositive
																	? "#a0c15a"
																	: "red",
															}}>
															Result{++index}:
															<span>
																{data.answer}
															</span>
														</h4>
													</li>
												</ul>
											</div>
										))}
									</div>
								) : (
									<div className="container">
										No available Conclusion
									</div>
								)}
							</Conclusion>
						</RightContainer>
					</Analysis>
				</AnalysisContainer>
			</Container>
		</>
	);
};

export default ProfessorSubject;

const QuestionnaireCondition = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 95%;
	font-size: 30px;
	color: grey;
	position: absolute;
	top: 45%;
`;

const Container = styled.section`
	width: 100%;

	padding: 7% 3% 2% 3%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	gap: 20px;
	background-color: #cddee5;

	@media only screen and (max-width: 600px) {
		padding-top: 20%;
	}
`;

const Header = styled.header`
	width: 100%;
	display: flex;
	justify-content: space-between;
	color: rgb(4, 31, 42);
`;
const HeaderDetails = styled.div`
	width: 40%;
	display: flex;
	flex-direction: column;
	gap: 10px;

	pre {
		font-size: 13px;
	}
	.styled-p {
		font-size: 12px;
	}
	h1 {
		color: #041f2a;
	}
`;
const HeaderRating = styled.div`
	display: flex;
	gap: 50px;
	color: rgb(4, 31, 42);
	width: 40%;
	justify-content: center;

	.subject-rate {
		display: flex;
		flex-direction: column;
		gap: 10px;

		h3 {
			font-size: 30px;
		}
	}

	.stars {
		display: flex;
		font-weight: bold;
		font-size: 50px;
		align-items: center;
		justify-content: center;

		span {
			font-size: 40px;
		}
	}
`;

const AnalysisContainer = styled.section`
	display: flex;
	align-items: center;
	flex-direction: row;
	width: 100%;
	margin-top: 3%;
`;

const Analysis = styled.div`
	width: 100%;
	display: flex;
	gap: 30px;
	border-radius: 10px;

	.left-analysis {
		width: 60%;
		background-color: #fff;
		height: 450px;
		border-radius: 20px;
		box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
		border-radius: 10px;

		iframe {
			width: 100%;
			height: 100%;
			border: none;
			border-radius: 10px;
		}

		img {
			width: 100%;
			height: 100%;
		}
	}
`;

const RightContainer = styled.div`
	display: flex;
	width: 40%;

	gap: 20px;
`;

const Conclusion = styled.div`
	padding: 10px 0%;
	width: 100%;
	display: flex;
	color: #000;
	box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
	background-color: #fff;
	flex-direction: column;
	gap: 20px;
	text-align: center;
	height: 450px;
	border-radius: 10px;
	position: relative;

	.container-content {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		overflow: auto;

		.system-recommenditon:first-child {
			padding-top: 3%;
		}

		.system-recommenditon:last-child {
			border: 0;
			padding-bottom: 20px;
		}

		.system-recommenditon {
			width: 100%;
			display: flex;
			border-bottom: 1px solid #000;
			padding: 10px 0 10px 0;

			ul {
				list-style: none;

				li {
					h4 {
						display: flex;
						padding: 3px 10px;
						width: 100%;
						font-size: 14px;

						span {
							color: #000;
							font-weight: 400;
						}
					}
				}
			}
		}
	}

	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		font-size: 30px;
		color: grey;
		position: absolute;
		top: 45%;
	}
`;

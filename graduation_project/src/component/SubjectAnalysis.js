import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubjectAnalysis = () => {
	const { subjectId } = useParams();
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
				toast.success("Questionnaire Deleted");
			}
		} catch (error) {
			console.log(error);
		}
	};

	let firstThreeQuestionnaire = questionnare.slice(0, 4);

	console.log(questionnare);

	console.log(subject);

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
									{subject.rate === 5 ? (
										<span style={{ color: "green" }}>
											Exellent
										</span>
									) : subject.rate === 4 ? (
										<span style={{ color: "green" }}>
											Very Good
										</span>
									) : subject.rate === 3 ? (
										<span style={{ color: "green" }}>
											Good
										</span>
									) : subject.rate === 2 ? (
										<span style={{ color: "red" }}>
											Bad
										</span>
									) : subject.rate === 1 ? (
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
					</Analysis>
					<RightContainer>
						<QuestionnaireContainer>
							<div
								className="questions"
								expanded={expanded === "panel1"}
								onChange={handleChange("panel1")}>
								<AccordionSummary
									aria-controls="panel1bh-content"
									id="panel1bh-header">
									<Typography
										sx={{ width: "33%", flexShrink: 0 }}>
										Questionnaires
									</Typography>
									<Typography
										sx={{ color: "text.secondary" }}>
										Last few Questionnaires
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<div>
										{questionnare.length > 0 ? (
											firstThreeQuestionnaire.map(
												(question) => (
													<Questionnare
														key={question.id}>
														<div>
															<p>
																Title:{" "}
																{question.title}
															</p>
															<p>
																Deadline:
																{question.endDate.substr(
																	0,
																	10,
																)}
															</p>
														</div>

														<div>
															<p>
																is Acvite:{" "}
																<span>
																	{formattedDate <
																	question.endDate.substr(
																		0,
																		10,
																	) ? (
																		<span
																			style={{
																				color: "green",
																				fontWeight:
																					"bold",
																			}}>
																			True
																		</span>
																	) : (
																		<span
																			style={{
																				color: "red",
																				fontWeight:
																					"bold",
																			}}>
																			False
																		</span>
																	)}
																</span>
															</p>
															<p
																className="delete"
																onClick={() =>
																	handleDelete(
																		question.id,
																	)
																}>
																Delete
																Questionnaire
															</p>
															<span>
																{formattedDate <
																question.endDate.substr(
																	0,
																	10,
																) ? (
																	<span></span>
																) : (
																	<span
																		className="seemore"
																		style={{
																			color: "#041f2a",
																			fontWeight:
																				"bold",
																		}}>
																		<StyledLink
																			to={
																				""
																			}>
																			See
																			More
																		</StyledLink>
																	</span>
																)}
															</span>
														</div>
													</Questionnare>
												),
											)
										) : (
											<QuestionnaireCondition>
												No available Questionnaires
											</QuestionnaireCondition>
										)}
									</div>
								</AccordionDetails>
							</div>
						</QuestionnaireContainer>
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
				</AnalysisContainer>
			</Container>
		</>
	);
};

export default SubjectAnalysis;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: #000;
	transition: ease-in-out 0.5s;
	color: rgb(66 146 119);

	&:hover {
		color: rgb(66 146 119);
	}
`;

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
	width: 85%;
	margin-left: 15%;
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
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
`;

const Analysis = styled.div`
	margin-top: 3%;
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	border-radius: 10px;
	gap: 20px;

	.left-analysis {
		width: 100%;
		background-color: #fff;
		height: 650px;
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
	width: 100%;
	padding: 20px 0;
	gap: 20px;
	justify-content: space-between;
`;

const QuestionnaireContainer = styled.div`
	width: 100%;

	.questions {
		box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
		height: 350px;
		border-radius: 10px;
		background-color: #fff;
		position: relative;
	}
`;

const Questionnare = styled.div`
	width: 100%;
	height: 70px;
	box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
	padding: 0 10px;
	display: flex;
	margin: 15px 0;
	justify-content: space-between;
	align-items: center;
	position: relative;

	span.seemore {
		font-size: 12px;
		left: 46%;
		letter-spacing: 1.6px;
		transition: all ease-in-out 0.3s;
		cursor: pointer;
	}

	div {
		font-size: 12px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 5px 0;

		.delete {
			color: red;
			font-weight: bold;
			&:hover {
				cursor: pointer;
				transform: scale(1.1);
				transition: all ease-in-out 0.2s;
				width: 100%;
			}
		}
	}
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
	height: 350px;
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

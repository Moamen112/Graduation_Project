import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DataTable, { createTheme } from "react-data-table-component";
import CancelIcon from "@mui/icons-material/Cancel";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Cookies from "js-cookie";

function ProfessorHome(props) {
	const [expanded, setExpanded] = React.useState(false);
	const [prof, setProf] = useState([]);
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
	const day = currentDate.getDate().toString().padStart(2, "0");
	const formattedDate = `${year}-${month}-${day}`;
	const [analysisData, setAnalysisData] = useState([]);

	const professorId = Cookies.get("userId");

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/professors/${professorId}
`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			)
			.then((response) => {
				setProf(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/professors/${professorId}/recommendations
`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			)
			.then((response) => {
				setAnalysisData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	console.log(analysisData);
	return (
		<>
			<Container
				style={{
					...props.resizeStyle,
					transition: "all ease-in-out 0.5s",
				}}>
				<Header>
					<p>{`Welcome, ${prof.fullName} | rate: ${prof.rate}`}</p>
				</Header>
				<Analysis>
					<div className="left-analysis">
						<iframe
							title="aa"
							overflow="scroll"
							scrolling="0"
							frameBorder="0"
							src="https://plotly.com/~Muhammed_Zidan/374.embed"
							height="525"
							width="100%"></iframe>
					</div>
					<div className="right-analysis">
						<div className="according">
							{prof.subjects
								? prof.subjects.map((subject, index = 0) => (
										<Accordion
											expanded={
												expanded === `panel${++index}`
											}
											onChange={handleChange(
												`panel${index}`,
											)}>
											<AccordionSummary
												sx={{ height: "100px" }}
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1bh-content"
												id="panel1bh-header">
												<Typography
													sx={{
														width: "50%",
														flexShrink: 0,
													}}>
													{subject.fullName}
												</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<div>
													{subject.questionnaires
														.length > 0 ? (
														subject.questionnaires.map(
															(question) => (
																<Questionnare
																	key={
																		question.id
																	}>
																	<div>
																		<p>
																			Title:{" "}
																			{
																				question.title
																			}
																		</p>
																		<p>
																			Duration:
																			{` ${question.durationInDays}`}
																		</p>
																	</div>
																	<div>
																		<p>
																			is
																			Acvite:{" "}
																			<span>
																				{question.isActive ? (
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
																		<Link
																			style={{
																				textDecoration:
																					"none",
																				color: "#000",
																			}}
																			to={`subjects/${subject.id}/questionnaire/${question.id}`}>
																			See
																			more
																		</Link>
																	</div>
																</Questionnare>
															),
														)
													) : (
														<QuestionnaireCondition>
															Their is no
															questionnaires
														</QuestionnaireCondition>
													)}
												</div>
											</AccordionDetails>
										</Accordion>
								  ))
								: " "}
						</div>
						<div className="analysis">
							<div className="upper-analysis">
								<h1>Reports</h1>
							</div>
							<div className="bottom-analysis">
								<h1>System recommendetion</h1>
								{analysisData.length > 0 ? (
									<div className="container-content">
										{analysisData.map((data, index = 0) => (
											<div className="system-recommenditon">
												<ul>
													<li>
														<h3
															style={{
																color: "#a0c15a",
															}}>
															{data.subjectName}
														</h3>
														{data.content.map(
															(rec) => (
																<h4
																	style={{
																		color: "red",
																	}}>
																	Recommendation
																	{++index}:
																	<span>
																		{rec}
																	</span>
																</h4>
															),
														)}
													</li>
												</ul>
											</div>
										))}
									</div>
								) : (
									<div className="container">
										No available Recommendation
									</div>
								)}
							</div>
						</div>
					</div>
				</Analysis>
			</Container>
		</>
	);
}

export default ProfessorHome;

const Container = styled.section`
	width: 100%;
	padding-top: 8%;
	background-color: #cddee4;

	@media only screen and (max-width: 600px) {
		padding-top: 20%;
	}
`;

const Header = styled.header`
	padding: 0px 5%;
	p {
		color: #000;
		font-size: 30px;
		font-weight: 500;
	}
`;

const Analysis = styled.div`
	margin-top: 3%;
	padding: 30px 5%;
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	flex-direction: column;
	gap: 20px;

	.left-analysis {
		width: 100%;
		background-color: #fff;
		height: 650px;
		border-radius: 20px;
		box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);

		iframe {
			width: 100%;
			height: 100%;
			border: none;
		}

		img {
			width: 100%;
			height: 100%;
		}
	}

	.right-analysis {
		width: 100%;
		border-radius: 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 10px;

		.according {
			width: 58%;
		}

		.analysis {
			width: 40%;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 20px;
			flex-direction: column;
		}

		.upper-analysis {
			background-color: #fff;
			box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
			width: 100%;
			height: 300px;

			display: flex;
			padding: 20px 0;
			align-items: flex-start;
			justify-content: center;

			iframe {
				width: 100%;
				height: 100%;
				border: none;
			}

			img {
				width: 100%;
				height: 100%;
			}
		}

		.bottom-analysis {
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
				overflow: scroll;

				.system-recommenditon:first-child {
					padding-top: 45%;
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
							h3 {
								display: flex;
								padding: 3px 10px;
								width: 100%;
								font-size: 20px;
							}

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
		}
	}
`;

const Tables = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	padding: 0 5%;
	margin-bottom: 20px;

	.prof {
		width: 30%;
		box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
		max-height: 400px;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 10px;
		padding: 10px;

		.headers {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20px 5px;

			button {
				padding: 2px 10px;
				background-color: #063443;
				color: #fff;
				border-radius: 10px;
			}
		}
	}

	.depa {
		width: 65%;
		box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
		max-height: 400px;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 10px;
		padding: 10px;

		.headers {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20px 5px;

			button {
				padding: 2px 10px;
				background-color: #063443;
				color: #fff;
				border-radius: 10px;
			}
		}
	}
`;

const Subjects = styled.div`
	width: 100%;
	padding: 0 6%;

	.subjects {
		width: 100%;
		box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
		max-height: 400px;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 20px;
		padding: 10px;

		.headers {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20px 5px;

			button {
				padding: 2px 10px;
				background-color: #063443;
				color: #fff;
				border-radius: 10px;
			}
		}
	}
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
	height: 50px;
	box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
	padding: 0 10px;
	display: flex;
	margin: 15px 0;
	justify-content: space-between;
	align-items: center;

	div {
		font-size: 12px;
		display: flex;
		flex-direction: column;
		gap: 3px;

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

const QuestionnaireCondition = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 95%;
	font-size: 30px;
	padding: 0px 0 40px 0;
	color: grey;

	top: 45%;
`;

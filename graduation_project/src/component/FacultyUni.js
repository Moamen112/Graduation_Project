import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import DataTable, { createTheme } from "react-data-table-component";
import CancelIcon from "@mui/icons-material/Cancel";
import { Container } from "@mui/material";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";

function FacultyUni(props) {
	const { facultyId } = useParams();
	const [data, setData] = useState({});
	const [departments, setDepartments] = useState([]);

	let universityId = "86F697D4-A762-44D6-8322-2C08C66F94E4";
	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/universities/${universityId}/faculities/${facultyId}
`,
			)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/universities/${universityId}/faculities/${facultyId}/departments
`,
			)
			.then((response) => {
				if (response.status === 200) {
					setDepartments(response.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	console.log(departments);

	return (
		<>
			<UniContainer
				style={{
					...props.resizeStyle,
					transition: "all ease-in-out 0.5s",
				}}>
				<h1>{data.name}</h1>
				<Cards>
					<Card>
						<ImgContainer>
							<img
								src="/imgs/graduate.png"
								alt="Anything"
							/>
						</ImgContainer>
						<div>
							<h4>Student</h4>
							<h2>9855568</h2>
						</div>
					</Card>
					<Card>
						<ImgContainer>
							<img
								src="/imgs/teacher.png"
								alt="Anything"
							/>
						</ImgContainer>
						<div>
							<h4>Professors</h4>
							<h2>9855568</h2>
						</div>
					</Card>
					<Card>
						<ImgContainer>
							<img
								src="/imgs/online-library.png"
								alt="Anything"
							/>
						</ImgContainer>
						<div>
							<h4>Departments</h4>
							<h2>9855568</h2>
						</div>
					</Card>
				</Cards>
				<AnalysisContainer>
					<Analysis>
						<div className="left-analysis">
							<iframe
								title="aa"
								width="100%"
								height="100%"
								overflow="scroll"
								scrolling="0"
								frameborder="0"
								src="//plotly.com/~Muhammed_Zidan/80.embed"></iframe>
						</div>
						<div className="right-analysis">
							<div className="faculty-header">
								<h4 className="fac-name">Department name</h4>
								<h4 className="fac-rate">Rate</h4>
								<h4>State</h4>
							</div>
							{departments.map((dep) => (
								<div
									className="faculty-content"
									key={dep.id}>
									<p className="fac-name">{dep.name}</p>
									<div className="star">
										<p>{dep.rate}</p>
										<StarIcon
											sx={{
												color: "orange",
												fontSize: "15px",
											}}
										/>
									</div>
									{dep.rate <= 5 && dep.rate > 4 ? (
										<span style={{ color: "#a0c15a" }}>
											Exellent
										</span>
									) : dep.rate <= 4 && dep.rate > 3 ? (
										<span style={{ color: "#add633" }}>
											Very Good
										</span>
									) : dep.rate <= 3 && dep.rate > 2 ? (
										<span style={{ color: "#ffd934" }}>
											Fair
										</span>
									) : dep.rate <= 2 && dep.rate > 1 ? (
										<span style={{ color: "	#ffb234" }}>
											Bad{" "}
										</span>
									) : dep.rate <= 1 && dep.rate >= 0 ? (
										<span style={{ color: "red" }}>
											Poor
										</span>
									) : (
										" "
									)}
								</div>
							))}
						</div>
					</Analysis>
				</AnalysisContainer>
			</UniContainer>
		</>
	);
}

export default FacultyUni;

const UniContainer = styled.section`
	width: 85%;
	margin-left: 15%;
	padding-top: 8%;
	background-color: #cddee4;

	h1 {
		padding: 0px 7% 20px 7%;
	}

	@media only screen and (max-width: 600px) {
		padding-top: 20%;
	}
`;

const AnalysisContainer = styled.section`
	display: flex;
	align-items: center;
	width: 100%;
	padding-left: 20px;
`;

const Conclusion = styled.div`
	margin-top: 3%;
	padding: 30px 0%;
	width: 32%;
	display: flex;
	color: #000;
	box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
	background-color: #fff;
	flex-direction: column;
	gap: 20px;
	text-align: center;
	height: 450px;
`;

const Cards = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-wrap: wrap;
	@media only screen and (max-width: 600px) {
		gap: 20px;
	}
`;

const ImgContainer = styled.div`
	width: 50%;
	height: 85%;
	border-radius: 50%;

	img {
		height: 100%;
		width: 100%;
	}
`;

const Card = styled.div`
	width: 320px;
	height: 150px;
	background-color: #063443;
	border-radius: 15px;
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: space-between;
	padding: 0 30px;
	transition: background-color 0.2s ease-in-out;

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5px;
		color: #fff;
	}

	&:hover {
		background-color: #041f2a;
	}

	@media only screen and (max-width: 600px) {
		width: 250px;
		align-items: center;
	}
`;

const Analysis = styled.div`
	margin-top: 3%;
	padding: 30px 5%;
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	flex-direction: row;
	gap: 20px;

	.right-analysis {
		width: 35%;
		height: 450px;
		box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
		background-color: #fff;

		.faculty-header {
			display: flex;
			justify-content: space-around;
			padding: 20px 0px;

			.fac-name {
				width: 140px;
				display: flex;
				justify-content: flex-start;
			}

			.fac-rate {
				width: 50px;
			}
		}

		.faculty-content {
			display: flex;
			justify-content: space-around;
			padding: 0px;
			align-content: center;
			width: 100%;
			padding-top: 30px;

			p {
				font-size: 14px;
				font-weight: bold;
			}

			.fac-name {
				width: 180px;
			}

			.star {
				display: flex;
				align-items: center;
				width: 50px;
				gap: 5px;
			}

			span {
				color: #000;
				font-weight: bold;
				width: 80px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.left-analysis {
		width: 65%;
		background-color: #fff;
		height: 450px;
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
`;

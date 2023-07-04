import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "js-cookie";

function Faculty(props) {
	const department = {
		data: [
			{
				name: "Computer Science",
				subjects: [
					{
						name: "Computer Animation",
						rate: 3.5,
					},
					{
						name: "Database Management",
						rate: 4.2,
					},
					{
						name: "Artificial Intelligence",
						rate: 4.8,
					},
				],
			},
			{
				name: "Electrical Engineering",
				subjects: [
					{
						name: "Circuit Design",
						rate: 4.0,
					},
					{
						name: "Power Systems",
						rate: 4.5,
					},
					{
						name: "Digital Signal Processing",
						rate: 4.3,
					},
				],
			},
			{
				name: "Mechanical Engineering",
				subjects: [
					{
						name: "Thermodynamics",
						rate: 4.2,
					},
					{
						name: "Fluid Mechanics",
						rate: 4.1,
					},
					{
						name: "Structural Analysis",
						rate: 4.4,
					},
				],
			},
			{
				name: "Civil Engineering",
				subjects: [
					{
						name: "Structural Engineering",
						rate: 4.6,
					},
					{
						name: "Transportation Engineering",
						rate: 4.2,
					},
					{
						name: "Geotechnical Engineering",
						rate: 4.5,
					},
				],
			},
			{
				name: "Chemical Engineering",
				subjects: [
					{
						name: "Thermodynamics",
						rate: 4.3,
					},
					{
						name: "Reaction Engineering",
						rate: 4.1,
					},
					{
						name: "Process Control",
						rate: 4.4,
					},
				],
			},
		],
	};

	const [conclousin, setConclousin] = useState({});

	const universityId = Cookies.get("universityId");
	const facultyId = Cookies.get("facultyId");

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/universities/${universityId}/faculities/${facultyId}/departments/low-rate`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			)
			.then((response) => {
				if (response.status === 200) {
					setConclousin(response.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	console.log(conclousin);

	return (
		<>
			<Container
				style={{
					...props.resizeStyle,
					transition: "all ease-in-out 0.5s",
				}}>
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
				<Analysis>
					<div className="left-analysis">
						<iframe
							title="aa"
							overflow="scroll"
							scrolling="0"
							frameborder="0"
							src="https://plotly.com/~Muhammed_Zidan/378.embed"
							height="525"
							width="100%"></iframe>
					</div>
					<div className="right-analysis">
						<div className="bottom-analysis">
							<div className="dep-header">
								<h4 className="dep-name">Department name</h4>
								<h4 className="dep-rate">Problems</h4>
							</div>

							{conclousin &&
								conclousin.length > 0 &&
								conclousin.map((dep) => (
									<div
										className="dep-content"
										key={dep.name}>
										<p className="dep-name">{dep.name}</p>
										<div className="subj-problem">
											<ul>
												{dep.subjects.map((subj) => (
													<li key={subj.subjectName}>
														{subj.subjectName} -{" "}
														{subj.rate}
													</li>
												))}
											</ul>
										</div>
									</div>
								))}
						</div>
					</div>
				</Analysis>
			</Container>
		</>
	);
}

export default Faculty;

const Container = styled.section`
	width: 85%;
	margin-left: 15%;
	padding-top: 8%;
	background-color: #cddee4;

	@media only screen and (max-width: 600px) {
		padding-top: 20%;
	}
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
			border-radius: 10px;
		}

		img {
			width: 100%;
			height: 100%;
		}
	}

	.right-analysis {
		width: 35%;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.bottom-analysis {
			background-color: #fff;
			box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);
			width: 100%;
			height: 450px;
			padding: 10px 20px;
			border-radius: 10px;
			overflow: scroll;

			.dep-header {
				display: flex;
				justify-content: space-around;
				padding: 20px 0px;

				.dep-name {
					width: 50%;
					display: flex;
					align-items: flex-start;
					justify-content: flex-start;
				}

				.dep-rate {
					width: 50%;
				}
			}

			/*.dep-content:last-child {
				border: 0;
			}*/

			.dep-content {
				display: flex;
				justify-content: space-around;
				padding: 20px 0;
				border-bottom: 1px solid #000;

				.dep-name {
					width: 45%;
					display: flex;
					padding: 5px 10px;
					font-size: 14px;
					color: #041f2a;
				}

				.subj-problem {
					width: 55%;
					align-items: center;
					justify-content: center;
					padding: 0 10px;
					font-size: 11px;
					border-left: 1px solid #041f2a;

					ul {
						width: 100%;
						list-style: none;
						display: flex;
						align-items: flex-start;
						flex-direction: column;
					}

					li {
						padding: 3px 0;
						width: 100%;
					}

					li::before {
						content: "•";
						font-size: 1.2em;
						padding: 0 5px;
						color: #063443;
					}
				}
			}
		}
	}
`;

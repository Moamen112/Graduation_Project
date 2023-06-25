import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";

function DepartmentAdmin(props) {
	const [subjects, setSubjects] = useState([]);

	const facultyId = "d0552b49-6e7d-4ced-8a30-62ce8066a2d4";
	const departmentId = "84796c48-d538-4954-a98a-622dc5c9325a";

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/faculities/${facultyId}/departments/${departmentId}/subjects
`,
			)
			.then((response) => {
				if (response.status === 200) {
					setSubjects(response.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

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
							width="100%"
							height="100%"
							overflow="scroll"
							scrolling="0"
							frameborder="0"
							src="//plotly.com/~Muhammed_Zidan/80.embed"></iframe>
					</div>
					<div className="right-analysis">
						<div className="faculty-header">
							<h4 className="fac-name">Subject name</h4>
							<h4 className="fac-rate">Rate</h4>
							<h4>State</h4>
						</div>
						{subjects.map((subj) => (
							<div
								className="faculty-content"
								key={subj.id}>
								<p className="fac-name">
									{subj.fullName.split(" -")[0]}
								</p>
								<div className="star">
									<p className="rt">{subj.rate}</p>
									<StarIcon
										sx={{
											color: "orange",
											fontSize: "15px",
										}}
									/>
								</div>
								{subj.rate <= 5 && subj.rate > 4 ? (
									<span style={{ color: "#a0c15a" }}>
										Exellent
									</span>
								) : subj.rate <= 4 && subj.rate > 3 ? (
									<span style={{ color: "#add633" }}>
										Very Good
									</span>
								) : subj.rate <= 3 && subj.rate > 2 ? (
									<span style={{ color: "#ffd934" }}>
										Fair
									</span>
								) : subj.rate <= 2 && subj.rate > 1 ? (
									<span style={{ color: "	#ffb234" }}>
										Bad{" "}
									</span>
								) : subj.rate <= 1 && subj.rate >= 0 ? (
									<span style={{ color: "red" }}>Poor</span>
								) : (
									" "
								)}
							</div>
						))}
					</div>
				</Analysis>
			</Container>
		</>
	);
}

export default DepartmentAdmin;

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

				.rt {
					width: 18px;
				}
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

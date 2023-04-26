import React from "react";
import styled from "styled-components";

function DepartmentAdmin(props) {
	return (
		<>
			<UniContainer
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
					</Analysis>
					<Conclusion>
						<h1>Conclusion</h1>
					</Conclusion>
				</AnalysisContainer>
			</UniContainer>
		</>
	);
}

export default DepartmentAdmin;

const UniContainer = styled.section`
	width: 85%;
	margin-left: 15%;
	padding-top: 8%;
	background-color: #cddee4;

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
	width: 63%;
	display: flex;
	justify-content: space-evenly;
	flex-direction: column;
	gap: 20px;

	.left-analysis {
		width: 100%;
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

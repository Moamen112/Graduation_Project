import React from "react";
import styled from "styled-components";

function LandingUni() {
	return (
		<>
			<Container>
				<Nav>
					<div className="left-nav">
						<h1>Logo</h1>
					</div>
					<input placeholder="Search" />
				</Nav>
				<Analysis>
					<RightAnalysis></RightAnalysis>
					<UniInfo>
						<h1>University name</h1>
						<p>
							Lorem Ipsum is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s,
							when an unknown printer took a galley of type and
							scrambled it to make a type specimen book. It has
							survived not only five centuries Lorem Ipsum is
							simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's
							standard dummy text ever since the 1500s, when an
						</p>
						<div class="rate">
							<input
								type="radio"
								id="star5"
								name="rate"
								value="5"
							/>
							<label
								for="star5"
								title="text">
								5 stars
							</label>
							<input
								type="radio"
								id="star4"
								name="rate"
								value="4"
							/>
							<label
								for="star4"
								title="text">
								4 stars
							</label>
							<input
								type="radio"
								id="star3"
								name="rate"
								value="3"
							/>
							<label
								for="star3"
								title="text">
								3 stars
							</label>
							<input
								type="radio"
								id="star2"
								name="rate"
								value="2"
							/>
							<label
								for="star2"
								title="text">
								2 stars
							</label>
							<input
								type="radio"
								id="star1"
								name="rate"
								value="1"
							/>
							<label
								for="star1"
								title="text">
								1 star
							</label>
						</div>
					</UniInfo>
				</Analysis>
				<TopRating>
					<RatingContainer>
						<h1>Top 3 Professors</h1>
						<div className="prof-container">
							<div className="prof">
								<div className="img-container">Img</div>
								<div className="rating">
									<h4>Dr: Prof</h4>
									<p>4/5</p>
								</div>
							</div>
							<div className="prof">
								<div className="img-container">Img</div>
								<div className="rating">
									<h4>Dr: Prof</h4>
									<p>4/5</p>
								</div>
							</div>
							<div className="prof">
								<div className="img-container">Img</div>
								<div className="rating">
									<h4>Dr: Prof</h4>
									<p>4/5</p>
								</div>
							</div>
						</div>
					</RatingContainer>
				</TopRating>
			</Container>
		</>
	);
}

export default LandingUni;

const Container = styled.div`
	width: 100%;
	background-color: #063443;
	min-height: 100vh;
`;

const TopRating = styled.div`
	height: 400px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
`;

const RatingContainer = styled.div`
	width: 99%;
	height: 100%;
	border: 1px solid #000;
	padding: 20px;
	color: #fff;

	.prof-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 90%;
		padding: 20px 0;
	}

	.prof {
		width: 28%;
		height: 100%;
		border: 1px solid #fff;
		display: flex;
		align-items: center;
		padding: 20px;
		gap: 30px;

		.img-container {
			width: 40%;
			height: 60%;
			border: 1px solid #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30px;
		}

		.rating {
			display: flex;
			flex-direction: column;
			height: 60%;
			width: 60%;
			gap: 10px;
		}
	}
`;

const Nav = styled.nav`
	height: 100px;
	background: transparent;
	position: fixed;
	color: #fff;
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-between;
	padding: 40px;

	z-index: 1000;

	.left-nav {
		display: flex;

		h1 {
			padding: 0 3 0px 0 0px;
		}
	}

	.left-nav ul {
		display: flex;
		text-decoration: none;
		list-style: none;
		font-size: 25px;

		li {
			padding: 0 10px;
		}
	}

	input {
		border-radius: 20px;
		padding: 10px;
	}
`;

const Analysis = styled.section`
	width: 100%;
	padding: 8% 20px 0 20px;
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: space-around;
	margin-bottom: 10px;
`;

const RightAnalysis = styled.div`
	width: 60%;
	height: 400px;
	border: 1px solid #000;
`;

const UniInfo = styled.div`
	width: 38%;
	height: 400px;
	border: 1px solid #000;
	padding: 30px;
	color: #fff;

	h1 {
		padding-bottom: 25px;
	}

	.rate {
		float: left;
		height: 46px;
		padding: 10px 0px;
	}
	.rate:not(:checked) > input {
		position: absolute;
		top: -9999px;
	}
	.rate:not(:checked) > label {
		float: right;
		width: 1em;
		overflow: hidden;
		white-space: nowrap;
		cursor: pointer;
		font-size: 30px;
		color: #ccc;
	}
	.rate:not(:checked) > label:before {
		content: "★ ";
	}
	.rate > input:checked ~ label {
		color: #ffc700;
	}
	.rate:not(:checked) > label:hover,
	.rate:not(:checked) > label:hover ~ label {
		color: #deb217;
	}
	.rate > input:checked + label:hover,
	.rate > input:checked + label:hover ~ label,
	.rate > input:checked ~ label:hover,
	.rate > input:checked ~ label:hover ~ label,
	.rate > label:hover ~ input:checked ~ label {
		color: #c59b08;
	}
`;

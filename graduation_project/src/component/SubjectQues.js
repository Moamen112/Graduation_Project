import React, { useState } from "react";
import styled from "styled-components";
import main from "../images/main.jpg";

function SubjectQues() {
	const [ratings, setRatings] = useState(Array(3).fill(0));

	const questions = [
		{
			text: "How much did you enjoy this subject?",
			minRating: 1,
			maxRating: 5,
		},
		{
			text: "Was the material challenging?",
			minRating: 1,
			maxRating: 5,
		},
		{
			text: "Did you find the lectures helpful?",
			minRating: 1,
			maxRating: 5,
		},
	];

	const handleRatingChange = (index, value) => {
		const newRatings = [...ratings];
		newRatings[index] = value;
		setRatings(newRatings);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(ratings);
	};

	return (
		<div>
			<HeaderContainer>
				<img src={main} />
				<h1>Subject Questionnaires</h1>
			</HeaderContainer>
			<StyledForm onSubmit={handleSubmit}>
				{questions.map((question, index) => (
					<FormGroup key={index}>
						<Label>
							{question.text}
							<br />
							<Input
								type="range"
								min={question.minRating}
								max={question.maxRating}
								value={ratings[index]}
								onChange={(event) =>
									handleRatingChange(
										index,
										parseInt(event.target.value),
									)
								}
							/>
							{ratings[index]}
						</Label>
					</FormGroup>
				))}
				<br />
				<StyledButton type="submit">Submit</StyledButton>
			</StyledForm>
		</div>
	);
}

export default SubjectQues;

const StyledForm = styled.form`
	max-width: 600px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
	width: 100%;
`;

const Label = styled.label`
	font-size: 1.2rem;
	margin-bottom: 5px;
	color: #555;
`;

const Input = styled.input`
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ddd;
	font-size: 1rem;
	width: 100%;
`;

const RatingInput = styled.input`
	width: 100%;
	height: 15px;
	border-radius: 10px;
	background-color: #ddd;
	outline: none;
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background-color: #063443;
		cursor: pointer;
	}
`;

const SubmitButton = styled.button`
	background-color: #063443;
	color: white;
	border: none;
	border-radius: 5px;
	padding: 10px 20px;
	font-size: 1.2rem;
	cursor: pointer;
	transition: all 0.3s ease;
	&:hover {
		background-color: #034d3c;
	}
`;

const StyledButton = styled.button`
	border: none;
	background-color: #063443;
	color: white;
	width: 100%;
	padding: 8px 15px;
	cursor: pointer;
`;

const HeaderContainer = styled.div`
	color: #063443;
	height: 20%;
	overflow: hidden;

	img {
		width: 100%;
	}
`;

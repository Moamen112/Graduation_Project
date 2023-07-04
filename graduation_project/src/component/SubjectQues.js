import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import main from "../images/main.jpg";
import axios from "axios";
import Cookies from "js-cookie";

function SubjectQues() {
	const [ratings, setRatings] = useState(Array(9).fill(0));
	const { questionnairId } = useParams();

	const questions = [
		{
			text: "To what extent was the instructor organized, well prepared, and use class time efficiently?",
			minRating: 1,
			maxRating: 5,
		},
		{
			text: "To what extent did the instructor present course material in a clear manner that facilitated understanding?",
			minRating: 1,
			maxRating: 5,
		},
		{
			text: "To what extent did The instructor treat students with respect?",
			minRating: 1,
			maxRating: 5,
		},
		{
			text: "To what extent did the instructional materials (books, handouts, study guides, lab manuals, software) increase your knowledge and skills in the subject matter?",
			minRating: 1,
			maxRating: 5,
		},
		{
			text: "To what extent did Exams and assignments reflective the course content?",
			minRating: 1,
			maxRating: 5,
		},
		{
			text: "To what extent did The assistant teacher facilitat the learning and clearify course practical part?",
			minRating: 1,
			maxRating: 5,
		},
		{
			text: "To what extent do you recommend this instructor to other students?",
			minRating: 1,
			maxRating: 5,
		},
		{
			text: "To what extent do you recommend this course to other students?",
			minRating: 1,
			maxRating: 5,
		},
		{
			text: "To what extent does this course has high educational impact to the market?",
			minRating: 1,
			maxRating: 5,
		},
	];

	const handleRatingChange = (index, value) => {
		const newRatings = [...ratings];
		newRatings[index] = value;
		setRatings(newRatings);
	};
	const studentId = Cookies.get("userId");

	const handleSubmit = async (event, id, start, end) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				`https://localhost:7097/api/students/${studentId}/questionnaire/${questionnairId}/submit
`,
				{
					instructorEfficiency: ratings[0],
					courseUnderstand: ratings[1],
					instructorRespect: ratings[2],
					instructorMaterial: ratings[3],
					examContent: ratings[4],
					assistantTeacher: ratings[5],
					instructorRecommendation: ratings[6],
					courseRecommendation: ratings[7],
					courseMarket: ratings[8],
				},
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);

			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<HeaderContainer>
				<img
					src={main}
					alt=""
				/>
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
	max-width: 700px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px 0;
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
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 50px;
	gap: 30px;

	img {
		width: 100%;
	}
`;

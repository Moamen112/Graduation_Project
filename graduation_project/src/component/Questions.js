import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Questions(props) {
	const [subject, setSubject] = React.useState("");
	const [date, setDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [subjects, setSubjects] = useState([]);

	const facultyId = "d0552b49-6e7d-4ced-8a30-62ce8066a2d4";

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

	const handleChange = (event) => {
		setSubject(event.target.value);
	};

	const handleDateChange = (event) => {
		setDate(event.target.value);
	};

	const handleEndDateChange = (event) => {
		setEndDate(event.target.value);
	};
	const departmentId = "84796c48-d538-4954-a98a-622dc5c9325a";

	const handleCreate = async (id, start, end) => {
		try {
			const response = await axios.post(
				`https://localhost:7097/api/departments/${departmentId}/subjects/${id}/questionnaires
`,
				{
					title: "Week 1's Questionnaire",
					createdAt: start,
					endDate: end,
				},
			);

			if (response.status === 201) {
				toast.success("Questionnaire Created");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSave = () => {
		console.log(subject);
		console.log("Date:", date);
		console.log("Time:", endDate);
		handleCreate(subject, date, endDate);
	};

	return (
		<Container
			style={{
				...props.resizeStyle,
				transition: "all ease-in-out 0.5s",
			}}>
			<Box
				sx={{
					border: "3px solid rgb(30 80 96)",
					padding: "20px",
					borderRadius: "10px",
					display: "flex",
					flexDirection: "column",
				}}>
				<h1 style={{ padding: "0px 0 30px 0", color: "rgb(30 80 96)" }}>
					Questionnaire Creation
				</h1>
				<SyledFormControl
					fullWidth
					style={FormControlStyle}>
					<div>
						<InputLabel
							id="demo-simple-select-label"
							sx={{ color: "#000" }}>
							Subject
						</InputLabel>
						<Select
							sx={{ width: "300px" }}
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={subject}
							label="Subject"
							onChange={handleChange}>
							{subjects.map((subject) => (
								<MenuItem
									key={subject.id}
									value={subject.id}>
									{subject.fullName}
								</MenuItem>
							))}
						</Select>
					</div>

					<TextField
						id="startDate"
						label="Start Date"
						type="date"
						value={date}
						onChange={handleDateChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<TextField
						id="endDate"
						label="End Date"
						type="date"
						value={endDate}
						onChange={handleEndDateChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<SaveButton
						variant="contained"
						onClick={handleSave}>
						Save
					</SaveButton>
				</SyledFormControl>
			</Box>

			<StyledUl>
				{listItems.map((item, index) => (
					<StyledLi key={index}>
						<span>Question {index + 1} :</span>
						<Label>
							{" "}
							<i>{item}</i>
						</Label>
					</StyledLi>
				))}
			</StyledUl>
		</Container>
	);
}

export default Questions;

const listItems = [
	"- To what extent was the instructor organized, well prepared, and use class time efficiently?",
	"- To what extent did the instructor present course material in a clear manner that facilitated understanding?",
	"- To what extent did The instructor treat students with respect?",
	"- To what extent did the instructional materials (books, handouts, study guides, lab manuals, software) increase your knowledge and skills in the subject matter?",
	"- To what extent did Exams and assignments reflective the course content?",
	"- To what extent did The assistant teacher facilitat the learning and clearify course practical part?",
	"- To what extent do you recommend this instructor to other students?",
	"- To what extent do you recommend this course to other students?",
	"- To what extent does this course has high educational impact to the market?",
];

const SaveButton = styled.button`
	border: none;
	background-color: #053344;
	color: #fff;
	border-radius: 10px;
	transition: background-color 0.2s ease-in-out;
	padding: 15px 40px;
	position: absolute;
	right: 10px;

	&:hover {
		background-color: rgb(30, 80, 96);
		color: #fff;
		cursor: pointer;
	}
`;

const SyledFormControl = styled(FormControl)`
	display: flex;
	justify-content: space-between;
`;

const FormControlStyle = {
	width: "100%",
	display: "flex",
	flexDirection: "row",
	justifyContent: "flex-start",
	alignItems: "center",
	gap: "2%",
};

const Container = styled.div`
	text-align: left;
	display: flex;
	flex-direction: column;
	width: 85%;
	gap: 40px;
	margin-left: 15%;
	padding-top: 8%;
	min-height: 100vh;
	padding: 8% 3% 0 3%;
`;

const StyledUl = styled.ul`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 10px;
	padding-left: 0;

	padding: 0px 0 40px 0;
`;

const StyledLi = styled.li`
	list-style: none;
	padding: 20px 10px;
	background-color: rgb(30 80 96);
	color: #fff;
	border-radius: 10px;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
	transition: background-color 0.2s ease;

	span {
		color: #ffffff;
		font-size: 20px;
		font-weight: bold;
	}
`;

const Label = styled.label`
	display: flex;
	align-items: center;
	font-size: 17px;
	line-height: 1.5;
	padding: 10px 30px 0 30px;
`;

const Checkbox = styled.input`
	margin-right: 10px;
	color: #007bff;
`;

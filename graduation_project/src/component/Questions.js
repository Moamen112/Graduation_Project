import React, { useState } from "react";
import styled from "styled-components";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Questions() {
	const [subject, setSubject] = React.useState("");

	const [date, setDate] = useState("");
	const [time, setTime] = useState("");

	const handleChange = (event) => {
		setSubject(event.target.value);
	};

	const handleDateChange = (event) => {
		setDate(event.target.value);
	};

	const handleTimeChange = (event) => {
		setTime(event.target.value);
	};

	const handleSave = () => {
		console.log("Subject:", subject);
		console.log("Date:", date);
		console.log("Time:", time);
	};

	return (
		<Container>
			<Box>
				<FormControl
					fullWidth
					style={FormControlStyle}>
					<div>
						<InputLabel id="demo-simple-select-label">
							Subject
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={subject}
							label="Subject"
							onChange={handleChange}>
							<MenuItem value={10}>Computer Science</MenuItem>
							<MenuItem value={20}>Embedded Sustems</MenuItem>
							<MenuItem value={30}>Information System</MenuItem>
						</Select>
					</div>

					<TextField
						id="date"
						label="Date"
						type="date"
						value={date}
						onChange={handleDateChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<TextField
						id="time"
						label="Time"
						type="time"
						value={time}
						onChange={handleTimeChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<SaveButton
						variant="contained"
						onClick={handleSave}>
						Save
					</SaveButton>
				</FormControl>
			</Box>

			<StyledUl>
				{listItems.map((item, index) => (
					<StyledLi key={index}>
						<Label> {item}</Label>
					</StyledLi>
				))}
			</StyledUl>
		</Container>
	);
}

export default Questions;

const listItems = [
	"To what extent was the instructor organized, well prepared, and use class time efficiently?",
	"To what extent did the instructor present course material in a clear manner that facilitated understanding?",
	"To what extent did The instructor treat students with respect?",
	"To what extent did the instructional materials (books, handouts, study guides, lab manuals, software) increase your knowledge and skills in the subject matter?",
	"To what extent did Exams and assignments reflective the course content?",
	"To what extent did The assistant teacher facilitat the learning and clearify course practical part?",
	"To what extent do you recommend this instructor to other students?",
	"To what extent do you recommend this course to other students?",
	"To what extent does this course has high educational impact to the market?",
];

const SaveButton = styled.button`
	border: none;
	background-color: #053344;
	color: #fff;
	border-radius: 15px;
	transition: background-color 0.2s ease-in-out;
	padding: 15px 25px;

	&:hover {
		background-color: #fff;
		color: #000;
		cursor: pointer;
	}
`;

const FormControlStyle = {
	width: "100%",
	display: "flex",
	flexDirection: "row",
	justifyContent: "flex-start",
	alignItems: "center",
	gap: "10px",
};

const Container = styled.div`
	background-color: #cddee5;
	text-align: left;
	display: flex;
	flex-direction: column;
	width: 85%;
	gap: 40px;
	margin-left: 15%;
	padding-top: 8%;
	min-height: 100vh;
`;

const StyledUl = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 10px;
	padding-left: 0;
`;

const StyledLi = styled.li`
	list-style: none;
	padding: 10px;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
	transition: background-color 0.2s ease;

	&:hover {
		background-color: #f2f2f2;
	}
`;

const Label = styled.label`
	display: flex;
	align-items: center;
	font-size: 16px;
	line-height: 1.5;
`;

const Checkbox = styled.input`
	margin-right: 10px;
	color: #007bff;
`;

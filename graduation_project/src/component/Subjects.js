import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import subjectsData from "../common/SubjectsData";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Subjects() {
	const [subjects, setSubjects] = useState([]);

	useEffect(() => {
		setSubjects(subjectsData);
	}, []);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [data, setData] = useState(subjectsData);

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("../common/SubjectsData", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({ ...prevData, [name]: value }));
	};

	// Add Function

	// const addSubject = () => {
	// 	const newSubject = () => {
	// 	};
	// 	setSubjects([...subjects, newSubject]);
	// };

	// Delete Function

	// function handleDeleteSubject(index) {
	// 	const newSubjects = [...subjects];
	// 	newSubjects.splice(index, 1);
	// 	setSubjects(newSubjects);
	// }

	return (
		<SubContainer>
			<Content>
				<Header>
					<h2>Subjects</h2>
					<AddButton onClick={handleClickOpen}>
						<AddCircleOutlineIcon style={addStyle} />
						Add
					</AddButton>
				</Header>

				<SubList>
					{/* Map method to get subjects automatically */}
					{subjects.map((subject) => (
						<SubSection>
							<SubImage>
								<EventNoteIcon style={SubImageStyle} />
							</SubImage>

							<SubjectInfoStyle>
								<h1>{subject.name}</h1>
								<p>{subject.description}</p>
							</SubjectInfoStyle>

							<EditSection>
								<EditIcon style={editSectionStyle} />
								<ClearOutlinedIcon
									//onClick={() => handleDeleteSubject(index)}
									style={{ ...editSectionStyle, ...red }}
								/>
							</EditSection>
						</SubSection>
					))}
				</SubList>
			</Content>

			<Dialog
				open={open}
				onClose={handleClose}>
				<form onSubmit={handleSubmit}>
					<DialogTitle>Subject Details</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Subject Name"
							type="text"
							value={data.name}
							fullWidth
							variant="standard"
							onChange={handleChange}
						/>

						<TextField
							autoFocus
							margin="dense"
							id="description"
							label="Subject Description"
							type="text"
							value={data.description}
							fullWidth
							variant="standard"
							onChange={handleChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button
							onClick={handleClose}
							type="submit">
							Save
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</SubContainer>
	);
}

export default Subjects;

const SubjectInfoStyle = styled.div`
	width: 70%;
	text-align: left;
`;

const SubContainer = styled.div`
	background-color: #cddee5;
	text-align: left;
	display: flex;
	flex-direction: column;
	width: 85%;
	height: 100%;
	gap: 40px;
	margin-left: 15%;
	padding-top: 8%;
`;

const Content = styled.div`
	margin-left: 3%;
`;

const Header = styled.div`
	width: 20%;
	display: flex;
	align-items: center;
	text-align: left;
	gap: 10%;
`;

const AddButton = styled.button`
	display: flex;
	align-items: center;
	font-size: 10px;
	justify-content: space-around;
	border: none;
	background-color: #053344;
	color: #fff;
	height: fit-content;
	width: fit-content;
	padding: 5px 10px;
	border-radius: 15px;
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: #fff;
		color: #000;
		cursor: pointer;
	}
`;

const SubList = styled.ul`
	list-style: none;
	padding: 0 10px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	display: flex;
	align-items: left;
	text-align: left;
`;

const SubSection = styled.li`
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	border-radius: 40px;
	align-items: center;
	background-color: white;
	padding: 8px 10px;
	text-align: center;
	transition: background-color 0.2s ease-in-out;
	margin-bottom: 25px;
	justify-content: space-around;
`;

const SubInfo = styled.div`
	width: 70%;
	text-align: left;
`;

const EditSection = styled.div`
	width: 10%;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

const SubImage = styled.div`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SubImageStyle = {
	fontSize: "55px",
	backgroundColor: "#053546",
	borderRadius: "50%",
	padding: "20px",
};

const editSectionStyle = {
	fontSize: "25px",
	color: "white",
	backgroundColor: "#053546",
	borderRadius: "50%",
	padding: "5px",
};

const addStyle = {
	fontSize: "20px",
};

const red = {
	backgroundColor: "#F7433A",
};

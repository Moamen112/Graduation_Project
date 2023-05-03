import React, { useState } from "react";
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
import DialogTitle from "@mui/material/DialogTitle";

function Subjects() {
	const [subjects, setSubjects] = useState(subjectsData);

	const [editingSubject, setEditingSubject] = useState(null);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setEditingSubject(null);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = (subject) => {
		setEditingSubject(subject);
		setOpen(true);
	};

	const handleSave = () => {
		const subjectName = document.getElementById("name").value;
		const subjectDescription = document.getElementById("description").value;
		const newSubject = {
			id: subjects.length + 1,
			name: subjectName,
			description: subjectDescription,
		};

		if (editingSubject === null) {
			setSubjects([...subjects, newSubject]);
		} else {
			const newSubjects = subjects.map((subject) => {
				if (subject === editingSubject) {
					return { ...subject, ...newSubject };
				}
				return subject;
			});
			setSubjects(newSubjects);
		}
		handleClose();
	};

	const handleDelete = (id) => {
		const newSubjects = subjects.filter((subject) => subject.id !== id);
		setSubjects(newSubjects);
	};

	return (
		<SubContainer>
			<Content>
				<Header>
					<h2>Subjects</h2>
					<AddButton onClick={handleClickOpen}>Add</AddButton>
				</Header>

				<SubList>
					{/* Map method to get subjects automatically */}
					{subjects.map((subject) => (
						<SubSection key={subject.id}>
							<SubImage>
								<EventNoteIcon style={SubImageStyle} />
							</SubImage>

							<SubjectInfoStyle>
								<h1>{subject.name}</h1>
								<p>{subject.description}</p>
							</SubjectInfoStyle>

							<EditSection>
								<EditIcon
									style={editSectionStyle}
									onClick={() => handleEdit(subject)}
								/>
								<ClearOutlinedIcon
									onClick={() => handleDelete(subject.id)}
									style={{ ...editSectionStyle, ...red }}
								/>
							</EditSection>
						</SubSection>
					))}
				</SubList>
			</Content>

			<Dialog
				onSubmit={handleSave}
				open={open}
				onClose={handleClose}>
				<DialogTitle>Subject Details</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Subject Name"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={editingSubject ? editingSubject.name : ""}
					/>

					<TextField
						autoFocus
						margin="dense"
						id="description"
						label="Subject Description"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={
							editingSubject ? editingSubject.description : ""
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						onClick={handleSave}
						type="submit">
						Save
					</Button>
				</DialogActions>
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
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	display: flex;
	align-items: left;
	text-align: left;
`;

const SubSection = styled.li`
	width: 80%;
	min-height: 150px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	border-radius: 40px;
	align-items: center;
	background-color: white;
	padding: 8px 10px;
	text-align: center;
	margin-bottom: 25px;
	justify-content: space-around;
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
	cursor: "pointer",
};

const addStyle = {
	fontSize: "20px",
};

const red = {
	backgroundColor: "#F7433A",
};

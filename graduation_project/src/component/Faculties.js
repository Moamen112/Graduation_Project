import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import facultiesData from "../common/FacultiesData";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

function Faculties() {
	const [faculties, setFaculties] = useState(facultiesData);
	const [editingFaculty, setEditingFaculty] = useState(null);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setEditingFaculty(null);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = (faculty) => {
		setEditingFaculty(faculty);
		setOpen(true);
	};

	const handleSave = () => {
		const facultyName = document.getElementById("name").value;
		const facultyDescription = document.getElementById("description").value;
		const newFaculty = {
			id: faculties.length + 1,
			name: facultyName,
			description: facultyDescription,
		};

		if (editingFaculty === null) {
			setFaculties([...faculties, newFaculty]);
		} else {
			const newFaculties = faculties.map((faculty) => {
				if (faculty === editingFaculty) {
					return { ...faculty, ...newFaculty };
				}
				return faculty;
			});
			setFaculties(newFaculties);
		}
		handleClose();
	};

	const handleDelete = (id) => {
		const newFaculties = faculties.filter((faculty) => faculty.id !== id);
		setFaculties(newFaculties);
	};

	const universityId = "86F697D4-A762-44D6-8322-2C08C66F94E4";

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/universities/${universityId}/faculities`,
			)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<FacContainer>
			<Content>
				<Header>
					<h2>Faculties</h2>
					<AddButton onClick={handleClickOpen}>
						<AddCircleOutlineIcon style={addStyle} />
						Add
					</AddButton>
				</Header>

				<FacList>
					{/* Map method to get subjects automatically */}
					{faculties.map((faculty) => (
						<FacSection key={faculty.id}>
							<FacImage>
								<EventNoteIcon style={FacImageStyle} />
							</FacImage>

							<FacultyInfoStyle>
								<h1>{faculty.name}</h1>
								<p>{faculty.description}</p>
							</FacultyInfoStyle>

							<EditSection>
								<EditIcon
									style={editSectionStyle}
									onClick={() => handleEdit(faculty)}
								/>
								<ClearOutlinedIcon
									onClick={() => handleDelete(faculty.id)}
									style={{ ...editSectionStyle, ...red }}
								/>
							</EditSection>
						</FacSection>
					))}
				</FacList>
			</Content>

			<Dialog
				onSubmit={handleSave}
				open={open}
				onClose={handleClose}>
				<DialogTitle>Faculty Details</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Faculty Name"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={editingFaculty ? editingFaculty.name : ""}
					/>

					<TextField
						autoFocus
						margin="dense"
						id="description"
						label="Faculty Description"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={
							editingFaculty ? editingFaculty.description : ""
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
		</FacContainer>
	);
}

export default Faculties;

const FacultyInfoStyle = styled.div`
	width: 70%;
	text-align: left;
`;

const FacContainer = styled.div`
	background-color: #cddee5;
	text-align: left;
	display: flex;
	flex-direction: column;
	width: 85%;
	height: 100%;
	gap: 40px;
	margin-left: 15%;
	padding-top: 8%;
	min-height: 100vh;
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
	padding: 20px;
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

const FacList = styled.ul`
	list-style: none;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	display: flex;
	align-items: left;
	text-align: left;
`;

const FacSection = styled.li`
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

const FacImage = styled.div`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const FacImageStyle = {
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

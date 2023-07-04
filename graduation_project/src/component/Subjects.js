import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EditIcon from "@mui/icons-material/Edit";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Cookies from "js-cookie";

function Subjects() {
	const [subjects, setSubjects] = useState([]);
	const [editingSubject, setEditingSubject] = useState(null);
	const [open, setOpen] = useState(false);
	const [profs, setProfs] = useState([]);
	const [prof, setProf] = useState("");

	const facultyId = Cookies.get("facultyId");
	const departmentId = Cookies.get("departmentId");

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/faculities/${facultyId}/departments/${departmentId}/subjects`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
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

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/departments/${departmentId}/professors`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			)
			.then((response) => {
				setProfs(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleClickOpen = () => {
		setEditingSubject(null);
		setOpen(true);
	};

	const handleChange = (event) => {
		setProf(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = (subject) => {
		setEditingSubject(subject);
		setOpen(true);
	};

	const handleAdd = async (subject) => {
		try {
			const response = await axios.post(
				`https://localhost:7097/api/faculties/${facultyId}/departments/${departmentId}/subjects`,
				{
					name: subject.subjectName,
					code: subject.code,
					description: subject.description,
					professorId: subject.professorId,
				},
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);

			if (response.status === 201) {
				setSubjects([...subjects, response.data]);
			} else if (response.status === 404) {
				console.log("Faculty or department not found");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async (id, subject) => {
		try {
			const response = await axios.put(
				`https://localhost:7097/api/faculities/${facultyId}/departments/${departmentId}/subjects/${id}
`,
				{
					name: subject.subjectName,
					description: subject.description,
					code: subject.code,
					professorId: subject.professorId,
				},
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);

			if (response.status === 204) {
				const newSubs = subjects.map((sub) => {
					if (sub.id === editingSubject.id) {
						return { ...sub, ...subject };
					}
					return sub;
				});

				setSubjects(newSubs);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSave = () => {
		const subjectName = document.getElementById("name").value;
		const subjectDescription = document.getElementById("description").value;
		const subjectCode = document.getElementById("code").value;
		const profs = prof;
		const newSubject = {
			//id: subjects.length + 1,
			subjectName: subjectName,
			code: subjectCode,
			fullName: subjectName + " - " + subjectCode,
			description: subjectDescription,
			professorId: profs ? profs : editingSubject.professorId,
		};

		if (editingSubject === null) {
			handleAdd(newSubject);
		} else {
			handleUpdate(editingSubject.id, newSubject);
		}
		handleClose();
	};

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(
				`https://localhost:7097/api/faculities/${facultyId}/departments/${departmentId}/subjects/${id}
`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);
			if (response.status === 204) {
				const newSubs = subjects.filter((sub) => sub.id !== id);
				setSubjects(newSubs);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<SubContainer>
			<Content>
				<Header>
					<h2>Subjects</h2>
				</Header>

				<SubList>
					{/* Map method to get subjects automatically */}
					{subjects.map((subject) => (
						<SubSection key={subject.id}>
							<SubImage>
								<EventNoteIcon style={SubImageStyle} />
							</SubImage>

							<SubjectInfoStyle>
								<h1>{subject.fullName}</h1>
								<p>{subject.description}</p>
							</SubjectInfoStyle>

							<EditSection>
								<StyledLink
									to={`/department/subjects/${subject.id}`}>
									See more
								</StyledLink>
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
						defaultValue={
							editingSubject
								? editingSubject.fullName.split(" -")[0]
								: ""
						}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="code"
						label="Subject Code"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={
							editingSubject
								? editingSubject.fullName.split("- ")[1]
								: ""
						}
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

					<InputLabel id="demo-simple-select-label">
						Professor
					</InputLabel>
					<Select
						style={{ minWidth: "120px", marginTop: "8px" }}
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="Professor"
						defaultValue={
							editingSubject ? editingSubject.professorId : ""
						}
						onChange={handleChange}>
						{profs.map((prof) => (
							<MenuItem
								key={prof.id}
								value={prof.id}>
								{prof.fullName}
							</MenuItem>
						))}
					</Select>
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

const StyledLink = styled(Link)`
	text-decoration: none;
	background-color: #053546;
	color: #fff;
	padding: 8px 15px;
	border-radius: 20px;
	font-size: 14px;
`;

const SubjectInfoStyle = styled.div`
	width: 70%;
	text-align: left;

	h1 {
		font-size: 28px;
	}
`;

const SubContainer = styled.div`
	background-color: #cddee5;
	text-align: left;
	display: flex;
	flex-direction: column;
	height: 100%;
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
	padding: 30px 20px;
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
	width: 90%;
	min-height: 170px;
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
	flex-direction: column;
	align-items: right;
	justify-content: space-around;
	align-items: center;
	gap: 10px;
	margin-top: 20px;

	div {
		display: flex;
		gap: 10px;
	}
`;

const SubImage = styled.div`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SubImageStyle = {
	fontSize: "75px",
	backgroundColor: "#053546",
	borderRadius: "50%",
	padding: "20px",
};

const editSectionStyle = {
	fontSize: "35px",
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

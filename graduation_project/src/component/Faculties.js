import React, { useEffect, useState } from "react";
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
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Cookies from "js-cookie";

function Faculties(props) {
	const [faculties, setFaculties] = useState([]);
	const [editingFaculty, setEditingFaculty] = useState(null);
	const [open, setOpen] = useState(false);
	const [newFaculty, setNewFaculty] = useState(null);

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

	const handleUpdate = async (id, faculty) => {
		try {
			const response = await axios.put(
				`https://localhost:7097/api/universities/${universityId}/faculities/${id}`,
				{
					name: faculty.name,
					description: faculty.description,
				},
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);
			if (response.status === 204) {
				const newFaculties = faculties.map((fac) => {
					if (fac === editingFaculty) {
						return { ...fac, ...faculty };
					}
					return fac;
				});

				setFaculties(newFaculties);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchData = async (faculty) => {
		try {
			const response = await axios.post(
				`https://localhost:7097/api/universities/${universityId}/faculities`,
				{
					name: faculty.name,
					description: faculty.description,
				},
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);
			console.log(response);
			if (response.status === 201) {
				setFaculties([...faculties, response.data]);
			} else if (response.status === 404) {
				console.log("University not found");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSave = () => {
		const facultyName = document.getElementById("name").value;
		const facultyDescription = document.getElementById("description").value;
		const newFaculty = {
			//id: editingFaculty.id,
			name: facultyName,
			description: facultyDescription,
		};

		if (editingFaculty === null) {
			setNewFaculty(newFaculty);
			fetchData(newFaculty);
		} else {
			handleUpdate(editingFaculty.id, newFaculty);
		}
		handleClose();
	};

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(
				`https://localhost:7097/api/universities/${universityId}/faculities/${id}/`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);
			if (response.status === 204) {
				const newFaculties = faculties.filter(
					(faculty) => faculty.id !== id,
				);
				setFaculties(newFaculties);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const universityId = Cookies.get("universityId");

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/universities/${universityId}/faculities`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			)
			.then((response) => {
				if (response.status === 200) {
					setFaculties(response.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<FacContainer
			style={{
				...props.resizeStyle,
				transition: "all ease-in-out 0.5s",
			}}>
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
								<div>
									<EditIcon
										style={editSectionStyle}
										onClick={() => handleEdit(faculty)}
									/>
									<ClearOutlinedIcon
										onClick={() => handleDelete(faculty.id)}
										style={{ ...editSectionStyle, ...red }}
									/>
								</div>
								<StyledLink
									to={`/university/faculties/${faculty.id}`}>
									See more
								</StyledLink>
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

const StyledLink = styled(Link)`
	text-decoration: none;
	background-color: #053546;
	color: #fff;
	padding: 8px 15px;
	border-radius: 20px;
	font-size: 14px;
`;

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

const FacImage = styled.div`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const FacImageStyle = {
	fontSize: "70px",
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

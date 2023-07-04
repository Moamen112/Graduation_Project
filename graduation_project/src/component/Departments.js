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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function Departments() {
	const [departments, setDepartments] = useState([]);
	const [editingDepartment, setEditingDepartment] = useState(null);
	const [open, setOpen] = useState(false);
	const [newDep, setNewDep] = useState(null);

	const handleClickOpen = () => {
		setEditingDepartment(null);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = (department) => {
		setEditingDepartment(department);
		setOpen(true);
	};

	const handleUpdate = async (id, department) => {
		try {
			const response = await axios.put(
				`https://localhost:7097/api/universities/${universityId}/faculities/${facultyID}/departments/${id}`,
				{
					name: department.name,
					description: department.description,
				},
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);
			if (response.status === 204) {
				const newDepartments = departments.map((dep) => {
					if (dep === editingDepartment) {
						toast.success("Department has been updated");
						return { ...dep, ...department };
					}

					return dep;
				});

				setDepartments(newDepartments);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchData = async (deparment) => {
		try {
			const response = await axios.post(
				`https://localhost:7097/api/universities/${universityId}/faculities/${facultyID}/departments`,
				{
					name: deparment.name,
					description: deparment.description,
				},
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);
			console.log(response);
			if (response.status === 201) {
				setDepartments([...departments, response.data]);
				toast.success("Department Created");
			} else if (response.status === 404) {
				console.log("University not found");
			}
		} catch (error) {
			return;
		}
	};

	const handleSave = () => {
		const departmentName = document.getElementById("name").value;
		const departmentDescription =
			document.getElementById("description").value;
		const newDepartment = {
			//id: departments.length + 1,
			name: departmentName,
			description: departmentDescription,
		};

		if (editingDepartment === null) {
			setNewDep(newDepartment);
			fetchData(newDepartment);
		} else {
			handleUpdate(editingDepartment.id, newDepartment);
		}
		handleClose();
	};

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(
				`https://localhost:7097/api/universities/${universityId}/faculities/${facultyID}/departments/${id}`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);
			if (response.status === 204) {
				const newDepartments = departments.filter(
					(department) => department.id !== id,
				);
				setDepartments(newDepartments);
				toast.success("Department Deleted");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const universityId = Cookies.get("universityId");

	const facultyID = Cookies.get("facultyId");

	useEffect(() => {
		axios
			.get(
				`https://localhost:7097/api/universities/${universityId}/faculities/${facultyID}/departments
`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			)
			.then((response) => {
				if (response.status === 200) {
					setDepartments(response.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<DepContainer>
			<Content>
				<Header>
					<h2>Departments</h2>
					<AddButton onClick={handleClickOpen}>
						<AddCircleOutlineIcon style={addStyle} />
						Add
					</AddButton>
				</Header>

				<DepList>
					{/* Map method to get departments automatically */}
					{departments.map((department) => (
						<DepSectionMain key={department.id}>
							<DepImage>
								<EventNoteIcon style={DepImageStyle} />
							</DepImage>
							<DepartmentInfoStyle>
								<h1>{department.name}</h1>
								<p>{department.description}</p>
							</DepartmentInfoStyle>
							<EditSection>
								<div>
									<EditIcon
										style={editSectionStyle}
										onClick={() => handleEdit(department)}
									/>
									<ClearOutlinedIcon
										onClick={() =>
											handleDelete(department.id)
										}
										style={{ ...editSectionStyle, ...red }}
									/>
								</div>
								<StyledLink
									to={`/faculty/departments/${department.id}`}>
									See more
								</StyledLink>
							</EditSection>
						</DepSectionMain>
					))}
				</DepList>
			</Content>

			<Dialog
				onSubmit={handleSave}
				open={open}
				onClose={handleClose}>
				<DialogTitle>Department Details</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Department Name"
						id="name"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={
							editingDepartment ? editingDepartment.name : ""
						}
					/>

					<TextField
						autoFocus
						margin="dense"
						label="Department Description"
						id="description"
						type="text"
						fullWidth
						variant="standard"
						defaultValue={
							editingDepartment
								? editingDepartment.description
								: ""
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
		</DepContainer>
	);
}

export default Departments;

const StyledLink = styled(Link)`
	text-decoration: none;
	background-color: #053546;
	color: #fff;
	padding: 8px 15px;
	border-radius: 20px;
	font-size: 14px;
`;

const DepartmentInfoStyle = styled.div`
	width: 70%;
	text-align: left;
`;

const DepContainer = styled.div`
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

const DepList = styled.ul`
	list-style: none;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	display: flex;
	align-items: left;
	text-align: left;
`;

const DepSectionMain = styled.li`
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

const DepImage = styled.div`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const DepImageStyle = {
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
